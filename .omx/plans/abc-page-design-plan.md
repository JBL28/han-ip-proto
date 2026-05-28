# A/B/C 페이지별 디자인 버전 구현 계획

작성일: 2026-05-28  
상태: Planning only — 아직 구현하지 않음  
근거 문서:
- `설계문서.md`
- `wireframes/회원가입 플로우.png`
- `wireframes/메인페이지.png`
- `wireframes/메인페이지2.png`
- `wireframes/절세 추천.png`
- `wireframes/절세챗봇.png`
- `wireframes/공제 상세보기.png`
- `wireframes/정책추천.png`
- `wireframes/정책 상세보기.png`
- `wireframes/알림.png`
- `wireframes/마이페이지.png`
- `wireframes/AI페르소나변경.png`

## 1. 목표

페이지별로 A, B, C 세 가지 디자인 버전을 만든다.

- A 버전 페이지끼리 같은 margin, color, font, radius, card, button 규칙을 공유한다.
- B 버전 페이지끼리 같은 규칙을 공유한다.
- C 버전 페이지끼리 같은 규칙을 공유한다.
- 화면 구조와 콘텐츠는 `설계문서.md`와 wireframes 기준으로 유지한다.
- 기능 구현보다 디자인 완성도, 앱뷰 경험, 피드백 기반 점진 구현을 우선한다.
- 이번 단계에서는 구현하지 않고, 페이지별 구현 순서와 설계만 정한다.

## 2. 라우트 / 엔드포인트 계획

앱뷰 프로토타입에서 “엔드포인트”는 페이지 라우트로 해석한다.

### Variant A
- `/a/signup`
- `/a/home`
- `/a/tax-saving`
- `/a/tax-chat`
- `/a/deduction-detail`
- `/a/policies`
- `/a/policy-detail`
- `/a/notifications`
- `/a/my`
- `/a/persona`

### Variant B
- `/b/signup`
- `/b/home`
- `/b/tax-saving`
- `/b/tax-chat`
- `/b/deduction-detail`
- `/b/policies`
- `/b/policy-detail`
- `/b/notifications`
- `/b/my`
- `/b/persona`

### Variant C
- `/c/signup`
- `/c/home`
- `/c/tax-saving`
- `/c/tax-chat`
- `/c/deduction-detail`
- `/c/policies`
- `/c/policy-detail`
- `/c/notifications`
- `/c/my`
- `/c/persona`

### 라우트 규칙
- 같은 page id는 콘텐츠와 정보 구조를 공유한다.
- variant만 다르면 시각 언어만 달라진다.
- 예: `/a/home`, `/b/home`, `/c/home`은 같은 홈 콘텐츠를 다른 디자인 시스템으로 보여준다.

## 3. A/B/C 디자인 방향

### A안 — Toss/Naver Pay 계열의 가장 절제된 금융 앱

목표: 가장 실사용 앱처럼 보이는 기본안.

- 배경: white
- 포인트: 선명한 blue
- 폰트: 시스템 sans, 굵은 제목과 짧은 본문
- 카드: 흰 카드 + 옅은 border + 아주 약한 shadow
- 버튼: solid blue primary, ghost secondary
- 마진: 좌우 20px, 섹션 간 24~32px
- 라운드: 20~24px
- 모션: 부드러운 fade/slide, press scale 0.98
- UX 느낌: 토스처럼 “지금 뭘 보면 되는지” 명확한 구조

### B안 — 정보 카드 중심의 분석형 앱

목표: 세금/공제/정책 정보를 더 구조적으로 읽게 하는 안.

- 배경: very light blue-gray
- 포인트: navy blue
- 폰트: 시스템 sans, 숫자/금액은 tabular 느낌 강조
- 카드: 구획이 확실한 card stack
- 버튼: pill button, 선택 상태가 뚜렷한 segmented control
- 마진: 좌우 16px, 카드 내부 18~20px
- 라운드: 16~18px
- 모션: 카드 expand/collapse 중심
- UX 느낌: 항목별 요약, 공제 상세, 정책 목록처럼 정보량이 있는 페이지에 강함

### C안 — AI 비서/챗봇 친화형 앱

목표: 친근하고 대화형 서비스처럼 느껴지는 안.

- 배경: white + soft blue tint section
- 포인트: blue violet 또는 friendly blue
- 폰트: 시스템 sans, 본문 가독성 우선
- 카드: 말풍선/soft panel 스타일
- 버튼: rounded chip, FAQ chip, floating prompt
- 마진: 좌우 18px, 말풍선 간격 10~14px
- 라운드: 24~28px
- 모션: 메시지 등장, 추천 질문 chip 등장
- UX 느낌: 절세챗봇, 정책 질문, AI 페르소나 변경에 강함

## 4. `global.css` 선정의 기준

구현 전에 `global.css`에서 아래를 먼저 정의한다.

### 공통 앱뷰 토큰

```css
:root {
  --app-min-width: 320px;
  --app-max-width: 430px;
  --safe-top: env(safe-area-inset-top, 0px);
  --safe-bottom: env(safe-area-inset-bottom, 0px);
  --touch-target: 48px;
  --motion-fast: 140ms;
  --motion-base: 220ms;
  --motion-slow: 320ms;
}
```

### Variant 토큰

```css
[data-theme="a"] {
  --color-bg: #ffffff;
  --color-surface: #ffffff;
  --color-accent: #2563eb;
  --color-text: #111827;
  --color-muted: #6b7280;
  --space-page-x: 20px;
  --radius-card: 24px;
}

[data-theme="b"] {
  --color-bg: #f5f8ff;
  --color-surface: #ffffff;
  --color-accent: #1d4ed8;
  --color-text: #0f172a;
  --color-muted: #64748b;
  --space-page-x: 16px;
  --radius-card: 18px;
}

[data-theme="c"] {
  --color-bg: #ffffff;
  --color-surface: #f4f8ff;
  --color-accent: #4f46e5;
  --color-text: #111827;
  --color-muted: #6b7280;
  --space-page-x: 18px;
  --radius-card: 28px;
}
```

실제 구현 시 위 값은 먼저 고정하고, 페이지별 피드백을 반영할 때 variant 단위로만 조정한다.

## 5. 페이지별 콘텐츠 분석

### 5.1 회원가입 플로우 — `signup`

근거:
- `설계문서.md`의 “가입 시 질문”
- `wireframes/회원가입 플로우.png`

들어갈 콘텐츠:
- 본인 인증: 통신사/카카오톡 본인 인증, 마이데이터 연결 안내
- 가족 관계 질문: 1인가구, 부모님, 배우자, 자녀 여부, 생년월일
- 소득 정보: 직장인/사업자/프리랜서/학생/무직/기타, 연소득 입력
- 주거 정보: 주거 지역, 세대원/월세/전세/자가
- 더 많은 혜택 찾기 O/X: 경력 단절 여부, 장애인 여부, 중소기업 취업 여부

피드백 반영 포인트:
- 가족관계 선택 중복 제거
- 버튼 클릭란과 인원수 조정란을 분리하지 않고 단순화
- 나이는 bold 처리하되 양식 통일
- 연소득은 만원 단위 + 쉼표 처리
- 1인가구 선택 시 배우자/자녀/부모 미선택이어도 가입 완료 가능

재사용 컴포넌트 후보:
- `StepHeader`
- `ChoiceButton`
- `NumberInput`
- `RelationCounter`
- `BottomCTA`
- `ProgressDots`

### 5.2 메인 페이지 — `home`

근거:
- `설계문서.md`의 “메인 페이지”
- `wireframes/메인페이지.png`
- `wireframes/메인페이지2.png`

들어갈 콘텐츠:
- 사용자 상황 기반 홈 요약
- 연말정산 진입: 나의 환급금 찾기 또는 절세 분석 중 택 1
- 종합소득세 진입: 연말정산과 같은 구조
- 세금 시뮬레이션 진입: 마이데이터 기반 자동 입력 가정, 미리 입력된 금액 수정 가능 맥락
- 정책 찾기 진입: 추천 정책/지원금
- 설계상 추가 기능: 국세청 126 전화 연결 버튼은 별도 피드백 후 구현 여부 결정

중요 제약:
- 메인에 모든 기능을 과하게 펼치지 않는다.
- 사용자가 “무엇부터 보면 되는지”를 알 수 있게 우선순위를 둔다.
- wireframe상 메인페이지/메인페이지2가 있으므로 첫 구현 전 둘 중 기준안을 하나 선택해야 한다.

재사용 컴포넌트 후보:
- `AppHeader`
- `HeroSummary`
- `ActionCard`
- `FeatureListItem`
- `PrimaryCTA`

### 5.3 절세 추천 — `tax-saving`

근거:
- 연말정산/종합소득세 요약 요구
- `wireframes/절세 추천.png`

들어갈 콘텐츠:
- 환급금 또는 절세 가능성 요약
- 간단 요약 자료
- 항목별 토글: 이미 낸 세금, 인적공제, 보험료, 의료비, 교육비, 신용카드 등 사용액, 기부금
- 종합소득세 버전 토글: 종합소득금액, 이자/배당/사업/근로/연금/기타, 소득공제, 세액공제
- 절세 분석 챗봇으로 이어지는 CTA

재사용 컴포넌트 후보:
- `AmountSummary`
- `DisclosureCard`
- `SummaryRow`
- `CTASection`

### 5.4 절세챗봇 — `tax-chat`

근거:
- `설계문서.md`의 “절세 분석 챗봇”
- `wireframes/절세챗봇.png`

들어갈 콘텐츠:
- 상단 고정 요약: 환급금 금액, 요약 내용, 카톡방 공지처럼 간소화
- 자주 묻는 질문: 연말정산, 원천징수, 신고 이유, 소득공제/세액공제 차이, 부업 소득, 현금영수증, 환급 늘리는 법
- 파일 업로드 진입: 실제 업로드 로직은 구현하지 않고 mock action으로 표현

재사용 컴포넌트 후보:
- `ChatNotice`
- `ChatBubble`
- `QuestionChip`
- `ComposerBar`
- `MockUploadButton`

### 5.5 공제 상세보기 — `deduction-detail`

근거:
- `설계문서.md`의 토글 상세 요구
- `wireframes/공제 상세보기.png`

들어갈 콘텐츠:
- 선택된 공제 항목명
- 항목별 금액
- 상세 breakdown: 신용카드, 직불카드, 현금영수증, 전통시장, 대중교통 등
- 설명 텍스트
- 절세챗봇 질문 CTA

재사용 컴포넌트 후보:
- `DetailHeader`
- `BreakdownTable`
- `InfoCallout`
- `AskAIButton`

### 5.6 정책추천 — `policies`

근거:
- `설계문서.md`의 “정책 찾기”
- `wireframes/정책추천.png`

들어갈 콘텐츠:
- 최초 접속 시 카테고리 선택 또는 건너뛰기
- 카테고리: 문화/교육/취업/의료/대출/지원금/보호/행정/주거
- 정책 화면: 카테고리 선택 결과, 마이데이터 기반 추천 정책, 정책 이름, 카테고리 키워드, 지원 가능 금액
- 챗봇 플로팅 박스: 추천 정책/지원금 관련 질문

재사용 컴포넌트 후보:
- `CategoryChip`
- `PolicyCard`
- `FloatingChatButton`
- `EmptyFilterHint`

### 5.7 정책 상세보기 — `policy-detail`

근거:
- 정책 클릭 시 상세 내용 요구
- `wireframes/정책 상세보기.png`

들어갈 콘텐츠:
- 정책 이름
- 카테고리 키워드
- 지원 가능 금액
- 지원 대상
- 신청 기간
- 신청 방법
- 유의사항
- 스크랩 액션
- 챗봇 질문 진입

재사용 컴포넌트 후보:
- `PolicyDetailHeader`
- `DefinitionList`
- `ScrapButton`
- `BottomCTA`

### 5.8 알림 — `notifications`

근거:
- 한버팀 시나리오의 신청 기간 놓침 문제
- `wireframes/알림.png`

들어갈 콘텐츠:
- 신청 마감 알림
- 추천 혜택 알림
- 세금 일정 알림
- 챗봇/정책 관련 알림

중요:
- 실제 push/notification 기능은 구현하지 않음
- mock list만 표시

재사용 컴포넌트 후보:
- `NotificationItem`
- `DateBadge`
- `StatusPill`

### 5.9 마이페이지 — `my`

근거:
- 정책 스크랩 기능 추가 요구
- `wireframes/마이페이지.png`

들어갈 콘텐츠:
- 내 정보 요약
- 연결된 마이데이터 상태
- 스크랩한 정책
- 가족/소득/주거 정보 재확인
- AI 페르소나 변경 진입

재사용 컴포넌트 후보:
- `ProfileSummary`
- `SettingRow`
- `ScrappedPolicyList`
- `InfoCard`

### 5.10 AI 페르소나 변경 — `persona`

근거:
- `wireframes/AI페르소나변경.png`
- 페르소나/시나리오 기반 서비스 방향

들어갈 콘텐츠:
- 현재 AI 설명 방식
- 쉬운 설명 / 꼼꼼한 설명 / 절세 코치형 등 persona 선택
- 선택 후 챗봇 톤에 반영된다는 mock 안내

재사용 컴포넌트 후보:
- `PersonaCard`
- `SelectableCard`
- `BottomCTA`

## 6. Mock API 계획

실제 백엔드는 만들지 않지만, mock 데이터는 API 응답처럼 분리한다.

### 공통

```ts
type Variant = 'a' | 'b' | 'c';
type PageId =
  | 'signup'
  | 'home'
  | 'tax-saving'
  | 'tax-chat'
  | 'deduction-detail'
  | 'policies'
  | 'policy-detail'
  | 'notifications'
  | 'my'
  | 'persona';
```

### `GET /api/prototype/:variant/:pageId`

목적:
- 특정 variant와 page에 필요한 mock content를 반환한다.

응답 예시:
```json
{
  "variant": "a",
  "pageId": "home",
  "title": "한입",
  "sections": []
}
```

### 데이터 분리 원칙

- content fixture는 page 기준으로 공유한다.
- theme fixture는 variant 기준으로 공유한다.
- 페이지 구현은 `pageId + variant` 조합으로 렌더링한다.

## 7. 파일 구조 계획

프레임워크는 아직 확정하지 않았지만, React/Vite 기준이면 아래 구조를 권장한다.

```txt
src/
  app/
    routes.tsx
  data/
    mockApi.ts
    pages/
      signup.ts
      home.ts
      taxSaving.ts
      taxChat.ts
      deductionDetail.ts
      policies.ts
      policyDetail.ts
      notifications.ts
      my.ts
      persona.ts
  components/
    common/
      AppShell.tsx
      AppHeader.tsx
      Button.tsx
      Card.tsx
      Chip.tsx
      BottomCTA.tsx
      DisclosureCard.tsx
      PageTransition.tsx
    page/
      signup/
      home/
      taxSaving/
      taxChat/
      policies/
  styles/
    global.css
```

## 8. 싱글파일 컴포넌트화 기준

재사용 빈도가 높으면 page 안에 두지 않고 `components/common`으로 올린다.

공통화 대상:
- 버튼
- 카드
- 칩
- 바텀 CTA
- 상단 헤더
- 리스트 아이템
- 토글/디스클로저
- 금액 요약 카드
- 채팅 말풍선
- 정책 카드

공통화하지 않는 대상:
- 특정 페이지에서 한 번만 쓰는 고유 레이아웃
- wireframe에만 존재하는 실험적 배치
- 피드백 전 확정되지 않은 컴포넌트

## 9. 페이지별 구현 순서

사용자가 페이지 하나씩 피드백한다고 했으므로, 아래 순서로 간다.

1. `global.css` + `AppShell` + A/B/C theme만 먼저 준비
2. `/a/home`, `/b/home`, `/c/home`
   - 가장 중요한 첫인상과 전체 디자인 방향 비교
3. `/a/tax-saving`, `/b/tax-saving`, `/c/tax-saving`
   - 정보 카드/토글/금액 요약 패턴 확정
4. `/a/tax-chat`, `/b/tax-chat`, `/c/tax-chat`
   - AI 말투, 공지형 요약, FAQ chip 패턴 확정
5. `/a/policies`, `/b/policies`, `/c/policies`
   - 정책 카드와 카테고리 chip 패턴 확정
6. `/a/policy-detail`, `/b/policy-detail`, `/c/policy-detail`
7. `/a/deduction-detail`, `/b/deduction-detail`, `/c/deduction-detail`
8. `/a/signup`, `/b/signup`, `/c/signup`
   - 입력/선택 UI는 피드백 비용이 높으므로 기본 패턴 확정 후 진행
9. `/a/notifications`, `/b/notifications`, `/c/notifications`
10. `/a/my`, `/b/my`, `/c/my`
11. `/a/persona`, `/b/persona`, `/c/persona`

## 10. 피드백 루프

각 페이지 구현 단위마다 아래 순서로 진행한다.

1. 해당 page의 A/B/C 디자인 구현
2. 앱뷰 크기에서 캡처/확인
3. 사용자 피드백 수집
4. 선택된 variant 또는 혼합 방향 결정
5. `global.css` 토큰 조정
6. 공통 컴포넌트로 승격할 요소 정리
7. 다음 페이지 구현

## 11. 수용 기준

- A 페이지끼리 visual system이 일관된다.
- B 페이지끼리 visual system이 일관된다.
- C 페이지끼리 visual system이 일관된다.
- 같은 페이지의 A/B/C는 콘텐츠는 같고 디자인만 다르다.
- `global.css`에서 화면 크기, margin, font, color, radius, motion이 관리된다.
- 버튼/카드/chip 등 반복 요소는 싱글파일 컴포넌트로 분리된다.
- 설계문서에 없는 새 기능은 추가하지 않는다.
- 이번 단계에서는 구현하지 않고 계획 문서만 남긴다.

## 12. 다음 액션

첫 구현 대상은 `home`을 권장한다.

이유:
- 메인 페이지가 서비스의 톤을 결정한다.
- A/B/C 전체 디자인 방향을 가장 빨리 비교할 수 있다.
- 이후 절세 추천, 정책 추천, 챗봇 페이지의 공통 컴포넌트 방향을 정하기 쉽다.

다음 구현 요청 예:

```txt
home 페이지 A/B/C부터 구현해줘.
```
