import { Link, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { AppShell } from '../components/AppShell.jsx';
import { SignupFlow } from '../features/signup/SignupFlow.jsx';
import { isVariant, signupSteps } from './routeConfig.js';

function VariantGuard({ children }) {
  const { variant = 'a' } = useParams();
  if (!isVariant(variant)) return <Navigate to="/" replace />;
  return children;
}

function LandingPage() {
  return (
    <main className="app-shell page-enter app-shell--index" data-theme="a">
      <section className="page-section hero-card">
        <p className="eyebrow">디자인 프로토타입</p>
        <h1>한입 전체 페이지</h1>
        <p className="body-muted">같은 콘텐츠를 다른 시각 언어로 확인합니다.</p>
        <div className="link-grid">
          <Link className="button button--primary" to="/a/signup/cert">시작하기</Link>
          <Link className="button button--secondary" to="/b/signup/cert">다른 스타일로 시작</Link>
          <Link className="button button--secondary" to="/c/signup/cert">또 다른 스타일로 시작</Link>
        </div>
      </section>
    </main>
  );
}

function HomePage() {
  return (
    <section className="home-after-signup">
      <p className="signup-step-label">홈으로 이동</p>
      <h1>개인 맞춤 홈 화면으로!</h1>
      <article className="home-benefit-card">
        <span>놓치고 있는 공제 혜택</span>
        <strong>128만원</strong>
      </article>
      <article className="home-mission-card">
        <span>이번 달 절세 미션</span>
        <strong>3/5 완료</strong>
      </article>
      <article className="home-list-card">
        <span>추천 정책</span>
        <strong>맞춤 정책 12개 발견</strong>
      </article>
      <article className="home-list-card">
        <span>정책 캘린더</span>
        <strong>이번 달 신청 가능한 정책 3개</strong>
      </article>
    </section>
  );
}

function PlaceholderPage({ title }) {
  return <section className="placeholder-page"><h1>{title}</h1><p>이 페이지는 이후 구현 예정입니다.</p></section>;
}

function ShellPlaceholder({ title }) {
  const { variant = 'a' } = useParams();
  return <AppShell variant={variant} page="home"><PlaceholderPage title={title} /></AppShell>;
}

function ShellHome() {
  const { variant = 'a' } = useParams();
  return <AppShell variant={variant} page="home"><HomePage /></AppShell>;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path=":variant/signup" element={<NavigateToFirstSignupStep />} />
      <Route path=":variant/signup/:stepId" element={<VariantGuard><SignupFlow /></VariantGuard>} />
      <Route path=":variant/home" element={<VariantGuard><ShellHome /></VariantGuard>} />
      <Route path=":variant/tax-saving" element={<VariantGuard><ShellPlaceholder title="절세 추천" /></VariantGuard>} />
      <Route path=":variant/tax-chat" element={<VariantGuard><ShellPlaceholder title="절세챗봇" /></VariantGuard>} />
      <Route path=":variant/deduction-detail" element={<VariantGuard><ShellPlaceholder title="공제 상세보기" /></VariantGuard>} />
      <Route path=":variant/policies" element={<VariantGuard><ShellPlaceholder title="정책추천" /></VariantGuard>} />
      <Route path=":variant/policy-detail" element={<VariantGuard><ShellPlaceholder title="정책 상세보기" /></VariantGuard>} />
      <Route path=":variant/notifications" element={<VariantGuard><ShellPlaceholder title="알림" /></VariantGuard>} />
      <Route path=":variant/my" element={<VariantGuard><ShellPlaceholder title="마이페이지" /></VariantGuard>} />
      <Route path=":variant/persona" element={<VariantGuard><ShellPlaceholder title="AI 페르소나 변경" /></VariantGuard>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function NavigateToFirstSignupStep() {
  const { variant = 'a' } = useParams();
  return <Navigate to={`/${variant}/signup/${signupSteps[0].id}`} replace />;
}
