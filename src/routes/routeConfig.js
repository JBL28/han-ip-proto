export const variants = ['a', 'b', 'c'];

export const signupSteps = [
  { id: 'cert', label: '인증', title: '본인 인증을 먼저 해주세요', description: '통신사 또는 카카오톡 인증 후 마이데이터 연결 안내로 이어집니다.', cta: '인증하고 다음' },
  { id: 'family', label: '가족', title: '가족 관계를 알려주세요', description: '선택 버튼과 인원 조정을 분리하지 않고, 인원 조정 카드 자체가 선택 역할을 합니다.', cta: '가족 정보 저장' },
  { id: 'income', label: '소득', title: '소득 정보를 입력해주세요', description: '직업 유형을 고르고 연소득은 만원 단위 숫자로 입력합니다.', cta: '소득 정보 저장' },
  { id: 'residence', label: '주거', title: '주거 정보를 확인해주세요', description: '지역과 주거 형태를 바탕으로 월세·주거 지원 가능성을 이어서 봅니다.', cta: '주거 정보 저장' },
  { id: 'benefits', label: '혜택', title: '더 많은 혜택 조건을 체크해요', description: '경력 단절, 장애인 여부, 중소기업 취업 여부를 O/X로만 답합니다.', cta: '조건 체크 완료' },
  { id: 'review', label: '완료', title: '입력한 내용을 확인해주세요', description: '실제 저장 없이 다음 화면으로 이어지는 앱뷰 프로토타입입니다.', cta: '맞춤 혜택 보러 가기' },
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
