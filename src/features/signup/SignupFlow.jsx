import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { AppShell } from '../../components/AppShell.jsx';
import { getStep, getStepIndex, signupSteps, stepPath } from '../../routes/routeConfig.js';
import { ChoiceCard, ChevronLeftIcon, Chip, CounterCard, MinusIcon, PlusIcon, YesNoRow } from './SignupControls.jsx';
import { formatManwon, housingTypes, incomeTypes, initialSignupState } from './signupData.js';

const storageKey = 'hanip.react.signup';

function readInitialState() {
  try {
    return { ...initialSignupState, ...JSON.parse(sessionStorage.getItem(storageKey) || '{}') };
  } catch {
    return initialSignupState;
  }
}

export function SignupFlow() {
  const { variant = 'a', stepId = 'cert' } = useParams();
  const navigate = useNavigate();
  const stepIndex = getStepIndex(stepId);
  const step = getStep(stepId);
  const [form, setForm] = useState(readInitialState);

  const safeStep = signupSteps.some((item) => item.id === stepId);
  const progress = Math.round(((stepIndex + 1) / signupSteps.length) * 100);
  const previous = signupSteps[Math.max(0, stepIndex - 1)].id;
  const next = signupSteps[Math.min(signupSteps.length - 1, stepIndex + 1)].id;
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === signupSteps.length - 1;

  useEffect(() => {
    sessionStorage.setItem(storageKey, JSON.stringify(form));
  }, [form]);

  useEffect(() => {
    document.body.dataset.theme = variant;
  }, [variant]);

  const update = (patch) => setForm((current) => ({ ...current, ...patch }));
  const clampCount = (value) => Math.max(0, Math.min(9, value));
  const setCount = (key, delta) => setForm((current) => ({ ...current, household: 'family', [key]: clampCount(Number(current[key]) + delta) }));

  const actions = useMemo(() => ({
    setHousehold(value) {
      if (value === 'single') update({ household: 'single', parents: 0, spouse: 0, children: 0 });
      else update({ household: 'family' });
    },
    setCount,
    setChildAge(delta) {
      setForm((current) => ({ ...current, childAge: Math.max(0, Math.min(30, current.childAge + delta)) }));
    },
    update,
  }), []);

  if (!safeStep) return <Navigate to={stepPath(variant, 'cert')} replace />;

  function goNext(event) {
    if (!isLast) {
      event.preventDefault();
      navigate(stepPath(variant, next));
      return;
    }
  }

  return (
    <AppShell variant={variant} page="signup" signup>
      <section className="signup-page">
        <header className="signup-progress" aria-label="회원가입 진행률">
          <Link className="signup-back-link" to={stepPath(variant, previous)} aria-disabled={isFirst ? 'true' : undefined}><ChevronLeftIcon /></Link>
          <div className="signup-progress-copy"><strong>{stepIndex + 1} / {signupSteps.length}</strong><p>{step.label}</p></div>
          <div className="signup-progress-track" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
        </header>

        <section className="signup-question" aria-labelledby="signup-question-title">
          <h1 id="signup-question-title">{step.title}</h1>
          <p className="question-description">{step.description}</p>
          <StepBody stepId={step.id} form={form} actions={actions} />
        </section>

        <footer className="signup-bottom-actions">
          <Link className="secondary-action" to={stepPath(variant, previous)} aria-disabled={isFirst ? 'true' : undefined}>이전</Link>
          <Link className="primary-action" to={isLast ? `/${variant}/home` : stepPath(variant, next)} onClick={goNext}>{step.cta}</Link>
        </footer>
      </section>
    </AppShell>
  );
}

function StepBody({ stepId, form, actions }) {
  if (stepId === 'cert') return <CertStep form={form} update={actions.update} />;
  if (stepId === 'family') return <FamilyStep form={form} actions={actions} />;
  if (stepId === 'income') return <IncomeStep form={form} update={actions.update} />;
  if (stepId === 'residence') return <ResidenceStep form={form} update={actions.update} />;
  if (stepId === 'benefits') return <BenefitsStep form={form} update={actions.update} />;
  return <ReviewStep form={form} />;
}

function CertStep({ form, update }) {
  return <div className="signup-stack">
    <ChoiceCard title="카카오톡 본인 인증" description="가장 빠른 인증 방식으로 표시" selected={form.authMethod === 'kakao'} onClick={() => update({ authMethod: 'kakao' })} />
    <ChoiceCard title="통신사 본인 인증" description="휴대폰 번호로 인증하는 흐름" selected={form.authMethod === 'carrier'} onClick={() => update({ authMethod: 'carrier' })} />
    <article className="info-panel"><strong>인증 후 연결되는 정보</strong><ul><li>마이데이터 연결 안내</li><li>홈택스·정부24·주거래은행 정보</li><li>소득·지출·가족관계 자동 입력 가정</li></ul></article>
  </div>;
}

function FamilyStep({ form, actions }) {
  return <div className="signup-stack">
    <div className="choice-grid">
      <ChoiceCard title="1인가구" description="부모님·배우자·자녀가 0명이어도 완료 가능" selected={form.household === 'single'} onClick={() => actions.setHousehold('single')} />
      <ChoiceCard title="가족 구성 입력" description="부모님, 배우자, 자녀 인원을 조정" selected={form.household === 'family'} onClick={() => actions.setHousehold('family')} />
    </div>
    <CounterCard label="부모님" helper="배우자/부모 인원 수 수정 요구 반영" value={form.parents} onMinus={() => actions.setCount('parents', -1)} onPlus={() => actions.setCount('parents', 1)} />
    <CounterCard label="배우자" helper="여부와 생년월일 입력 단계로 이어질 수 있음" value={form.spouse} onMinus={() => actions.setCount('spouse', -1)} onPlus={() => actions.setCount('spouse', 1)} />
    <CounterCard label="자녀" helper="나이 값은 굵게, 같은 양식으로 표시" value={form.children} age={`만 ${form.childAge}세`} onMinus={() => actions.setCount('children', -1)} onPlus={() => actions.setCount('children', 1)} />
    {form.children > 0 && <div className="age-control"><span>자녀 나이</span><button type="button" onClick={() => actions.setChildAge(-1)}><MinusIcon /></button><strong>만 {form.childAge}세</strong><button type="button" onClick={() => actions.setChildAge(1)}><PlusIcon /></button></div>}
    <p className="helper-note">선택 버튼을 따로 두지 않고, 인원 조정 카드가 곧 선택 UI입니다.</p>
  </div>;
}

function IncomeStep({ form, update }) {
  return <div className="signup-stack">
    <div className="chip-grid" role="group" aria-label="소득 유형">
      {incomeTypes.map((type) => <Chip key={type} selected={form.incomeType === type} onClick={() => update({ incomeType: type })}>{type}</Chip>)}
    </div>
    <label className="field-card"><span>연소득</span><div className="field-input-row"><input inputMode="numeric" pattern="[0-9,]*" value={formatManwon(form.incomeManwon)} onChange={(event) => update({ incomeManwon: event.target.value.replace(/[^0-9]/g, '') })} aria-label="연소득 만원 단위 입력" /><strong>만 원</strong></div><em>숫자를 입력하면 쉼표가 자동으로 적용됩니다. 예: 2,600만 원</em></label>
  </div>;
}

function ResidenceStep({ form, update }) {
  return <div className="signup-stack">
    <label className="field-card"><span>주거 지역</span><input type="text" value={form.region} onChange={(event) => update({ region: event.target.value })} aria-label="주거 지역 입력" /><em>시/군/구 단위로 입력합니다.</em></label>
    <div className="chip-grid chip-grid--two" role="group" aria-label="주거 형태">{housingTypes.map((item) => <Chip key={item} selected={form.housing === item} onClick={() => update({ housing: item })}>{item}</Chip>)}</div>
  </div>;
}

function BenefitsStep({ form, update }) {
  return <div className="signup-stack">
    <YesNoRow label="경력 단절 여부" value={form.careerBreak} onChange={(value) => update({ careerBreak: value })} />
    <YesNoRow label="장애인 여부(본인 또는 가족)" value={form.disabledFamily} onChange={(value) => update({ disabledFamily: value })} />
    <YesNoRow label="중소기업 취업 여부" value={form.sme} onChange={(value) => update({ sme: value })} />
  </div>;
}

function ReviewStep({ form }) {
  return <div className="signup-stack">
    <ul className="review-list">
      <li><strong>인증</strong><span>{form.authMethod === 'kakao' ? '카카오톡 본인 인증' : '통신사 본인 인증'}</span></li>
      <li><strong>가족</strong><span>{form.household === 'single' ? '1인가구' : '가족 구성'} · 부모님 {form.parents}명 · 배우자 {form.spouse}명 · 자녀 {form.children}명</span></li>
      <li><strong>소득</strong><span>{form.incomeType} · {formatManwon(form.incomeManwon) || '0'}만 원</span></li>
      <li><strong>주거</strong><span>{form.region} · {form.housing}</span></li>
      <li><strong>추가 조건</strong><span>경력단절 {form.careerBreak ? 'O' : 'X'} · 장애인 {form.disabledFamily ? 'O' : 'X'} · 중소기업 {form.sme ? 'O' : 'X'}</span></li>
    </ul>
    <p className="helper-note">실제 저장/계산 없이 UI 흐름만 작동하는 프로토타입입니다.</p>
  </div>;
}
