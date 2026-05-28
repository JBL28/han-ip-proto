export const variants = ['a', 'b', 'c'];

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
    cta: '가입 완료하기',
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

export function isVariant(value) {
  return variants.includes(value);
}

export function getStepIndex(stepId) {
  const index = signupSteps.findIndex((step) => step.id === stepId);
  return index >= 0 ? index : 0;
}

export function getStep(stepId) {
  return signupSteps[getStepIndex(stepId)];
}

export function stepPath(variant, stepId) {
  return `/${variant}/signup/${stepId}`;
}
