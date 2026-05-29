# 한국 모바일 앱 레이아웃 리서치 노트

작성일: 2026-05-28  
목적: 회원가입 플로우 및 이후 페르소나 기반 앱뷰 화면 구현 전, 한국 모바일 앱 문맥에 맞는 레이아웃 구성 원칙을 정리한다.  
적용 범위: `/hanbeoteam|kimgatsaeng/signup` 우선, 이후 home/tax/policies/chat 화면에도 공통 적용.


## 0. 구현 전 필수 확인 규칙

모든 페이지 구현자는 코드 수정 전에 이 문서의 핵심 결론과 구현 체크리스트를 먼저 확인한다. 이후 해당 페이지의 근거 문서(`설계문서.md`, `wireframes/`)를 대조하고, 페이지별 구현 선택을 아래 원칙에 맞춘다.

- 한 화면 한 목적, 한 CTA 원칙을 깨지 않는다.
- 모바일 앱뷰 320~430px, 터치 타깃 48px, 하단 CTA/nav 겹침 방지를 먼저 본다.
- 요구사항/시나리오에 없는 기능성 요소를 추가하지 않는다.
- 라우팅은 페르소나(`hanbeoteam`, `kimgatsaeng`) 기준으로 구성하고 선택 상태를 기억한다.
- 이전 디자인 실험 라우트와 내부 실험 라벨은 사용자 화면과 코드 경로에 다시 도입하지 않는다.
- 그라데이션은 사용하지 않는다. 배경, 카드, CTA, 장식 요소, 진행 표시는 단색으로만 구성한다.
- “기능 없음”은 백엔드/실제 인증/실계산/영속 저장이 없다는 뜻이지 UI가 반응하지 않아도 된다는 뜻이 아니다. 선택, 입력, 카운터, 다음/이전, 라우팅, 진행률, 토글 등 화면 상호작용은 반드시 작동해야 한다.
- 충돌이 있으면 구현보다 문서/계획 보정을 먼저 한다.

## 1. 핵심 결론

회원가입 화면은 “많은 정보를 한 번에 받는 폼”이 아니라 **한 단계에서 한 판단만 하게 하는 모바일 퍼널**로 구현한다.

- 한 화면의 핵심 질문은 1개로 제한한다.
- 정보 구조는 `진행 상태 → 질문/설명 → 선택/입력 → 보조 안내 → 하단 CTA` 순서로 고정한다.
- 320~430px 앱뷰에서 먼저 완성하고, 데스크톱은 앱 프레임을 중앙에 두는 정도로만 처리한다.
- 가족관계 선택은 설계문서 피드백대로 “버튼 영역 + 인원수 조정 영역”을 분리하지 않고, 하나의 카드/스테퍼로 합친다.
- 터치 영역은 최소 48px에 맞춘다. 작은 아이콘도 실제 터치 hit area는 48px 이상으로 둔다.
- 금융/세금 맥락에서는 과장, 불안 유발, 모호한 질문형 CTA를 피하고, 사용자가 다음 행동을 바로 알 수 있는 문구를 쓴다.

## 2. 외부 근거 요약

### 2.1 레이아웃/그리드: 통일성과 시각적 질서

디자인베이스는 앱 레이아웃을 화면 크기, 텍스트, 이미지, 여백 등 구성요소를 고려해 정보를 시각적으로 배치하는 작업으로 설명하고, 그리드 시스템을 요소를 질서 있게 배치하기 위한 규칙으로 설명한다. 구현에는 아래처럼 반영한다.

- 회원가입 플로우는 1-column 세로 스택을 기본으로 한다.
- 좌우 여백은 공통 앱 토큰을 쓰고, 모든 입력/카드의 시작점은 같은 x축에 맞춘다.
- 섹션 간격은 질문 전후를 가장 크게, 카드 내부 항목 간격은 작게 둔다.
- 숫자/연소득/나이 같은 값은 굵기와 tabular 숫자 스타일로 읽기 쉽게 만든다.

Source: https://designbase.co.kr/uxui-02-2/

### 2.2 한 화면 한 목적: One thing per page

토스는 복잡한 화면에서 여러 메시지를 한 번에 전달하려는 시도가 UX를 흐릴 수 있다고 보고, `One thing per one page` 원칙을 제품 피드백 기준으로 삼는다. 회원가입에는 아래처럼 적용한다.

- 본인 인증, 가족 관계, 소득, 주거, 추가 혜택 질문을 한 화면에 모두 펼치지 않는다.
- 이 프로토타입에서는 실제 step 전환 로직 없이도 “현재 단계 카드 + 다음 단계 미리보기” 정도로만 표현한다.
- 각 섹션 제목은 사용자가 답해야 하는 질문형으로 두되, CTA는 행동형으로 쓴다.

Source: https://toss.tech/article/design-motivation

### 2.3 Easy to answer: 고민하게 만드는 선택지 줄이기

토스의 Easy to answer 사례는 선택지가 좋아 보여도 사용자가 선택 앞에서 멈칫하면 이탈 원인이 될 수 있음을 보여준다. 회원가입에는 아래처럼 적용한다.

- “부모님 있음/없음”과 “부모님 인원수”를 별도 UI로 나누지 않는다.
- 선택 카드 자체에 `- 0 +` 또는 `선택됨 + 인원`을 함께 보여준다.
- 1인가구를 선택하면 배우자/자녀/부모를 0명으로 둔 상태도 완료 가능하게 보이도록 한다.
- 선택지는 2열 chip보다, 설명이 필요한 항목은 full-width 카드가 낫다.

Source: https://toss.tech/article/insurance-claim-process

### 2.4 가입 화면은 실제 구현 상태와 시안 차이까지 고려

토스 가입 화면 회고는 디자인 시안과 실제 구현 차이가 UX 품질을 바꿀 수 있음을 보여준다. 현재 repo도 정적 HTML/JS로 구현하므로, 시안처럼 보이는 것보다 **구현 가능한 일관 패턴**을 우선한다.

- 입력 필드/선택 카드/스테퍼를 실제 CSS 컴포넌트로 반복 가능하게 만든다.
- “연소득 만원 단위 + 쉼표 처리”는 정적 프로토타입에서도 표시 예시를 명확히 둔다.
- 단계 진행률은 실제 상태 저장 없이도 현재 플로우 구조를 이해시키는 정도로 구현한다.

Source: https://toss.tech/article/toss-signup-process

### 2.5 모바일 우선: 데스크톱에서 축소가 아니라 모바일에서 출발

토스 Simplicity 제작기는 모바일 사용자 증가에 맞춰 처음부터 모바일 중심으로 화면과 인터페이스를 설계한 사례를 설명한다. 이 프로젝트도 앱뷰 전용이므로 아래 원칙을 유지한다.

- `max-width: 430px` 앱 프레임 기준으로 먼저 맞춘다.
- bottom CTA와 하단 내비게이션이 겹치지 않도록 본문 스크롤 영역과 safe area를 분리한다.
- 스크롤 가능성을 숨기지 않는다. 앱쉘 전체 `overflow: hidden`만 두고 본문을 못 읽게 만들면 안 된다.

Source: https://toss.tech/article/simplicity_behind

### 2.6 모바일 브라우저/웹뷰 구현 제약

토스 Simplicity 프론트엔드 회고는 모바일 Safari/삼성 브라우저 차이, blur 성능, 에셋 로드 최적화 같은 구현 제약을 다룬다. 현재 정적 프로토타입에는 아래처럼 적용한다.

- heavy blur/large shadow를 과하게 쓰지 않는다.
- `linear-gradient`, `radial-gradient`, `conic-gradient`와 그라데이션 배경 이미지는 추가하지 않는다.
- 이미지보다 CSS 카드/칩/텍스트로 구현한다.
- `backdrop-filter`는 이미 쓰고 있으므로 주요 콘텐츠 카드에는 반복 적용하지 않는다.
- 동작은 CSS transition 위주로 두고, JS 상태/애니메이션 의존을 최소화한다.

Source: https://toss.tech/article/simplicity4-frontend-engineering

### 2.7 터치 타깃과 접근성

Android Accessibility는 클릭/터치 가능한 요소를 48dp 이상으로 둘 것을 권장하고, 시각적 크기보다 실제 터치 영역이 중요하다고 설명한다. W3C WCAG 2.2는 포인터 입력 타깃 최소 크기와 간격 기준을 제시한다.

- 버튼, 선택 카드, 스테퍼 버튼, chip은 최소 높이 48px.
- 작은 `+/-` 버튼도 visual 32px로 보이더라도 hit area는 48px에 가깝게 둔다.
- sticky bottom CTA가 있을 경우 키보드 focus가 가려지지 않도록 bottom padding을 충분히 둔다.
- 선택 카드 간격은 최소 8px 이상.

Sources:
- https://support.google.com/accessibility/android/answer/7101858
- https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/

### 2.8 모바일은 축소된 웹이 아니라 별도 사용 맥락

개발자/학습 블로그 글들은 모바일 UI가 제한된 화면, 터치 중심 인터랙션, 즉시 피드백, 사용 맥락을 전제로 해야 한다고 정리한다. 구현에는 아래처럼 반영한다.

- 데스크톱 폼처럼 label/input을 빽빽하게 나열하지 않는다.
- 카드 선택 시 선택 상태, press 상태, 완료 가능 상태를 즉시 보여준다.
- 설명은 한 문단보다 짧은 helper text와 예시 값 중심으로 둔다.
- 사용자 흐름은 화면 단위로 끊고, 각 단계의 “다음 행동”을 명확히 한다.

Sources:
- https://multiking.tistory.com/191
- https://www.dgmunit1.com/blog/uxui/ux-ui-1

### 2.9 한국 결제/금융 UI의 브랜드 일관성과 과업 비중

네이버페이 디자인 가이드는 로고/버튼을 임의 변경하지 않고, 화면의 다른 주요 과업과 동일한 비중으로 찾기 쉽게 배치하라고 안내한다. 이 프로젝트는 네이버페이 UI를 복제하지 않지만, 금융 앱 신뢰감 측면에서 아래처럼 적용한다.

- 브랜드/로고/CTA는 임의 장식보다 일관된 위치와 크기를 우선한다.
- 본인인증/마이데이터 연결 같은 신뢰 과업은 카드 안에서 명확히 구분한다.
- 주요 CTA는 화면 하단에 하나만 둔다.

Source: https://developers.pay.naver.com/design/brand/usage

### 2.10 작업 전 명세 정리

크몽의 앱 UI/UX 체크리스트는 화면 수, 구성 명세, 레퍼런스, UX 설계 여부, 브랜드/폰트 규정을 먼저 정리하면 작업 효율과 일관성이 높아진다고 설명한다. 이 repo에는 이미 `DESIGN.md`, `설계문서.md`, `wireframes/`가 있으므로 구현은 이 네 가지를 기준으로 한다.

Source: https://kmong.com/prices/%EC%95%B1-ui-ux

## 3. 회원가입 플로우 구현 원칙

### 3.1 정보 구조

권장 순서:

1. 상단 앱 헤더
2. 진행률/단계 표시
3. 큰 질문 제목
4. 짧은 설명
5. 현재 단계 입력/선택 카드
6. 다음 단계 preview 또는 완료 조건 안내
7. 하단 고정 CTA

### 3.2 단계별 화면 구성

#### 본인 인증 / 마이데이터 연결

- 목적: 사용자가 왜 인증이 필요한지 신뢰감 있게 이해.
- 구성: `통신사/카카오톡 본인 인증`, `마이데이터 연결`, `홈택스·정부24·은행 연결`을 3개 체크 카드로 표현.
- 금지: 실제 인증 기능처럼 오해되는 로딩/성공 저장 로직.

#### 가족 관계

- 목적: 피드백 반영이 가장 중요한 구간.
- 구성:
  - `1인가구`는 단일 선택 카드.
  - `부모님`, `배우자`, `자녀`는 선택과 인원 조정을 한 카드 안에서 처리.
  - 나이/생년월일 예시는 굵게 처리하되 같은 글꼴/크기 체계 유지.
- 명시: 1인가구 선택 시 부모/배우자/자녀 0명이어도 가입 가능.

#### 소득 정보

- 직장인/사업자/프리랜서/학생/무직/기타 chip.
- 연소득은 `2,600만 원`처럼 만원 단위 + 쉼표 예시.
- 숫자 입력처럼 보이되 프로토타입에서는 mock value.

#### 주거 정보

- 지역: `경기 부천시` 예시.
- 주거형태: 세대원/월세/전세/자가 선택 카드.

#### 더 많은 혜택 찾기

- 경력 단절 여부, 장애인 여부, 중소기업 취업 여부를 O/X pill로 배치.
- 최종 CTA 문구는 “맞춤 혜택 보러 가기”처럼 행동형.

## 4. 페르소나 라우팅 방향

- 최초 진입 화면에서 한버팀/김갓생 중 하나를 선택한다.
- 선택한 페르소나는 브라우저 저장소에 기억한다.
- 주요 화면 라우트는 `/:personaId/home`, `/:personaId/signup/:stepId`처럼 페르소나 prefix를 사용한다.
- `/home`, `/signup` 같은 축약 경로는 기억된 페르소나로 자동 이동한다.
- 유효하지 않은 페르소나 prefix는 선택 화면으로 돌려보낸다.
- 페르소나가 바뀌어도 화면 구조와 시각 언어는 하나로 유지하고, 페르소나별 콘텐츠만 근거 문서 범위 안에서 바꾼다.

## 5. 구현 체크리스트

- [ ] 앱뷰 폭 320~430px에서 가로 스크롤 없음.
- [ ] 본문이 하단 nav/CTA에 가려지지 않고 스크롤 가능.
- [ ] 선택/입력/CTA의 터치 높이 최소 48px.
- [ ] 질문 1개당 핵심 행동 1개.
- [ ] 가족관계 선택 중복 제거: 버튼과 인원 조정 분리 금지.
- [ ] 1인가구 0명 상태도 완료 가능하게 문구 표시.
- [ ] 연소득 만원 단위 + 쉼표 표기.
- [ ] 나이/중요 값 bold 처리, 양식 통일.
- [ ] 실제 인증/계산/저장 기능 없음이 코드 구조상 명확.
- [ ] mock 범위에서도 선택/입력/카운터/다음·이전/라우팅/진행률 같은 UI 상호작용이 작동.
- [ ] 이전 디자인 실험 라우트와 내부 실험 라벨이 다시 노출되지 않음.
- [ ] 그라데이션 없이 단색 배경/카드/CTA/장식만 사용함.
- [ ] 페르소나 선택 상태가 저장되고 축약 경로가 기억된 페르소나로 이동함.
- [ ] `npm run validate` 통과.

## 6. 이 프로젝트에 바로 적용할 CSS/컴포넌트 규칙

- `.app-content`: sticky header 아래부터 bottom nav 위까지 스크롤되는 본문 컨테이너.
- `.signup-flow`: 회원가입 전용 세로 스택.
- `.step-card`: 단계별 입력 카드.
- `.choice-card`: 선택과 설명을 함께 담는 full-width 카드.
- `.counter-card`: 가족관계 선택 + 인원수를 한 카드로 통합.
- `.bottom-cta`: 가입/다음 행동은 하단에 1개만.
- 토큰: `--touch-target: 48px`, `--radius-card`, `--shadow-card`, `--space-section` 추가 권장.

## 7. 출처 목록

- Designbase, “앱 디자인 레이아웃과 그리드 시스템” — https://designbase.co.kr/uxui-02-2/
- Toss Tech, “모티베이션을 디자인하기” — https://toss.tech/article/design-motivation
- Toss Tech, “토스 디자인 원칙, Easy to answer” — https://toss.tech/article/insurance-claim-process
- Toss Tech, “거꾸로 입력하는 가입 화면...” — https://toss.tech/article/toss-signup-process
- Toss Tech, “Simplicity 4 제작기 #1” — https://toss.tech/article/simplicity_behind
- Toss Tech, “Simplicity 4 제작기 #2” — https://toss.tech/article/simplicity4-frontend-engineering
- Android Accessibility Help, “Touch target size” — https://support.google.com/accessibility/android/answer/7101858
- W3C WAI, “What’s New in WCAG 2.2” — https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/
- jsBae Tistory, “모바일 UI/UX 디자인의 종류” — https://multiking.tistory.com/191
- DGMUNIT, “이것이 UX/UI 디자인이다 스터디” — https://www.dgmunit1.com/blog/uxui/ux-ui-1
- Naver Pay Developers, “네이버페이 로고 활용가이드” — https://developers.pay.naver.com/design/brand/usage
- Kmong, “앱 모바일 UI UX 디자인 제작...” — https://kmong.com/prices/%EC%95%B1-ui-ux
