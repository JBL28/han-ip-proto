export const personas = [
  {
    id: 'hanbeoteam',
    name: '한버팀',
    description: '34세, 워킹맘 / 연소득 약 2,600만 원, 중소기업 사무직',
    summary: '경기 부천 거주, 한부모 가정 (자녀 1명)',
  },
  {
    id: 'kimgatsaeng',
    name: '김갓생',
    description: '26세, 사회초년생 / 연소득 약 4,200만 원, 공기업 신입 사원',
    summary: '서울 거주(자취/월세), 1인 가구',
  },
];

export const personaStorageKey = 'hanip.selectedPersona';

export const signupSteps = [
  {
    id: 'cert',
    label: '본인 인증 & 마이데이터 연결',
    title: '간편 인증으로 시작해요',
    progressLabel: '1/4 단계',
    lead: '내게 맞춤 절세 혜택을\n찾을 수 있도록 연결해요',
    subLead: '3분이면 끝나요!',
    cta: '마이데이터 연결하기',
  },
  {
    id: 'family',
    label: '가족 관계 입력',
    title: '가족 정보를 입력해주세요',
    progressLabel: '2/4 단계',
    lead: '가족 구성을 알려주세요',
    subLead: '공제 혜택 분석에 활용돼요.',
    cta: '다음',
  },
  {
    id: 'income',
    label: '소득 정보 입력',
    title: '소득 정보를 입력해주세요',
    progressLabel: '3/4 단계',
    lead: '소득 정보를 알려주세요',
    subLead: '맞춤 혜택 추천에 활용돼요.',
    cta: '다음',
  },
  {
    id: 'residence',
    label: '주거 정보 입력',
    title: '주거 정보를 입력해주세요',
    progressLabel: '4/4 단계',
    lead: '주거 정보를 알려주세요',
    subLead: '주거 관련 혜택 분석에 활용돼요.',
    cta: '마이데이터 연동하기',
  },
  {
    id: 'mydata',
    label: '마이데이터 연동',
    title: '국세청 마이데이터를\n연동하고 있어요',
    lead: '필요한 정보만 안전하게 불러올게요',
    subLead: '연동 후 바로 혜택 분석을 시작해요.',
  },
  {
    id: 'analysis',
    label: '가입 완료 후 분석 중',
    title: '입력한 정보를 분석해요',
    lead: 'AI 분석 중이에요',
    subLead: '잠시만 기다려주세요!',
  },
  {
    id: 'complete',
    label: '분석 완료',
    title: '맞춤 혜택을 확인하세요',
    lead: '분석이 완료됐어요!',
    subLead: '받을 수 있는 혜택을 찾았어요',
    cta: '내 혜택 확인하기',
  },
];

export function isPersona(value) {
  return personas.some((persona) => persona.id === value);
}

export function getPersona(value) {
  return personas.find((persona) => persona.id === value) || personas[0];
}

export function getDefaultPersonaId() {
  return personas[0].id;
}

export function getRememberedPersonaId() {
  if (typeof window === 'undefined') return getDefaultPersonaId();
  try {
    const saved = window.localStorage.getItem(personaStorageKey);
    return isPersona(saved) ? saved : getDefaultPersonaId();
  } catch {
    return getDefaultPersonaId();
  }
}

export function rememberPersonaId(personaId) {
  if (!isPersona(personaId) || typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(personaStorageKey, personaId);
  } catch {
    // Storage can be unavailable in private or embedded webviews. Routing still works.
  }
}

export function getStepIndex(stepId) {
  const index = signupSteps.findIndex((step) => step.id === stepId);
  return index >= 0 ? index : 0;
}

export function getStep(stepId) {
  return signupSteps[getStepIndex(stepId)];
}

export function stepPath(personaId, stepId) {
  return `/${personaId}/signup/${stepId}`;
}

export function pagePath(personaId, page, detailId) {
  return `/${personaId}/${page}${detailId ? `/${detailId}` : ''}`;
}
