# Design

## Source of truth
- Status: Draft
- Last refreshed: 2026-05-28
- Primary product surfaces: 앱뷰 전용 세금 관리 웹앱 프로토타입
- Evidence reviewed:
  - 사용자 요구사항: 시나리오 2개, 목킹 텍스트, 비즈니스 로직 없음, 흰색 배경 + 푸른색 포인트, 앱뷰만 구현
  - 저장소 상태: 현재 앱 소스/패키지 파일 없음
  - `설계문서.md`: 회원가입, 메인, 연말정산/종합소득세, 세금 시뮬레이션, 정책 찾기, 챗봇, 페르소나/시나리오 요구사항
  - `wireframes/`: 회원가입 플로우, 메인페이지, 메인페이지2, 절세 추천, 절세챗봇, 공제 상세보기, 정책추천, 정책 상세보기, 알림, 마이페이지, AI페르소나변경
  - 외부 레퍼런스: Toss Simplicity/UX 글, Toss Payments 퍼널 글, Naver Pay 디자인 가이드, 한국 UX/UI 블로그/커뮤니티성 글

## Brand
- Personality: 단순함, 신뢰감, 차분함, 금융/세금 맥락에 맞는 명료함
- Trust signals: 여백, 짧은 문장, 선명한 정보 위계, 안정적인 파란 포인트 컬러
- Avoid: 장식적 그래픽, 과도한 카드/배지, 요구사항에 없는 메뉴/위젯/광고/통계 요소

## Product goals
- Goals:
  - 한버팀/김갓생 시나리오를 바탕으로 세금, 공제, 정책, 챗봇 경험을 앱처럼 쾌적하게 탐색하게 한다.
  - 페이지별 A/B/C 디자인 버전을 만들어 피드백 기반으로 점진 확정한다.
  - 로직 정합성보다 화면 완성도, 흐름, 인터랙션 감각을 우선한다.
  - 추후 백엔드 연동을 가정한 mock API 계약을 남긴다.
- Non-goals:
  - 실제 세금 계산, 인증, 저장, 결제, 사용자 계정 기능
  - 데스크톱/웹뷰 전용 화면
- Success signals:
  - 앱뷰 화면에서 시나리오 선택 → 상세 텍스트 확인 흐름이 막힘 없이 이해된다.
  - 화면 구성 요소가 요구사항/시나리오에 근거한다.
  - 모션이 정보 이해를 돕고 방해하지 않는다.

## Personas and jobs
- Primary personas: 세금 관련 상황을 빠르게 이해하려는 개인 사용자
- User jobs:
  - 두 가지 목킹 시나리오 중 현재 상황과 가까운 항목을 고른다.
  - 안내 텍스트를 부담 없이 읽고 다음 맥락을 파악한다.
- Key contexts of use: 모바일 크기 화면, 짧은 세션, 금융/세금 정보에 대한 신뢰가 중요한 맥락

## Information architecture
- Primary navigation: 단일 앱뷰 내 시나리오 선택과 상세 확인
- Core routes/screens:
  - 회원가입 플로우
  - 메인 페이지
  - 절세 추천
  - 절세챗봇
  - 공제 상세보기
  - 정책추천
  - 정책 상세보기
  - 알림
  - 마이페이지
  - AI 페르소나 변경
- Content hierarchy:
  - 화면 제목
  - 시나리오 선택 항목 2개
  - 선택된 시나리오의 목킹 텍스트
  - 요구사항으로 승인된 상호작용 컨트롤

## Design principles
- Principle 1: One thing per screen. 한 화면은 하나의 사용자 목표만 갖는다.
- Principle 2: 요소 추가 금지. 모든 UI 요소는 요구사항 또는 시나리오 콘텐츠에 직접 근거해야 한다.
- Principle 3: 모바일 우선. 데스크톱 확장보다 앱뷰에서의 손가락 조작과 가독성을 우선한다.
- Principle 4: 모션은 의미를 가져야 한다. 선택, 전환, 피드백을 설명하는 최소 모션만 사용한다.
- Tradeoffs: 정보 밀도보다 명확성, 기능 풍부함보다 시각 완성도, 실제 로직보다 프로토타입 설득력을 우선한다.

## Visual language
- Color:
  - Background: #FFFFFF
  - Text primary: 짙은 네이비/그레이 계열
  - Accent: 신뢰감 있는 블루 계열
  - Border/surface: 매우 옅은 블루/그레이
- Typography: 시스템 폰트 기반, 큰 제목과 짧은 본문으로 모바일 가독성 우선
- Spacing/layout rhythm: 16px 좌우 여백, 8px 단위 간격, 터치 영역 최소 44~48px
- Shape/radius/elevation: 부드러운 라운드, 약한 구분선/그림자만 사용
- Motion: 화면 전환 fade/slide, 선택 상태 press feedback, 상세 텍스트 등장 stagger 정도로 제한
- Imagery/iconography: 요구사항에 없는 아이콘/일러스트는 추가하지 않음

## Components
- Existing components to reuse: 현재 없음
- New/changed components:
  - AppShell
  - AppHeader
  - Button
  - Card
  - Chip
  - BottomCTA
  - DisclosureCard
  - AmountSummary
  - ChatBubble
  - PolicyCard
  - NotificationItem
  - SelectableCard
- Variants and states:
  - selected/unselected
  - pressed/focused
  - loading mock state if API mock boundary를 보여줘야 할 때만
- Token/component ownership:
  - 색상, 간격, 라운드, 모션 duration/easing을 토큰화

## Accessibility
- Target standard: 기본 WCAG AA 수준의 대비와 키보드/스크린리더 의미 유지
- Keyboard/focus behavior: 앱뷰라도 focus-visible 상태 제공
- Contrast/readability: 파란 포인트는 CTA/선택 상태에만 제한 사용
- Screen-reader semantics: 제목/버튼/본문 의미를 HTML 시맨틱으로 표현
- Reduced motion and sensory considerations: prefers-reduced-motion 대응

## Responsive behavior
- Supported breakpoints/devices: 모바일 앱뷰 폭 우선, 최소 320px부터 자연스럽게 유지
- Layout adaptations: 넓은 화면에서도 앱 프레임 폭을 제한해 앱뷰 느낌 유지
- Touch/hover differences: hover 의존 금지, touch/press 중심

## Interaction states
- Loading: 백엔드 mock 경계 확인이 필요할 때만 짧은 skeleton 또는 text placeholder 사용
- Empty: 시나리오 2개가 고정이므로 별도 empty 화면 없음
- Error: 실제 네트워크 없음. mock API 실패 테스트가 필요할 때만 문서화
- Success: 선택 완료/상세 전환을 모션으로 표현
- Disabled: 요구사항상 비활성 액션이 생길 때만 제공
- Offline/slow network: 프로토타입 범위 밖

## Content voice
- Tone: 친절하지만 과장 없는 금융 앱 톤
- Terminology: 세금/신고/예상/안내 등 쉬운 단어 우선
- Microcopy rules: 질문형 버튼명보다 행동형 문구 사용, 사용자가 해야 할 일을 명확히 표현

## Implementation constraints
- Framework/styling system: 아직 미정. 신규 스캐폴드 시 React/Vite 또는 Next.js 중 단순 앱뷰 구현에 맞춰 선택
- Design-token constraints: CSS variables 또는 theme object로 최소 토큰 유지
- Variant constraints: A/B/C는 `[data-theme="a"|"b"|"c"]` 단위로 margin, color, font, radius, motion을 공유
- Performance constraints: 첫 렌더가 가벼워야 하며 이미지/외부 의존 최소화
- Compatibility constraints: 모바일 브라우저 앱뷰 크기 기준
- Test/screenshot expectations: 앱뷰 홈/상세, 선택 상태, reduced motion, API mock contract 확인

## Open questions
- [ ] 두 개 시나리오의 정확한 텍스트 / owner: 사용자 / impact: 최종 콘텐츠와 화면 높이 결정
- [ ] 사용할 프론트엔드 스택 / owner: 구현 단계 / impact: 파일 구조와 테스트 도구 결정
