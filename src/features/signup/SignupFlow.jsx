import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { AppShell } from '../../components/AppShell.jsx';
import analysisLogoMagnifier from '../../assets/signup/analysis-logo-magnifier.png';
import verificationShield from '../../assets/signup/verification-shield.png';
import { getRememberedPersonaId, getStep, getStepIndex, signupSteps, stepPath } from '../../routes/routeConfig.js';
import { CheckIcon, ChevronLeftIcon, Chip, EqualButtonGroup, SignupActionBar } from '../../components/SignupControls.jsx';
import { formatWon, housingTypes, incomeTypes, initialSignupState, smeOptions } from './signupData.js';

const storageKey = 'hanip.react.signup';
const inputStepIds = ['cert', 'family', 'income', 'residence'];

function normalizeSignupState(value) {
  const incoming = value && typeof value === 'object' ? value : {};
  const merged = { ...initialSignupState, ...incoming };
  const oldIncomeManwon = incoming.incomeManwon ? String(Number(String(incoming.incomeManwon).replace(/[^0-9]/g, '')) * 10000) : undefined;

  return {
    ...merged,
    children: Array.isArray(merged.children) ? merged.children : initialSignupState.children,
    hasChildren: typeof merged.hasChildren === 'boolean' ? merged.hasChildren : initialSignupState.hasChildren,
    spouse: typeof merged.spouse === 'boolean' ? merged.spouse : Number(merged.spouse) > 0,
    parentsSupport: typeof merged.parentsSupport === 'boolean' ? merged.parentsSupport : Number(incoming.parents) > 0 || initialSignupState.parentsSupport,
    annualIncomeWon: String(merged.annualIncomeWon ?? oldIncomeManwon ?? initialSignupState.annualIncomeWon),
  };
}

function readInitialState() {
  try {
    return normalizeSignupState(JSON.parse(sessionStorage.getItem(storageKey) || '{}'));
  } catch {
    return normalizeSignupState(initialSignupState);
  }
}

export function SignupFlow() {
  const { personaId = getRememberedPersonaId(), stepId = 'cert' } = useParams();
  const navigate = useNavigate();
  const stepIndex = getStepIndex(stepId);
  const step = getStep(stepId);
  const [form, setForm] = useState(readInitialState);

  const safeStep = signupSteps.some((item) => item.id === stepId);
  const previous = signupSteps[Math.max(0, stepIndex - 1)].id;
  const next = signupSteps[Math.min(signupSteps.length - 1, stepIndex + 1)].id;
  const isFirst = stepIndex === 0;
  const isAnalysis = step.id === 'analysis';
  const isComplete = step.id === 'complete';
  const progressIndex = inputStepIds.indexOf(step.id);
  const inputProgress = progressIndex >= 0 ? Math.round(((progressIndex + 1) / inputStepIds.length) * 100) : 100;

  useEffect(() => {
    sessionStorage.setItem(storageKey, JSON.stringify(form));
  }, [form]);

  useEffect(() => {
    if (step.id !== 'analysis') return undefined;
    const timer = window.setTimeout(() => navigate(stepPath(personaId, 'complete')), 1700);
    return () => window.clearTimeout(timer);
  }, [navigate, step.id, personaId]);

  const update = (patch) => setForm((current) => ({ ...current, ...patch }));

  if (!safeStep) return <Navigate to={stepPath(personaId, 'cert')} replace />;

  function goNext(event) {
    event.preventDefault();
    if (step.id === 'complete') {
      navigate(`/${personaId}/home`);
      return;
    }
    navigate(stepPath(personaId, next));
  }

  return (
    <AppShell personaId={personaId} page="signup" signup>
      <section className={`signup-page signup-page--${step.id}`}>
        {!isAnalysis && !isComplete && (
          <header className="signup-topbar" aria-label="회원가입 진행률">
            <Link className="signup-back-link" to={stepPath(personaId, previous)} aria-disabled={isFirst ? 'true' : undefined}><ChevronLeftIcon /></Link>
            <strong>회원가입</strong>
            <span aria-hidden="true" />
            <div className="signup-progress-track" aria-hidden="true"><span style={{ width: `${inputProgress}%` }} /></div>
          </header>
        )}

        <section className="signup-question" aria-labelledby="signup-question-title">
          <p className="signup-step-label">{step.label}</p>
          <h1 id="signup-question-title">{step.title}</h1>
          {step.progressLabel && <p className="signup-step-count">{step.progressLabel}</p>}
          <div className="signup-lead">
            <strong>{renderLines(step.lead)}</strong>
            <span>{step.subLead}</span>
          </div>
          <StepBody stepId={step.id} form={form} update={update} />
        </section>

        {!isAnalysis && (
          <SignupActionBar
            single={isComplete}
            secondary={!isComplete ? { as: Link, to: stepPath(personaId, previous), 'aria-disabled': isFirst ? 'true' : undefined, children: '이전' } : undefined}
            primary={{ as: Link, to: isComplete ? `/${personaId}/home` : stepPath(personaId, next), onClick: goNext, children: step.cta }}
          />
        )}
      </section>
    </AppShell>
  );
}

function renderLines(value) {
  return String(value || '').split('\n').map((line, index) => <span key={line}>{line}{index < String(value || '').split('\n').length - 1 && <br />}</span>);
}

function StepBody({ stepId, form, update }) {
  if (stepId === 'cert') return <CertStep form={form} update={update} />;
  if (stepId === 'family') return <FamilyStep form={form} update={update} />;
  if (stepId === 'income') return <IncomeStep form={form} update={update} />;
  if (stepId === 'residence') return <ResidenceStep form={form} update={update} />;
  if (stepId === 'analysis') return <AnalysisStep />;
  return <CompleteStep />;
}

function CertStep({ form, update }) {
  return (
    <div className="signup-stack">
      <div className="cert-shield-card" aria-hidden="true"><img src={verificationShield} alt="" /></div>
      <article className="connection-card">
        <strong>국세청 마이데이터로 자동 연결돼요</strong>
        <ul>
          <li>소득 및 세금 정보</li>
          <li>가족관계 정보</li>
          <li>건강보험료 정보</li>
          <li>월세 등 주거정보</li>
        </ul>
      </article>
      <EqualButtonGroup
        label="간편 인증 방식"
        options={[
          { value: 'kakao', label: '카카오 인증', selected: form.authMethod === 'kakao', onClick: () => update({ authMethod: 'kakao' }) },
          { value: 'pass', label: 'PASS 인증', selected: form.authMethod === 'pass', onClick: () => update({ authMethod: 'pass' }) },
        ]}
      />
      <p className="signup-footnote">나중에 직접 입력할 수도 있어요</p>
    </div>
  );
}

function FamilyStep({ form, update }) {
  const children = Array.isArray(form.children) ? form.children : initialSignupState.children;
  const updateChild = (childId, patch) => update({
    children: children.map((child) => (child.id === childId ? { ...child, ...patch } : child)),
  });
  const addChild = () => update({
    hasChildren: true,
    children: [...children, { id: children.length + 1, birth: '', age: '만 0세' }],
  });

  return (
    <div className="signup-stack">
      <section className="form-section">
        <h2>가족 구성</h2>
        <div className="two-card-grid">
          <ToggleCard label="1인 가구" selected={form.household === 'single'} onClick={() => update({ household: 'single', spouse: false, parentsSupport: false })} />
          <ToggleCard label="배우자 있음" selected={form.spouse} onClick={() => update({ household: 'family', spouse: !form.spouse })} />
          <ToggleCard label="부모님 부양" selected={form.parentsSupport} onClick={() => update({ household: 'family', parentsSupport: !form.parentsSupport })} />
          <ToggleCard label="해당 없음" selected={form.household === 'single' && !form.spouse && !form.parentsSupport} onClick={() => update({ household: 'single', spouse: false, parentsSupport: false })} />
        </div>
      </section>

      <section className="form-section">
        <h2>자녀 정보</h2>
        <div className="yes-no-row yes-no-row--compact">
          <span>자녀가 있나요?</span>
          <span className="yes-no-controls" role="group" aria-label="자녀가 있나요?">
            <button className={`mini-pill${form.hasChildren ? ' is-selected' : ''}`} type="button" onClick={() => update({ hasChildren: true })}>있음</button>
            <button className={`mini-pill${!form.hasChildren ? ' is-selected' : ''}`} type="button" onClick={() => update({ hasChildren: false, children: [] })}>없음</button>
          </span>
        </div>
        {form.hasChildren && children.map((child, index) => (
          <label className="child-row" key={child.id}>
            <strong>자녀 {index + 1}</strong>
            <input type="text" value={child.birth} onChange={(event) => updateChild(child.id, { birth: event.target.value })} aria-label={`자녀 ${index + 1} 생년월일`} />
            <b>({child.age})</b>
            <span aria-hidden="true">›</span>
          </label>
        ))}
        <button className="add-child-button" type="button" onClick={addChild}>+ 자녀 추가</button>
      </section>
    </div>
  );
}

function IncomeStep({ form, update }) {
  return (
    <div className="signup-stack">
      <section className="form-section">
        <h2>직업 유형</h2>
        <div className="chip-grid" role="group" aria-label="직업 유형">
          {incomeTypes.map((type) => <Chip key={type} selected={form.incomeType === type} onClick={() => update({ incomeType: type })}>{type}</Chip>)}
        </div>
      </section>
      <label className="field-card">
        <span>연소득 (세전)</span>
        <div className="field-input-row">
          <input inputMode="numeric" pattern="[0-9,]*" value={formatWon(form.annualIncomeWon)} onChange={(event) => update({ annualIncomeWon: event.target.value.replace(/[^0-9]/g, '') })} aria-label="연소득 세전" />
          <strong>원</strong>
        </div>
        <em>예시) 3,200만원</em>
      </label>
      <p className="signup-footnote signup-footnote--left">정확하지 않아도 괜찮아요. 대략적으로 입력해주세요.</p>
      <section className="form-section">
        <h2>추가 정보 (선택)</h2>
        <p className="section-question">중소기업 재직 여부</p>
        <div className="sme-options" role="group" aria-label="중소기업 재직 여부">
          {smeOptions.map((option) => <button key={option.value} className={`mini-pill mini-pill--wide${form.smeStatus === option.value ? ' is-selected' : ''}`} type="button" onClick={() => update({ smeStatus: option.value })}>{option.label}</button>)}
        </div>
      </section>
    </div>
  );
}

function ResidenceStep({ form, update }) {
  return (
    <div className="signup-stack">
      <section className="form-section">
        <h2>거주 지역</h2>
        <div className="select-row">
          <label><span className="sr-only">시도</span><input type="text" value={form.sido} onChange={(event) => update({ sido: event.target.value })} /></label>
          <label><span className="sr-only">시군구</span><input type="text" value={form.sigungu} onChange={(event) => update({ sigungu: event.target.value })} /></label>
        </div>
      </section>
      <section className="form-section">
        <h2>주거 형태</h2>
        <div className="housing-grid" role="group" aria-label="주거 형태">
          {housingTypes.map((item) => <Chip key={item} selected={form.housing === item} onClick={() => update({ housing: item })}>{item}</Chip>)}
        </div>
      </section>
      <section className="form-section">
        <h2>월세 정보 (선택)</h2>
        <MoneyField label="보증금" value={form.depositWon} onChange={(value) => update({ depositWon: value })} />
        <MoneyField label="월세 금액" value={form.monthlyRentWon} onChange={(value) => update({ monthlyRentWon: value })} />
      </section>
    </div>
  );
}

function MoneyField({ label, value, onChange }) {
  return (
    <label className="money-row">
      <span>{label}</span>
      <input inputMode="numeric" value={formatWon(value)} onChange={(event) => onChange(event.target.value.replace(/[^0-9]/g, ''))} aria-label={label} />
      <strong>원</strong>
    </label>
  );
}

function AnalysisStep() {
  return (
    <>
      <img className="analysis-mascot" src={analysisLogoMagnifier} alt="" aria-hidden="true" />
      <div className="analysis-panel" aria-live="polite">
        <div className="analysis-orb"><span>75%</span></div>
      <ul>
        <li>소득 정보를 확인하는 중</li>
        <li>절세 공제 항목 분석하는 중</li>
        <li>맞춤 정책을 찾는 중</li>
        <li>받을 혜택을 계산하는 중</li>
      </ul>
      </div>
    </>
  );
}

function createConfettiPieces() {
  return Array.from({ length: 34 }, (_, index) => ({
    id: index,
    x: Math.round(Math.random() * 96 + 2),
    delay: -(Math.random() * 4.8).toFixed(2),
    duration: (4.2 + Math.random() * 2.4).toFixed(2),
    drift: Math.round((Math.random() - 0.5) * 46),
    spin: Math.round(220 + Math.random() * 460),
    scale: (0.72 + Math.random() * 0.55).toFixed(2),
  }));
}


function CompleteStep() {
  const confettiPieces = useMemo(createConfettiPieces, []);

  return (
    <div className="complete-panel">
      <div className="confetti-field" aria-hidden="true">
        {confettiPieces.map((piece) => (
          <i
            key={piece.id}
            style={{
              '--x': piece.x,
              '--d': `${piece.duration}s`,
              '--delay': `${piece.delay}s`,
              '--drift': `${piece.drift}px`,
              '--spin': `${piece.spin}deg`,
              '--scale': piece.scale,
            }}
          />
        ))}
      </div>
      <article className="benefit-summary-card">
        <span>예상 절세 혜택</span>
        <strong>128만원!</strong>
      </article>
      <dl className="benefit-list">
        <div><dt>현재 받고 있는 혜택</dt><dd>42만원</dd></div>
        <div><dt>놓치고 있는 혜택</dt><dd>86만원</dd></div>
      </dl>
    </div>
  );
}

function ToggleCard({ label, selected, onClick }) {
  return (
    <button className={`toggle-card${selected ? ' is-selected' : ''}`} type="button" aria-pressed={selected} onClick={onClick}>
      <span>{label}</span>
      <i aria-hidden="true">{selected ? <CheckIcon /> : '×'}</i>
    </button>
  );
}
