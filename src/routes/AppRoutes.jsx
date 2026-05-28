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
        <p className="eyebrow">A/B/C 디자인 프로토타입</p>
        <h1>한입 전체 페이지</h1>
        <p className="body-muted">각 디자인 버전은 같은 콘텐츠를 다른 시각 언어로 보여줍니다.</p>
        <div className="link-grid">
          <Link className="button button--primary" to="/a/signup/cert">A안 보기</Link>
          <Link className="button button--secondary" to="/b/signup/cert">B안 보기</Link>
          <Link className="button button--secondary" to="/c/signup/cert">C안 보기</Link>
        </div>
      </section>
    </main>
  );
}

function PlaceholderPage({ title }) {
  return <section className="placeholder-page"><h1>{title}</h1><p>이 페이지는 이후 구현 예정입니다.</p></section>;
}

function ShellPlaceholder({ title }) {
  const { variant = 'a' } = useParams();
  return <AppShell variant={variant} page="home"><PlaceholderPage title={title} /></AppShell>;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path=":variant/signup" element={<NavigateToFirstSignupStep />} />
      <Route path=":variant/signup/:stepId" element={<VariantGuard><SignupFlow /></VariantGuard>} />
      <Route path=":variant/home" element={<VariantGuard><ShellPlaceholder title="메인 페이지" /></VariantGuard>} />
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
