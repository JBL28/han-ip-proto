import { useEffect } from 'react';
import { Link, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { AppShell } from '../components/AppShell.jsx';
import { DeductionDetailPage } from '../features/deductionDetail/DeductionDetailPage.jsx';
import { HomePage } from '../features/home/HomePage.jsx';
import { MyPage } from '../features/my/MyPage.jsx';
import { NotificationsPage } from '../features/notifications/NotificationsPage.jsx';
import { PersonaSelectPage } from '../features/persona/PersonaSelectPage.jsx';
import { PoliciesPage } from '../features/policies/PoliciesPage.jsx';
import { PolicyDetailPage } from '../features/policyDetail/PolicyDetailPage.jsx';
import { SignupFlow } from '../features/signup/SignupFlow.jsx';
import { TaxChatPage } from '../features/taxChat/TaxChatPage.jsx';
import { TaxSavingPage } from '../features/taxSaving/TaxSavingPage.jsx';
import { getRememberedPersonaId, isPersona, personas, rememberPersonaId, signupSteps } from './routeConfig.js';

function PersonaGuard({ children }) {
  const { personaId = '' } = useParams();
  if (!isPersona(personaId)) return <Navigate to="/" replace />;
  return <RememberPersona personaId={personaId}>{children}</RememberPersona>;
}

function RememberPersona({ personaId, children }) {
  useEffect(() => {
    rememberPersonaId(personaId);
  }, [personaId]);
  return children;
}

function LandingPage() {
  const rememberedPersonaId = getRememberedPersonaId();

  return (
    <main className="app-shell page-enter app-shell--index">
      <section className="page-section hero-card">
        <p className="eyebrow">페르소나 선택</p>
        <h1>누구의 상황으로 볼까요?</h1>
        <p className="body-muted">선택한 페르소나는 이 브라우저에 기억돼요.</p>
        <div className="persona-grid" role="list">
          {personas.map((persona) => (
            <Link
              className={`persona-card${rememberedPersonaId === persona.id ? ' is-selected' : ''}`}
              to={`/${persona.id}/signup/cert`}
              onClick={() => rememberPersonaId(persona.id)}
              key={persona.id}
              role="listitem"
            >
              <span>{persona.name}</span>
              <strong>{persona.description}</strong>
              <em>{persona.summary}</em>
            </Link>
          ))}
        </div>
        <div className="link-grid">
          <Link className="button button--primary" to={`/${rememberedPersonaId}/signup/cert`}>기억한 페르소나로 가입 이어가기</Link>
        </div>
      </section>
    </main>
  );
}


function ShellHome() {
  const { personaId = getRememberedPersonaId() } = useParams();
  return <AppShell personaId={personaId} page="home"><HomePage /></AppShell>;
}

function ShellTaxSaving() {
  const { personaId = getRememberedPersonaId() } = useParams();
  return <AppShell personaId={personaId} page="tax-saving"><TaxSavingPage /></AppShell>;
}

function ShellTaxChat() {
  const { personaId = getRememberedPersonaId() } = useParams();
  return <AppShell personaId={personaId} page="tax-chat"><TaxChatPage /></AppShell>;
}

function ShellDeductionDetail() {
  const { personaId = getRememberedPersonaId() } = useParams();
  return <AppShell personaId={personaId} page="deduction-detail"><DeductionDetailPage /></AppShell>;
}

function ShellPolicies() {
  const { personaId = getRememberedPersonaId() } = useParams();
  return <AppShell personaId={personaId} page="policies"><PoliciesPage /></AppShell>;
}

function ShellPolicyDetail() {
  const { personaId = getRememberedPersonaId() } = useParams();
  return <AppShell personaId={personaId} page="policy-detail"><PolicyDetailPage /></AppShell>;
}

function ShellNotifications() {
  const { personaId = getRememberedPersonaId() } = useParams();
  return <AppShell personaId={personaId} page="notifications"><NotificationsPage /></AppShell>;
}

function ShellMy() {
  const { personaId = getRememberedPersonaId() } = useParams();
  return <AppShell personaId={personaId} page="my"><MyPage /></AppShell>;
}

function ShellPersonaSelect() {
  const { personaId = getRememberedPersonaId() } = useParams();
  return <AppShell personaId={personaId} page="persona"><PersonaSelectPage /></AppShell>;
}


export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="signup" element={<RedirectToRemembered page="signup" />} />
      <Route path="signup/:stepId" element={<RedirectToRemembered page="signup-step" />} />
      <Route path="home" element={<RedirectToRemembered page="home" />} />
      <Route path="persona" element={<RedirectToRemembered page="persona" />} />
      <Route path=":personaId/signup" element={<PersonaGuard><NavigateToFirstSignupStep /></PersonaGuard>} />
      <Route path=":personaId/signup/:stepId" element={<PersonaGuard><SignupFlow /></PersonaGuard>} />
      <Route path=":personaId/home" element={<PersonaGuard><ShellHome /></PersonaGuard>} />
      <Route path=":personaId/tax-saving" element={<PersonaGuard><ShellTaxSaving /></PersonaGuard>} />
      <Route path=":personaId/tax-chat" element={<PersonaGuard><ShellTaxChat /></PersonaGuard>} />
      <Route path=":personaId/deduction-detail/:deductionId" element={<PersonaGuard><ShellDeductionDetail /></PersonaGuard>} />
      <Route path=":personaId/deduction-detail" element={<PersonaGuard><ShellDeductionDetail /></PersonaGuard>} />
      <Route path=":personaId/policies" element={<PersonaGuard><ShellPolicies /></PersonaGuard>} />
      <Route path=":personaId/policy-detail/:policyId" element={<PersonaGuard><ShellPolicyDetail /></PersonaGuard>} />
      <Route path=":personaId/policy-detail" element={<PersonaGuard><ShellPolicyDetail /></PersonaGuard>} />
      <Route path=":personaId/notifications" element={<PersonaGuard><ShellNotifications /></PersonaGuard>} />
      <Route path=":personaId/my" element={<PersonaGuard><ShellMy /></PersonaGuard>} />
      <Route path=":personaId/persona" element={<PersonaGuard><ShellPersonaSelect /></PersonaGuard>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function RedirectToRemembered({ page }) {
  const { stepId } = useParams();
  const personaId = getRememberedPersonaId();
  if (page === 'signup') return <Navigate to={`/${personaId}/signup/${signupSteps[0].id}`} replace />;
  if (page === 'signup-step') return <Navigate to={`/${personaId}/signup/${stepId || signupSteps[0].id}`} replace />;
  return <Navigate to={`/${personaId}/${page}`} replace />;
}

function NavigateToFirstSignupStep() {
  const { personaId = getRememberedPersonaId() } = useParams();
  return <Navigate to={`/${personaId}/signup/${signupSteps[0].id}`} replace />;
}
