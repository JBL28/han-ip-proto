export const initialSignupState = {
  authMethod: 'kakao',
  household: 'single',
  spouse: true,
  parentsSupport: true,
  hasChildren: true,
  children: [
    { id: 1, birth: '2018.03.15', age: '만 6세' },
    { id: 2, birth: '2021.07.20', age: '만 3세' },
  ],
  incomeType: '직장인',
  annualIncomeWon: '32000000',
  smeStatus: 'yes',
  sido: '서울시',
  sigungu: '강남구',
  housing: '월세',
  depositWon: '10000000',
  monthlyRentWon: '500000',
};

export const incomeTypes = ['직장인', '사업자', '프리랜서', '학생', '무직', '기타'];
export const housingTypes = ['월세', '전세', '자가', '부모님 집', '기숙사', '기타'];
export const smeOptions = [
  { value: 'yes', label: '예' },
  { value: 'no', label: '아니요' },
  { value: 'unknown', label: '모르겠어요' },
];

export function formatWon(value) {
  const digits = String(value ?? '').replace(/[^0-9]/g, '').slice(0, 10);
  if (!digits) return '';
  return Number(digits).toLocaleString('ko-KR');
}
