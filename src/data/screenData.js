import { pagePath } from '../routes/routeConfig.js';

export const taxSavingCards = [
  { id: 'glasses-lenses', title: '안경/렌즈', amount: '10만원', tag: '#의료비 공제', image: 'glassesLenses', source: 'wireframes/절세 추천.png; mockdatas/index.md > 김갓생 > 절세추천 > 시력보정용 안경/콘택트렌즈 구입비 의료비 세액공제' },
  { id: 'education-note', title: '마이스터고 자녀 교육비', amount: '30만원', tag: '#교육비 공제', image: 'educationNote', source: 'wireframes/절세 추천.png; mockdatas/index.md > 한버팀 > 절세추천 > 취학 전 아동 학원비/체육시설 수강료 세액공제' },
  { id: 'medical-checkup', title: '건강검진 비용', amount: '15만원', tag: '#의료비 공제', image: 'medicalCheckup', source: 'wireframes/절세 추천.png; mockdatas/index.md > 김갓생 > 절세추천 > 의료비 세액공제 법령' },
  { id: 'monthly-rent-home', title: '월세 세액공제', amount: '75만원', tag: '#주거비 공제', image: 'monthlyRentHome', source: 'wireframes/절세 추천.png; mockdatas/index.md > 김갓생 > 절세추천 > 월세액 세액공제' },
  { id: 'credit-card', title: '신용카드 사용액', amount: '최대 30만원', tag: '#신용카드 공제', image: 'creditCard', source: 'wireframes/절세 추천.png; 설계문서.md > 김갓생 시나리오 > 체크카드 사용 비율' },
  { id: 'baby-care', title: '출산/보육 비용', amount: '20만원', tag: '#출산·보육 공제', image: 'babyCare', source: 'wireframes/절세 추천.png; mockdatas/index.md > 한버팀 > 정책추천/보육 정책' },
];

export const supportBanner = {
  title: '더 많은 지원금 찾기',
  lines: ['나에게 맞는 숨은 공제 혜택을', '한번에 찾아보세요.'],
  ctaLabel: '내 맞춤 혜택 찾기',
};

export const chatPersonas = [
  { id: 'beginner', name: '초보형', definition: '아예 모르는사람(유치원 수준)', description: '쉬운 설명', source: 'mockdatas/index.md > 챗봇 페르소나' },
  { id: 'interested', name: '관심형', definition: '들어는 봤지만 (관심있지만) 자세히 모름(학생 수준)', description: '요약 + 추천', source: 'mockdatas/index.md > 챗봇 페르소나' },
  { id: 'study', name: '공부형', definition: '약간의 정보를 알고 있고, 배울 의지가 있는 사람(성인 수준)', description: '분석 + 전략', source: 'mockdatas/index.md > 챗봇 페르소나' },
];

export const chatPersonaStorageKey = 'hanip.chatPersonaByPersona';

export function getDefaultChatPersonaId(personaId) {
  return personaId === 'hanbeoteam' ? 'interested' : 'beginner';
}

export function readChatPersonaId(personaId) {
  if (typeof window === 'undefined') return getDefaultChatPersonaId(personaId);
  try {
    const parsed = JSON.parse(window.localStorage.getItem(chatPersonaStorageKey) || '{}');
    return chatPersonas.some((item) => item.id === parsed[personaId]) ? parsed[personaId] : getDefaultChatPersonaId(personaId);
  } catch {
    return getDefaultChatPersonaId(personaId);
  }
}

export function saveChatPersonaId(personaId, chatPersonaId) {
  if (typeof window === 'undefined') return;
  try {
    const parsed = JSON.parse(window.localStorage.getItem(chatPersonaStorageKey) || '{}');
    window.localStorage.setItem(chatPersonaStorageKey, JSON.stringify({ ...parsed, [personaId]: chatPersonaId }));
  } catch {
    // Prototype storage only; UI state still works without persistence.
  }
}

export const commonChatQuestions = [
  '연말정산이 무엇인가요?',
  '원천징수가 무엇인가요?',
  '왜 나 월급받을 때 세금 땠는데, 세금 신고 해야 하나요?',
  '연말정산 했는데, 종합소득세 신고 해야 하나요?',
  '공제가 무엇인가요?',
  '소득공제와 세액공제 차이가 뭔가요?',
  '부업 소득 신고 해야 하나요?',
  '주식도 세금신고 하나요?',
  '현금영수증 꼭 해야 하나요??',
  '세금 신고는 어디에서 하나요?',
  '어떻게 하면 환급을 많이 받을 수 있나요?',
];

export const chatDataByPersona = {
  hanbeoteam: {
    summary: '한버팀님, 올해 몰라서 놓칠 뻔한 혜택이 총 315만 원이에요!',
    summaryItems: ['근로장려금 및 자녀장려금', '한부모 소득공제', '취학 전 아동 학원비 세액공제'],
    intro: '복잡한 정책은 3줄 요약으로 쉽게 설명해드릴게요.',
    questions: [
      '한부모 소득공제랑 부녀자 소득공제가 있다던데, 나는 둘 다 받을 수 있어?',
      '친정 엄마가 아이를 봐주시는데, 따로 살아도 인적공제 받을 수 있는 거야?',
      '근로장려금 신청 대상인지, 조건이 어떻게 되는지 3줄로 요약해 줘.',
    ],
    source: 'mockdatas/index.md > 한버팀 > 챗봇',
  },
  kimgatsaeng: {
    summary: '김갓생님, 지금 소비 습관 유지 시 예상 환급액은 145만 원이에요!',
    summaryItems: ['월세액 세액공제', '주택청약종합저축 소득공제', '고향사랑기부제'],
    intro: '세금과 연말정산을 초간단 비유로 설명해드릴게요.',
    questions: [
      '연말정산이 13월의 월급이라던데... 나 세금 토해낼 수도 있다는데 진짜야? 왜 토해내는 거야?',
      '체크카드 쓰면 돈 돌려준다던데, 그럼 신용카드는 아예 쓰면 안 돼?',
      '안경 맞춘 것도 세금 깎아준다던데, 영수증 벌써 버렸으면 어떡해?',
    ],
    source: 'mockdatas/index.md > 김갓생 > 챗봇',
  },
};

export const policyDataByPersona = {
  hanbeoteam: [
    {
      id: 'child-care-service',
      title: '아이돌봄서비스',
      description: '맞벌이를 하거나 갑자기 아이를 돌볼 수 없는 일이 생겼을 때 육아 도우미가 방문하여 12세 이하 자녀의 양육을 도와줍니다.',
      ministry: '성평등가족부', department: '아이돌봄지원과', cycle: '수시', provision: '기타', online: 'Y', contact: '1577-8136',
      tags: ['영유아', '아동', '보육', '한부모·조손'], category: '보호', image: 'childCarePolicy', detailImage: 'childCareDetail',
      link: 'https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000024&wlfareInfoReldBztpCd=01',
      source: 'mockdatas/text/hanbeoteam__ED_95_9C_EB_B2_84_ED_8C_80_1_EB_B2_88__EB_B3_B5_EC_A7_80_EB_A1_9C__EC_A0_95_EC_B1_85.txt',
    },
    {
      id: 'culture-card',
      title: '통합문화이용권',
      description: '기초생활수급자 및 차상위계층 대상 문화예술·국내 여행·체육 활동 지원을 통해 문화 향유 기회 확대로 문화격차 완화 및 소외계층의 삶의 질 향상을 도모합니다.',
      ministry: '문화체육관광부', department: '문화정책과', cycle: '년', provision: '전자바우처(바우처)', online: 'N', contact: '1544-3412',
      tags: ['문화·여가', '저소득', '한부모·조손'], category: '문화', image: 'cultureCard', detailImage: 'cultureDetail',
      link: 'https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000055&wlfareInfoReldBztpCd=01',
      source: 'mockdatas/text/hanbeoteam__ED_95_9C_EB_B2_84_ED_8C_80_3_EB_B2_88__EB_B3_B5_EC_A7_80_EB_A1_9C__EC_A0_95_EC_B1_85.txt',
    },
  ],
  kimgatsaeng: [
    {
      id: 'job-training',
      title: '국민내일배움카드제 직업훈련지원(훈련비, 훈련장려금)',
      description: '급격한 기술발전에 적응하고 노동시장 변화에 대응하는 사회안전망 차원에서 생애에 걸친 역량개발 향상 등을 위해 국민 스스로 직업능력개발훈련을 실시할 수 있도록 훈련비 등을 지원합니다.',
      ministry: '고용노동부', department: '인적자원개발과', cycle: '수시', provision: '전자바우처(바우처)', online: 'N', contact: '1350',
      tags: ['취업', '교육'], category: '취업', image: 'jobTraining', detailImage: 'trainingDetail',
      link: 'https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00006229&wlfareInfoReldBztpCd=01',
      source: 'mockdatas/text/kimgatsaeng__EA_B9_80_EA_B0_93_EC_83_9D_1_EB_B2_88__EB_B3_B5_EC_A7_80_EB_A1_9C__EC_A0_95_EC_B1_85.txt',
    },
    {
      id: 'youth-rent',
      title: '청년월세 지원사업',
      description: '고금리·고물가 등으로 경제적 어려움을 겪는 청년층의 주거비 부담 경감을 위해 월 최대20만원씩 최장 24개월간 월세를 지원합니다(생애1회).',
      note: "※ '26년 신규 신청기간: 3.30(월) 09:00 ~ 5.29(금) 16:00까지",
      ministry: '국토교통부', department: '청년주거정책과', cycle: '월', provision: '현금지급', online: 'Y', contact: '1599-0001',
      tags: ['청년', '주거', '저소득'], category: '주거', image: 'youthRent', detailImage: 'rentDetail',
      link: 'https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004661&wlfareInfoReldBztpCd=01',
      source: 'mockdatas/text/kimgatsaeng__EA_B9_80_EA_B0_93_EC_83_9D_2_EB_B2_88__EB_B3_B5_EC_A7_80_EB_A1_9C__EC_A0_95_EC_B1_85.txt',
    },
  ],
};

export function getPolicies(personaId) {
  return policyDataByPersona[personaId] || policyDataByPersona.hanbeoteam;
}

export function getPrimaryPolicy(personaId) {
  const policies = getPolicies(personaId);
  return personaId === 'kimgatsaeng' ? (policies.find((item) => item.id === 'youth-rent') || policies[0]) : policies[0];
}

export const deductionDataByPersona = {
  hanbeoteam: {
    title: '근로장려금 및 자녀장려금',
    amountText: '최대 300만 원',
    summary: '저소득자의 근로를 장려하고 자녀 양육을 지원하기 위한 혜택이에요.',
    image: 'benefitCoins',
    sections: [
      { title: '대상 조건', items: ['연소득 약 2,600만 원', '한부모 가정과 자녀 1명 정보를 기준으로 확인해요.', '마이데이터 연결 후 신청 가능 여부를 쉽게 보여줘요.'] },
      { title: '필요 서류', items: ['소득 자료', '가족관계 자료', '신청 안내 내역'] },
      { title: '근거', items: ['조세특례제한법 제100조의2', '조세특례제한법 제100조의27'] },
    ],
    source: 'mockdatas/index.md > 한버팀 > 메인페이지/절세추천',
  },
  kimgatsaeng: {
    title: '월세액 세액공제',
    amountText: '연간 낸 월세의 17% 전액 세금에서 차감',
    summary: '서울 자취/월세 정보를 기준으로 놓치기 쉬운 주거비 공제를 확인해요.',
    image: 'rentReceipt',
    sections: [
      { title: '대상 조건', items: ['총급여 5,500만 원 이하일 때 17% 적용 문구를 확인해요.', '전입신고, 확정일자 요건을 함께 점검해요.', '무주택 세대주 요건을 안내해요.'] },
      { title: '필요 서류', items: ['월세 이체 내역', '임대차계약서', '주민등록 관련 자료'] },
      { title: '근거', items: ['조세특례제한법 제95조의2(월세액에 대한 세액공제)'] },
    ],
    source: 'mockdatas/index.md > 김갓생 > 메인페이지/절세추천',
  },
};

export function getDeductionDetail(personaId) {
  return deductionDataByPersona[personaId] || deductionDataByPersona.hanbeoteam;
}

export const notificationDataByPersona = {
  hanbeoteam: [
    { id: 'parent-transfer', category: 'recommendation', text: "💡 한버팀님! 부모님께 매달 이체하신 내역이 있어요. '부양가족 인적공제' 대상이 되는지 1분 만에 확인해 볼까요?", toPage: 'deduction-detail', source: 'mockdatas/index.md > 한버팀 > 알림' },
    { id: 'culture-start', category: 'recommendation', text: '이번 달 문화누리카드 지원금 신청이 시작되었어요. 아이와 함께 쓸 수 있어요!', toPage: 'policy-detail', source: 'mockdatas/index.md > 한버팀 > 알림' },
    { id: 'child-support-paid', category: 'status', text: '✅ 한부모가족 아동양육비 21만 원이 계좌로 정상 입금되었습니다.', toPage: 'policy-detail', source: 'mockdatas/index.md > 한버팀 > 알림' },
    { id: 'eitc-deadline', category: 'status', text: '🚨 근로장려금 신청 마감이 딱 3일 남았어요! 터치 한 번으로 쉽게 신청하세요.', toPage: 'deduction-detail', source: 'mockdatas/index.md > 한버팀 > 알림' },
  ],
  kimgatsaeng: [
    { id: 'card-spend', category: 'recommendation', text: '💡 이번 달 신용카드 지출액이 기준치를 넘었어요! 내일부터는 체크카드를 써야 연말정산 때 돈을 더 받아요.', toPage: 'deduction-detail', source: 'mockdatas/index.md > 김갓생 > 알림' },
    { id: 'glasses-receipt', category: 'recommendation', text: '김갓생님, 안경점에서 결제한 15만 원을 연말정산에 반영할까요? (터치하여 1분 만에 영수증 등록하기)', toPage: 'deduction-detail', source: 'mockdatas/index.md > 김갓생 > 알림' },
    { id: 'hometown-paid', category: 'status', text: '✅ 고향사랑기부제 10만 원 납부가 완료되어, 연말정산 100% 세액공제 항목에 자동 추가되었습니다.', toPage: 'deduction-detail', source: 'mockdatas/index.md > 김갓생 > 알림' },
    { id: 'rent-receipt', category: 'status', text: '📝 집주인 눈치 볼 필요 없어요! 월세 현금영수증 발급 신청이 국세청에 정상 접수되었습니다.', toPage: 'deduction-detail', source: 'mockdatas/index.md > 김갓생 > 알림' },
  ],
};

export function getNotifications(personaId) {
  return notificationDataByPersona[personaId] || notificationDataByPersona.hanbeoteam;
}

export const myPageDataByPersona = {
  hanbeoteam: {
    amount: '240만 원',
    description: "올해 '한입'을 통해 확실하게 챙긴 누적 혜택",
    detail: '작년 근로장려금 환급액 + 매월 아동수당 합산액',
    source: 'mockdatas/index.md > 한버팀 > 마이페이지',
  },
  kimgatsaeng: {
    amount: '95만 원',
    description: "취업 후 '한입'과 함께 차곡차곡 챙긴 누적 혜택",
    detail: '작년 연말정산 월세 환급금 + K-패스 교통비 환급 등',
    source: 'mockdatas/index.md > 김갓생 > 마이페이지',
  },
};

export function getMyPageData(personaId) {
  return myPageDataByPersona[personaId] || myPageDataByPersona.hanbeoteam;
}

export function pathFor(personaId, page) {
  return pagePath(personaId, page);
}
