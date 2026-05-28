export const initialSignupState = {
  authMethod: 'kakao',
  household: 'single',
  parents: 0,
  spouse: 0,
  children: 0,
  childAge: 6,
  incomeType: '직장인',
  incomeManwon: '2600',
  region: '경기 부천시',
  housing: '월세',
  careerBreak: false,
  disabledFamily: false,
  sme: true,
};

export const incomeTypes = ['직장인', '사업자', '프리랜서', '학생', '무직', '기타'];
export const housingTypes = ['세대원', '월세', '전세', '자가'];

export function formatManwon(value) {
  const digits = String(value ?? '').replace(/[^0-9]/g, '').slice(0, 7);
  if (!digits) return '';
  return Number(digits).toLocaleString('ko-KR');
}
