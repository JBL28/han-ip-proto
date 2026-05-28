#!/usr/bin/env python3
import re, zlib, sys
from pathlib import Path

OBJ_RE = re.compile(rb'(?m)^(\d+)\s+(\d+)\s+obj\b(.*?)\bendobj', re.S)
STREAM_RE = re.compile(rb'stream\r?\n(.*?)\r?\nendstream', re.S)

def decode_stream(obj):
    m = STREAM_RE.search(obj)
    if not m:
        return None
    raw = m.group(1)
    if b'/FlateDecode' in obj:
        try:
            return zlib.decompress(raw)
        except Exception:
            return raw
    return raw

def parse_cmap(data):
    out = {}
    text = data.decode('latin1', 'ignore')
    for src, dst in re.findall(r'<([0-9A-Fa-f]+)>\s+<([0-9A-Fa-f]+)>', text):
        # skip codespacerange-like huge ranges when dst is FFFF etc only if no beginbf around? harmless but avoid identity ranges
        if src == '0000' and dst.upper() == 'FFFF':
            continue
        try:
            chars = bytes.fromhex(dst).decode('utf-16-be')
        except Exception:
            try:
                chars = chr(int(dst, 16))
            except Exception:
                chars = ''
        out[bytes.fromhex(src)] = chars
    return out

def decode_hex(hexstr, cmap):
    bs = bytes.fromhex(re.sub(r'\s+', '', hexstr))
    if not bs:
        return ''
    keys = sorted(cmap.keys(), key=len, reverse=True)
    i = 0; res = []
    while i < len(bs):
        hit = None
        for k in keys:
            if k and bs.startswith(k, i):
                hit = k; break
        if hit:
            res.append(cmap[hit]); i += len(hit)
        else:
            # fallback: single byte latin marker
            b = bytes([bs[i]])
            res.append(cmap.get(b, ''))
            i += 1
    return ''.join(res)

def extract(path):
    raw = Path(path).read_bytes()
    objects = {int(n): body for n, gen, body in OBJ_RE.findall(raw)}
    font_maps = {}
    for n, body in objects.items():
        if b'/Type /Font' not in body or b'/ToUnicode' not in body:
            continue
        name_m = re.search(rb'/Name\s+/(\S+)', body)
        uni_m = re.search(rb'/ToUnicode\s+(\d+)\s+\d+\s+R', body)
        if not name_m or not uni_m:
            continue
        name = name_m.group(1).decode('latin1')
        uni_obj = objects.get(int(uni_m.group(1)), b'')
        dec = decode_stream(uni_obj) or b''
        font_maps[name] = parse_cmap(dec)
    entries = []
    for n, body in objects.items():
        dec = decode_stream(body)
        if not dec or (b'Tj' not in dec and b'TJ' not in dec):
            continue
        s = dec.decode('latin1', 'ignore')
        for bt in re.findall(r'BT(.*?)ET', s, re.S):
            fm = re.search(r'/(\S+)\s+[\d.]+\s+Tf', bt)
            tm = re.search(r'(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)\s+Tm', bt)
            if not fm:
                continue
            font = fm.group(1)
            cmap = font_maps.get(font, {})
            if not cmap:
                continue
            parts = []
            for hx in re.findall(r'<([0-9A-Fa-f\s]*)>', bt):
                parts.append(decode_hex(hx, cmap))
            txt = ''.join(parts)
            if txt.strip():
                x = float(tm.group(1)) if tm else 0.0
                y = float(tm.group(2)) if tm else 0.0
                entries.append((n, y, x, txt))
    # Sort by stream object then y then x. PDFs here already content stream in reading-ish order; preserve object, then y ascending.
    entries.sort(key=lambda e: (e[0], e[1], e[2]))
    lines = []
    last_key = None
    buf = []
    for obj, y, x, txt in entries:
        key = (obj, round(y / 35))
        if last_key is not None and key != last_key:
            line = ''.join(buf).strip()
            if line:
                lines.append(line)
            buf = []
        buf.append(txt)
        last_key = key
    if buf:
        line = ''.join(buf).strip()
        if line:
            lines.append(line)
    # Cleanup: collapse repeated spaces and remove empty
    clean = []
    for line in lines:
        line = re.sub(r'[ \t]+', ' ', line)
        if line and line not in clean[-3:]:
            clean.append(line)
    return '\n'.join(clean), font_maps, len(entries)

if __name__ == '__main__':
    for p in sys.argv[1:]:
        text, maps, count = extract(p)
        print(f'### {p} entries={count} fonts={len(maps)}')
        print(text[:5000])
        print()
