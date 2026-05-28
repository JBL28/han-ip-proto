# Mock API 명세

기준 소스는 `mockdatas/index.md`, `mockdatas/*.xml`, `mockdatas/한버팀_*.pdf`입니다. 기존 임의/혼합 fixture는 제거하고, 화면 데이터는 이 폴더의 문서 내용만 사용합니다.

## Source manifest

`GET /api/mock/source-manifest`

```ts
type SourceManifest = {
  scenario: 'mockdatas/index.md';
  pdfExtractionFolder: '.omx/artifacts/pdf-text';
  policyXmlFolder: 'mockdatas';
  pdfs: Array<{
    id: string;
    file: string;
    extractedText: string;
    chars: number;
    status: 'extracted' | 'extracted-with-artifacts' | 'no-extractable-text';
    note?: string;
  }>;
};
```

추출 상태:
- 한버팀 PDF 9개 중 8개에서 텍스트 evidence 사용.
- `한버팀_1번_소득세법_20조 (1).pdf`는 현재 추출 가능한 텍스트가 없어 evidence에는 넣지 않음.
- `한버팀_5번_소득세법_34조_59조_4.hwp.pdf`는 일부 조문 번호/특수문자 깨짐이 있어 `extracted-with-artifacts`로 표시.

## `GET /api/mock/personas`

```ts
type Persona = {
  id: 'hanbeoteam' | 'kimgatsaeng';
  name: string;
  age: string;
  label: string;
  source: string;
  signup: { incomeBasic: string; residenceFamily: string; dataConnection: string };
  home: { totalBenefitMessage: string; recommendations: string[]; calendar: string[] };
  taxSaving: { items: TaxSavingItem[]; aiQuestion: string; addedDeduction: string };
  chatbot: { selectedPersona: string; description: string; questions: string[] };
  mypage: { benefitAmount: string };
  notifications: { recommendations: string[]; statuses: string[] };
};
```

## `GET /api/mock/tax-savings?persona=hanbeoteam|kimgatsaeng`

```ts
type TaxSavingItem = {
  id: string;
  title: string;
  description: string;
  legalBasis: string[];
  sourceDocuments: string[];
  evidence?: Array<{ sourceId: string; line: string; text: string }>;
};
```

- `hanbeoteam` 6개 항목은 `mockdatas/index.md`의 항목명/설명에 한버팀 PDF 추출 원문 excerpt를 연결.
- `evidence[].text`는 `.omx/artifacts/pdf-text/*.txt`의 해당 line range 원문을 그대로 보존. 별도 요약/정제 문장은 넣지 않음.
- `kimgatsaeng` 6개 항목은 별도 PDF가 없으므로 `mockdatas/index.md` 기준으로만 구성.

## `GET /api/mock/welfare-policies?persona=hanbeoteam|kimgatsaeng`

복지로 XML의 실제 필드를 보존합니다. 화면 표시명은 `mockdatas/index.md`의 정책추천 문구를 우선합니다. `index.md`의 표시명과 XML `servNm`이 다른 경우 `displayNameFromIndex`, `xmlServNm`, `sourceConflict: true`로 둘 다 보존합니다. `mockdatas/index.md`에만 있는 정책은 `sourceFile: 'mockdatas/index.md'`, `note`로 표시합니다.

주요 필드:
- `sourceFile`
- `displayNameFromIndex`
- `xmlServNm`
- `sourceConflict`
- `sourceConflictNote`
- `duplicateSourceFile`
- `servId`
- `servNm`
- `servDgst`
- `jurMnofNm`
- `jurOrgNm`
- `lifeArray`
- `intrsThemaArray`
- `onapPsbltYn`
- `rprsCtadr`
- `sprtCycNm`
- `srvPvsnNm`
- `svcfrstRegTs`
- `trgterIndvdlArray`
- `servDtlLink`
- `note`

## `GET /api/mock/chatbot-personas`

- 초보형
- 관심형
- 공부형

## 구현상 주의

- 실제 백엔드/계산/판정 로직 없음.
- PDF evidence는 로컬 추출 산출물(`.omx/artifacts/pdf-text/*.txt`)의 줄 기준으로 연결.
- 사용자가 올린 문서 범위를 벗어난 새 수치, 새 정책, 새 공제 항목은 추가하지 않음.
