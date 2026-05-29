#!/usr/bin/env python3
from pathlib import Path
import re
import zlib
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
MOCK = ROOT / 'mockdatas'
OUT = MOCK / 'text'
OUT.mkdir(parents=True, exist_ok=True)

PERSONA_PREFIXES = {
    '_ED_95_9C_EB_B2_84_ED_8C_80': 'hanbeoteam',
    '_EA_B9_80_EA_B0_93_EC_83_9D': 'kimgatsaeng',
}

XML_FIELD_LABELS = [
    'servNm', 'servId', 'servDgst', 'jurMnofNm', 'jurOrgNm', 'sprtCycNm',
    'srvPvsnNm', 'onapPsbltYn', 'rprsCtadr', 'servDtlLink', 'svcfrstRegTs',
    'lifeArray', 'intrsThemaArray', 'trgterIndvdlArray'
]

def safe_stem(path: Path) -> str:
    return re.sub(r'[^0-9A-Za-z가-힣_.-]+', '_', path.stem).strip('_')

def persona_for_name(name: str) -> str:
    for prefix, persona in PERSONA_PREFIXES.items():
        if name.startswith(prefix):
            return persona
    if name.startswith('한버팀'):
        return 'hanbeoteam'
    if name.startswith('김갓생'):
        return 'kimgatsaeng'
    return 'common'

def write_index():
    src = MOCK / 'index.md'
    text = src.read_text(encoding='utf-8')
    out = OUT / 'index.txt'
    out.write_text('# Source: mockdatas/index.md\n\n' + text, encoding='utf-8')
    return out

def xml_to_text(path: Path):
    tree = ET.parse(path)
    root = tree.getroot()
    lines = [f'# Source: {path.as_posix()}', f'# Persona: {persona_for_name(path.name)}', '']
    servs = root.findall('.//servList')
    if not servs:
        servs = [root]
    for idx, serv in enumerate(servs, 1):
        lines.append(f'## Service {idx}')
        for field in XML_FIELD_LABELS:
            node = serv.find(field)
            if node is not None and node.text and node.text.strip():
                lines.append(f'{field}: {node.text.strip()}')
        # Preserve any fields not in the curated order.
        known = set(XML_FIELD_LABELS)
        for node in list(serv):
            if node.tag not in known and node.text and node.text.strip():
                lines.append(f'{node.tag}: {node.text.strip()}')
        lines.append('')
    out = OUT / f'{persona_for_name(path.name)}__{safe_stem(path)}.txt'
    out.write_text('\n'.join(lines).rstrip() + '\n', encoding='utf-8')
    return out

def is_readable_pdf_text(s: str) -> bool:
    if len(s) < 4:
        return False
    if 'endstream' in s or 'endobj' in s or 'FlateDecode' in s or 'PDF Candy' in s:
        return False
    if re.search(r'/(?:F\d+|Font|XObject)\b', s):
        return False
    if re.search(r'\b(?:Tj|TJ|Tf|Td|Tm|rg|re|cm|BT|ET|W\*|Do|gs)\b', s):
        return False
    if len(re.findall(r'<[0-9A-Fa-f]{2,}>', s)) >= 2:
        return False
    if not re.search(r'(소득세법|조세특례|세액|소득|공제|거주자|근로|자녀|만원|제\d+조|제[0-9]+조|법)', s):
        return False
    allowed = 0
    meaningful = 0
    hangul = 0
    for ch in s:
        if ch.isspace() or ch in ".,:;!?()[]{}<>/-+%·ㆍ~'\"0123456789":
            allowed += 1
        elif '가' <= ch <= '힣' or 'ㄱ' <= ch <= 'ㅎ' or 'ㅏ' <= ch <= 'ㅣ':
            allowed += 1; meaningful += 1; hangul += 1
        elif 'A' <= ch <= 'Z' or 'a' <= ch <= 'z':
            allowed += 1; meaningful += 1
    return allowed / max(len(s), 1) >= 0.72 and meaningful >= 2 and hangul >= 2

def extract_pdf_literal_strings(data: bytes):
    # Fallback only. Many HWP->PDF files use embedded fonts/CMaps, so this is evidence text, not canonical content.
    strings = []
    for m in re.finditer(rb'\((?:\\.|[^\\()])*\)', data, re.S):
        raw = m.group(0)[1:-1]
        raw = re.sub(rb'\\([nrtbf()\\])', lambda x: {
            b'n': b'\n', b'r': b'\r', b't': b'\t', b'b': b'\b', b'f': b'\f', b'(': b'(', b')': b')', b'\\': b'\\'
        }[x.group(1)], raw)
        for enc in ('utf-16-be', 'utf-16-le', 'utf-8', 'cp949', 'latin1'):
            try:
                s = raw.decode(enc)
                break
            except Exception:
                s = ''
        s = re.sub(r'\s+', ' ', s).strip()
        if is_readable_pdf_text(s):
            strings.append(s)
    # Try FlateDecode streams and extract text-ish runs.
    for sm in re.finditer(rb'stream\r?\n(.*?)\r?\nendstream', data, re.S):
        chunk = sm.group(1)
        try:
            dec = zlib.decompress(chunk)
        except Exception:
            continue
        for raw in re.findall(rb'[\x20-\x7E\x80-\xFF]{4,}', dec):
            for enc in ('utf-8', 'cp949', 'latin1'):
                try:
                    s = raw.decode(enc)
                    break
                except Exception:
                    s = ''
            s = re.sub(r'\s+', ' ', s).strip()
            if is_readable_pdf_text(s):
                strings.append(s)
    # Dedupe keeping order.
    seen = set(); out = []
    for s in strings:
        if s not in seen:
            seen.add(s); out.append(s)
    return out

def pdf_to_text(path: Path):
    data = path.read_bytes()
    lines = [
        f'# Source: {path.as_posix()}',
        f'# Persona: {persona_for_name(path.name)}',
        '# Extraction: fallback PDF string/stream extraction using Python stdlib; canonical UI content should prefer mockdatas/index.md unless readable text below is explicit.',
        ''
    ]
    strings = extract_pdf_literal_strings(data)
    if strings:
        lines.extend(strings)
    else:
        lines.append('[no extractable plain text found by local fallback extractor]')
    out = OUT / f'{persona_for_name(path.name)}__{safe_stem(path)}.txt'
    out.write_text('\n'.join(lines).rstrip() + '\n', encoding='utf-8', errors='replace')
    return out

def write_manifest(outputs):
    lines = ['# Mockdatas text conversion manifest', '', 'Generated from files under `mockdatas/`.', '', '## Outputs']
    for p in outputs:
        lines.append(f'- `{p.relative_to(ROOT).as_posix()}`')
    lines.append('')
    lines.append('## Notes')
    lines.append('- Markdown and XML files preserve explicit source text and fields.')
    lines.append('- PDF files are converted with a dependency-free fallback extractor because this environment does not include `pdftotext`, `pypdf`, or `pdfminer`. If fallback output is sparse, `mockdatas/index.md` remains the canonical text evidence for UI data.')
    (OUT / 'manifest.md').write_text('\n'.join(lines) + '\n', encoding='utf-8')


def main():
    outputs = [write_index()]
    for path in sorted(MOCK.glob('*.xml')):
        outputs.append(xml_to_text(path))
    for path in sorted(MOCK.glob('*.pdf')):
        outputs.append(pdf_to_text(path))
    write_manifest(outputs)
    print(f'Wrote {len(outputs)} text files plus manifest to {OUT.relative_to(ROOT)}')

if __name__ == '__main__':
    main()
