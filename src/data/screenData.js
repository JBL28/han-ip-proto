import { pagePath } from '../routes/routeConfig.js';

export const taxSavingCards = [
  { id: 'glasses-lenses', title: '안경/렌즈', amount: '10만원', tag: '#의료비 공제', image: 'glassesLenses', detailPage: 'deduction-detail', detailId: 'glasses-lenses', source: 'wireframes/절세 추천.png; mockdatas/index.md > 김갓생 > 절세추천 > 시력보정용 안경/콘택트렌즈 구입비 의료비 세액공제' },
  { id: 'education-note', title: '마이스터고 자녀 교육비', amount: '30만원', tag: '#교육비 공제', image: 'educationNote', detailPage: 'deduction-detail', detailId: 'preschool-education-credit', source: 'wireframes/절세 추천.png; mockdatas/index.md > 한버팀 > 절세추천 > 취학 전 아동 학원비/체육시설 수강료 세액공제' },
  { id: 'medical-checkup', title: '건강검진 비용', amount: '15만원', tag: '#의료비 공제', image: 'medicalCheckup', detailPage: 'deduction-detail', detailId: 'medical-expense-credit', source: 'wireframes/절세 추천.png; mockdatas/index.md > 김갓생 > 절세추천 > 의료비 세액공제 법령' },
  { id: 'monthly-rent-home', title: '월세 세액공제', amount: '75만원', tag: '#주거비 공제', image: 'monthlyRentHome', detailPage: 'deduction-detail', detailId: 'monthly-rent-home', source: 'wireframes/절세 추천.png; mockdatas/index.md > 김갓생 > 절세추천 > 월세액 세액공제' },
  { id: 'credit-card', title: '신용카드 사용액', amount: '최대 30만원', tag: '#신용카드 공제', image: 'creditCard', detailPage: 'deduction-detail', detailId: 'card-spend-strategy', source: 'wireframes/절세 추천.png; mockdatas/index.md > 김갓생 > 챗봇 > 체크카드/신용카드 사용 전략' },
  { id: 'baby-care', title: '출산/보육 비용', amount: '20만원', tag: '#출산·보육 공제', image: 'babyCare', detailPage: 'policy-detail', detailId: 'child-care-service', source: 'wireframes/절세 추천.png; mockdatas/index.md > 한버팀 > 정책추천/보육 정책' },
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

export const commonChatAnswers = {
  '연말정산이 무엇인가요?': '회사에서 미리 낸 세금을 1년 끝에 다시 계산하는 과정이에요. 많이 냈으면 돌려받고, 적게 냈으면 추가로 내요. 그래서 공제 자료를 잘 챙기는 게 중요해요.',
  '원천징수가 무엇인가요?': '월급을 줄 때 회사가 세금을 먼저 떼서 대신 내는 거예요. 편의상 예상 세금으로 먼저 내기 때문에, 연말정산에서 실제 세금과 차이를 맞춰요.',
  '왜 나 월급받을 때 세금 땠는데, 세금 신고 해야 하나요?': '월급에서 뗀 세금은 임시 계산에 가까워요. 의료비·월세·교육비 같은 공제를 반영하면 최종 세금이 달라져서 다시 정산해야 해요.',
};

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
    answers: {
      '한부모 소득공제랑 부녀자 소득공제가 있다던데, 나는 둘 다 받을 수 있어?': '둘 다 조건을 확인해야 하지만, 같은 성격의 공제는 중복 적용이 제한될 수 있어요. 한버팀님은 한부모 공제 우선 가능성이 커요. 가족 구성과 소득 요건을 기준으로 한부모 공제를 우선 확인하는 흐름이 좋아요.',
      '친정 엄마가 아이를 봐주시는데, 따로 살아도 인적공제 받을 수 있는 거야?': '따로 살아도 실제로 생계를 같이 하고, 소득·나이 요건을 만족하면 부양가족 공제 가능성이 있어요. 핵심은 어머님의 연간 소득과 부양 사실이에요. 주민등록만으로 바로 탈락하진 않아요.',
      '근로장려금 신청 대상인지, 조건이 어떻게 되는지 3줄로 요약해 줘.': '근로소득이 있고 가구 유형별 소득·재산 기준을 봐요. 한버팀님은 자녀가 있어 근로·자녀장려금 검토 대상이에요. 5월 정기 신청 기간을 놓치지 않는 게 중요해요.',
    },
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
    answers: {
      '연말정산이 13월의 월급이라던데... 나 세금 토해낼 수도 있다는데 진짜야? 왜 토해내는 거야?': '진짜 그럴 수 있어요. 회사가 월급에서 뗀 세금보다 실제 세금이 크면 추가 납부가 생겨요. 월세·청약·기부금 같은 공제를 챙기면 토해낼 가능성을 줄일 수 있어요.',
      '체크카드 쓰면 돈 돌려준다던데, 그럼 신용카드는 아예 쓰면 안 돼?': '아예 안 쓸 필요는 없어요. 총급여의 일정 비율을 넘겨 쓴 뒤부터 공제 효과가 커지고, 체크카드 공제율이 더 높은 편이에요. 고정비는 신용카드, 추가 소비는 체크카드처럼 섞는 전략이 좋아요.',
      '안경 맞춘 것도 세금 깎아준다던데, 영수증 벌써 버렸으면 어떡해?': '안경·렌즈 구입비는 의료비 세액공제 대상이 될 수 있어요. 영수증을 버렸어도 안경점 결제 내역이나 카드 사용 내역으로 확인해볼 수 있어요. 구입처에 재발급 가능 여부도 물어보세요.',
    },
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
  hanbeoteam: [
    {
      id: 'earned-child-credit',
      title: '근로장려금 및 자녀장려금',
      amountText: '최대 300만 원',
      summary: '마이데이터 기반 예상 수령액을 자동 계산해 저소득자의 근로와 자녀 양육을 지원하는 혜택이에요.',
      image: 'benefitCoins',
      sections: [
        { title: '핵심 조건', items: ['연소득 약 2,600만 원', '한부모 가정과 자녀 1명 정보를 기준으로 확인해요.', '근로장려금은 저소득자의 근로를 장려하고 소득을 지원하기 위한 지급 근거가 있어요.'] },
        { title: '공제 내용', items: ['자녀장려금은 저소득 가구의 자녀 양육을 지원하기 위한 혜택이에요.', '5월 근로·자녀장려금 정기 신청 기간을 놓치지 않는 것이 중요해요.'] },
        { title: '근거', items: ['조세특례제한법 제100조의2(근로장려세제)', '조세특례제한법 제100조의27(자녀장려세제)'] },
      ],
      source: 'mockdatas/index.md > 한버팀 > 절세추천 > 근로장려금 및 자녀장려금',
    },
    {
      id: 'single-parent-income-deduction',
      title: '한부모 소득공제',
      amountText: '기본공제 외 100만 원 추가 공제',
      summary: '부녀자 공제와 중복될 수 없을 때 더 유리한 한부모 공제를 우선 추천해요.',
      image: 'benefitCoins',
      sections: [
        { title: '핵심 조건', items: ['배우자가 없는 거주자', '종합소득금액에 기본공제대상자인 직계비속 등이 있는 경우', '한버팀님은 한부모 가정과 자녀 1명 정보를 기준으로 확인해요.'] },
        { title: '공제 내용', items: ['연 100만 원 추가 공제', '부녀자 공제(연 50만 원)와 한부모 공제가 중복될 경우 한부모 공제를 우선 적용해요.'] },
        { title: '근거', items: ['소득세법 제51조(추가공제) 제1항 제3호', '소득세법 제51조 제2항'] },
      ],
      source: 'mockdatas/index.md > 한버팀 > 절세추천 > 한부모 소득공제',
    },
    {
      id: 'parent-dependent-deduction',
      title: '따로 사는 부모님 인적공제',
      amountText: '1인당 150만 원 기본공제',
      summary: '주거 형편상 따로 살아도 실제로 부양하고 있다면 확인할 수 있는 공제예요.',
      image: 'benefitCoins',
      sections: [
        { title: '핵심 조건', items: ['주민등록상 주소지가 달라도 주거의 형편상 별거하고 있는 경우', '용돈, 생활비 송금 등 실제 부양 사실', '만 60세 이상, 연간 소득금액 100만 원 이하 요건'] },
        { title: '공제 내용', items: ['조건 충족 시 1인당 150만 원 기본공제 가능', '한버팀님 알림의 부모님 생활비 이체 내역과 연결되는 항목이에요.'] },
        { title: '근거', items: ['소득세법 제50조(기본공제)', '소득세법 시행령 제106조(주거형편상 별거의 인정)'] },
      ],
      source: 'mockdatas/index.md > 한버팀 > 절세추천 > 따로 사는 부모님 인적공제',
    },
    {
      id: 'preschool-education-credit',
      title: '취학 전 아동 학원비/체육시설 수강료 세액공제',
      amountText: '연 300만 원 한도 내 15% 세액공제',
      summary: '초등학교 입학 전 아동의 태권도장, 미술학원 등 교육비 공제를 확인해요.',
      image: 'benefitCoins',
      sections: [
        { title: '핵심 조건', items: ['초등학교 입학 전 아동을 위한 지출', '학원의 설립·운영 및 과외교습에 관한 법률에 따른 학원', '대통령령으로 정하는 체육시설에 지급한 교육비'] },
        { title: '공제 내용', items: ['연 300만 원 한도', '지급한 교육비의 15% 세액공제', '어린이집 특별활동비나 교복(원복) 구입비 지출도 추가 확인 질문과 연결돼요.'] },
        { title: '근거', items: ['소득세법 제59조의4(특별세액공제) 제3항 제1호 가목'] },
      ],
      source: 'mockdatas/index.md > 한버팀 > 절세추천 > 취학 전 아동 학원비/체육시설 수강료 세액공제',
    },
    {
      id: 'donation-credit',
      title: '기부금 세액공제',
      amountText: '15%, 고액기부 시 최대 30% 세액공제',
      summary: '종교단체, 자선단체, 사회복지법인 등에 지출한 기부금을 확인해요.',
      image: 'benefitCoins',
      sections: [
        { title: '핵심 조건', items: ['종교단체 기부금', '지정기부금: 자선단체, 사회복지법인 등', '법정·지정기부금 지출액'] },
        { title: '공제 내용', items: ['기부금 지출액의 15% 세액공제', '고액기부 시 최대 30%까지 세액공제'] },
        { title: '근거', items: ['소득세법 제59조의4(특별세액공제) 제4항', '소득세법 제34조(기부금의 소득공제 등)'] },
      ],
      source: 'mockdatas/index.md > 한버팀 > 절세추천 > 기부금 세액공제',
    },
    {
      id: 'sme-income-tax-reduction',
      title: '중소기업 취업자 소득세 감면',
      amountText: '근로소득세 70%, 연 200만 원 한도 감면',
      summary: '경력단절여성 재취업 요건 등 충족 시 중소기업 근로소득세 감면을 확인해요.',
      image: 'benefitCoins',
      sections: [
        { title: '핵심 조건', items: ['중소기업에 재취업하는 경우', '청년, 60세 이상 고령자, 장애인, 경력단절여성', '취업일로부터 3년간, 청년은 5년간'] },
        { title: '공제 내용', items: ['근로소득세의 70% 감면', '청년은 90% 감면', '연간 200만 원 한도'] },
        { title: '근거', items: ['조세특례제한법 제30조(중소기업 취업자에 대한 소득세 감면)'] },
      ],
      source: 'mockdatas/index.md > 한버팀 > 절세추천 > 중소기업 취업자 소득세 감면',
    },
  ],
  kimgatsaeng: [
    {
      id: 'monthly-rent-home',
      title: '월세액 세액공제',
      amountText: '연간 낸 월세의 17% 전액 세금에서 차감',
      summary: '서울 자취/월세 정보를 기준으로 놓치기 쉬운 주거비 공제를 확인해요.',
      image: 'rentReceipt',
      sections: [
        { title: '핵심 조건', items: ['과세기간 종료일 현재 주택을 소유하지 않은 세대', '총급여액 8천만 원 이하인 근로소득자', '총급여액 5,500만 원 이하일 때 17% 적용'] },
        { title: '공제 내용', items: ['대통령령으로 정하는 월세액을 지급한 경우 적용', '월세액이 1천만 원을 초과하는 경우 초과 금액은 없는 것으로 해요.', '전입신고, 확정일자 요건을 함께 점검해요.'] },
        { title: '근거', items: ['조세특례제한법 제95조의2(월세액에 대한 세액공제)'] },
      ],
      source: 'mockdatas/index.md > 김갓생 > 절세추천 > 월세액 세액공제',
    },
    {
      id: 'housing-savings-deduction',
      title: '주택청약종합저축 소득공제',
      amountText: '연 납입액의 40% 공제',
      summary: '총급여 7천만 원 이하 무주택 세대주 요건과 은행 등록 가이드를 확인해요.',
      image: 'rentReceipt',
      sections: [
        { title: '핵심 조건', items: ['근로소득이 있는 거주자', '총급여액 7천만 원 이하', '해당 과세기간 중 주택을 소유하지 않은 세대의 세대주 또는 세대주의 배우자'] },
        { title: '공제 내용', items: ['주택청약종합저축 납입 금액의 40%를 근로소득금액에서 공제', '연 300만 원 납입한도', '무주택 확인서를 정해진 시기에 저축 취급기관에 제출해야 해요.'] },
        { title: '근거', items: ['조세특례제한법 제87조(주택청약종합저축 등에 대한 소득공제 등)'] },
      ],
      source: 'mockdatas/index.md > 김갓생 > 절세추천 > 주택청약종합저축 소득공제',
    },
    {
      id: 'hometown-donation-credit',
      title: '고향사랑기부제 세액공제',
      amountText: '10만 원 기부 시 100% 세액공제 + 3만 원 답례품',
      summary: '원하는 지자체에 고향사랑 기부금을 낸 경우 세액공제와 답례품 혜택을 확인해요.',
      image: 'benefitCoins',
      sections: [
        { title: '핵심 조건', items: ['거주자가 고향사랑 기부금에 관한 법률에 따라 지방자치단체에 기부한 경우', '10만 원 이하 기부금', '10만 원 초과 기부금은 구간별 계산식 적용'] },
        { title: '공제 내용', items: ['10만 원 이하: 고향사랑 기부금 × 110분의 100', '10만 원 초과 20만 원 이하: 10만 원 × 110분의 100 + 초과분 × 40%', '20만 원 초과 2천만 원 이하: 구간별 15%, 특별재난지역은 30% 적용 가능'] },
        { title: '근거', items: ['조세특례제한법 제58조(고향사랑 기부금에 대한 세액공제 등)'] },
      ],
      source: 'mockdatas/index.md > 김갓생 > 절세추천 > 고향사랑기부제 세액공제',
    },
    {
      id: 'glasses-lenses',
      title: '시력보정용 안경/콘택트렌즈 구입비 의료비 세액공제',
      amountText: '1명당 연 50만 원 한도',
      summary: '안경점 결제 내역으로 시력 교정용 안경이나 렌즈 구입비를 확인해요.',
      image: 'rentReceipt',
      sections: [
        { title: '핵심 조건', items: ['기본공제대상자 1명당 적용', '시력보정용 안경 또는 콘택트렌즈 구입비', '안경점 결제 내역이나 카드 사용 내역으로 확인 가능'] },
        { title: '공제 내용', items: ['1명당 연 50만 원 이내 금액', '의료비 세액공제 대상', '국세청 연말정산 간소화 서비스에 자동 등록되지 않아 직접 챙겨야 하는 안경 구입비와 연결돼요.'] },
        { title: '근거', items: ['소득세법 제59조의4(특별세액공제)', '소득세법 시행령 제118조의5(의료비 세액공제) 제1항 제4호'] },
      ],
      source: 'mockdatas/index.md > 김갓생 > 절세추천 > 시력보정용 안경/콘택트렌즈 구입비 의료비 세액공제',
    },
    {
      id: 'medical-expense-credit',
      title: '의료비 세액공제',
      amountText: '의료비 금액의 15% 세액공제',
      summary: '근로소득자가 기본공제대상자를 위해 지급한 의료비를 확인해요.',
      image: 'rentReceipt',
      sections: [
        { title: '핵심 조건', items: ['근로소득이 있는 거주자', '기본공제대상자를 위하여 해당 과세기간에 지급한 의료비', '의료기관 비용, 의약품 구입비, 의료기기 구입·임차 비용 등'] },
        { title: '공제 내용', items: ['기본 의료비는 총급여액의 3%를 초과하는 금액 기준', '대통령령으로 정하는 의료비의 15% 세액공제', '미용·성형수술 비용 및 건강증진 의약품 구입비용은 포함하지 않아요.'] },
        { title: '근거', items: ['소득세법 제59조의4(특별세액공제) 제2항', '소득세법 시행령 제118조의5(의료비 세액공제)'] },
      ],
      source: 'mockdatas/index.md > 김갓생 > 절세추천 > 의료비 세액공제 법령',
    },
    {
      id: 'student-loan-education-credit',
      title: '학자금 대출 원리금 상환액 세액공제',
      amountText: '상환액 15% 세액공제',
      summary: '취업 후 갚기 시작한 학자금 대출 원리금 상환액을 교육비 세액공제로 확인해요.',
      image: 'benefitCoins',
      sections: [
        { title: '핵심 조건', items: ['근로소득이 있는 거주자', '해당 거주자를 위하여 지급한 교육비', '대통령령으로 정하는 학자금 대출의 원리금 상환 지출'] },
        { title: '공제 내용', items: ['교육비 금액의 15% 세액공제', '대출금 상환 연체로 인하여 추가로 지급하는 금액 등 대통령령으로 정하는 지급액은 제외'] },
        { title: '근거', items: ['소득세법 제59조의4(특별세액공제) 제3항 제2호 라목'] },
      ],
      source: 'mockdatas/index.md > 김갓생 > 절세추천 > 학자금 대출 원리금 상환액 세액공제',
    },
    {
      id: 'pension-irp-credit',
      title: '연금저축/IRP 세액공제',
      amountText: '12%, 조건 충족 시 15% 세액공제',
      summary: '공기업 취업 후 여유 자금으로 13월의 월급을 극대화하는 전략을 확인해요.',
      image: 'benefitCoins',
      sections: [
        { title: '핵심 조건', items: ['종합소득이 있는 거주자', '연금계좌에 납입한 금액', '총급여액 5천 500만 원 이하 근로소득만 있는 경우 15% 적용'] },
        { title: '공제 내용', items: ['연금계좌 납입액의 12% 세액공제', '연금저축계좌는 연 600만 원 초과 금액 제외', '연금저축계좌와 퇴직연금계좌 합산 연 900만 원 초과 금액 제외'] },
        { title: '근거', items: ['소득세법 제59조의3(연금계좌세액공제)', '소득세법 제40조의2(연금계좌 등)'] },
      ],
      source: 'mockdatas/index.md > 김갓생 > 절세추천 > 연금저축/IRP 세액공제',
    },
    {
      id: 'card-spend-strategy',
      title: '신용카드·체크카드 사용 전략',
      amountText: '총급여 일정 비율 초과 후 공제 효과 증가',
      summary: '신용카드와 체크카드 사용 비율을 조정해 연말정산 공제 효과를 확인해요.',
      image: 'benefitCoins',
      sections: [
        { title: '핵심 조건', items: ['총급여의 일정 비율을 넘겨 쓴 뒤부터 공제 효과가 커져요.', '체크카드 공제율이 더 높은 편이에요.', '이번 달 신용카드 지출액이 기준치를 넘었다는 알림과 연결돼요.'] },
        { title: '사용 전략', items: ['고정비는 신용카드', '추가 소비는 체크카드처럼 섞는 전략', '내일부터는 체크카드를 써야 연말정산 때 돈을 더 받을 수 있다는 안내와 연결돼요.'] },
        { title: '근거', items: ['mockdatas/index.md > 김갓생 > 챗봇 > 체크카드 쓰면 돈 돌려준다던데', 'mockdatas/index.md > 김갓생 > 알림 > 신용카드 지출액'] },
      ],
      source: 'mockdatas/index.md > 김갓생 > 챗봇/알림 > 신용카드·체크카드 사용 전략',
    },
  ],
};

export function getDeductions(personaId) {
  return deductionDataByPersona[personaId] || deductionDataByPersona.hanbeoteam;
}

export function getDeductionDetail(personaId, deductionId) {
  const deductions = getDeductions(personaId);
  const allDeductions = Object.values(deductionDataByPersona).flat();
  return deductions.find((item) => item.id === deductionId) || allDeductions.find((item) => item.id === deductionId) || deductions[0];
}

export function getPolicyDetail(personaId, policyId) {
  const policies = getPolicies(personaId);
  const allPolicies = Object.values(policyDataByPersona).flat();
  return policies.find((item) => item.id === policyId) || allPolicies.find((item) => item.id === policyId) || getPrimaryPolicy(personaId);
}

export const notificationDataByPersona = {
  hanbeoteam: [
    { id: 'parent-transfer', category: 'recommendation', text: "💡 한버팀님! 부모님께 매달 이체하신 내역이 있어요. '부양가족 인적공제' 대상이 되는지 1분 만에 확인해 볼까요?", toPage: 'deduction-detail', detailId: 'parent-dependent-deduction', source: 'mockdatas/index.md > 한버팀 > 알림' },
    { id: 'culture-start', category: 'recommendation', text: '이번 달 문화누리카드 지원금 신청이 시작되었어요. 아이와 함께 쓸 수 있어요!', toPage: 'policy-detail', detailId: 'culture-card', source: 'mockdatas/index.md > 한버팀 > 알림' },
    { id: 'child-support-paid', category: 'status', text: '✅ 한부모가족 아동양육비 21만 원이 계좌로 정상 입금되었습니다.', toPage: 'policy-detail', detailId: 'child-care-service', source: 'mockdatas/index.md > 한버팀 > 알림' },
    { id: 'eitc-deadline', category: 'status', text: '🚨 근로장려금 신청 마감이 딱 3일 남았어요! 터치 한 번으로 쉽게 신청하세요.', toPage: 'deduction-detail', detailId: 'earned-child-credit', source: 'mockdatas/index.md > 한버팀 > 알림' },
  ],
  kimgatsaeng: [
    { id: 'card-spend', category: 'recommendation', text: '💡 이번 달 신용카드 지출액이 기준치를 넘었어요! 내일부터는 체크카드를 써야 연말정산 때 돈을 더 받아요.', toPage: 'deduction-detail', detailId: 'card-spend-strategy', source: 'mockdatas/index.md > 김갓생 > 알림' },
    { id: 'glasses-receipt', category: 'recommendation', text: '김갓생님, 안경점에서 결제한 15만 원을 연말정산에 반영할까요? (터치하여 1분 만에 영수증 등록하기)', toPage: 'deduction-detail', detailId: 'glasses-lenses', source: 'mockdatas/index.md > 김갓생 > 알림' },
    { id: 'hometown-paid', category: 'status', text: '✅ 고향사랑기부제 10만 원 납부가 완료되어, 연말정산 100% 세액공제 항목에 자동 추가되었습니다.', toPage: 'deduction-detail', detailId: 'hometown-donation-credit', source: 'mockdatas/index.md > 김갓생 > 알림' },
    { id: 'rent-receipt', category: 'status', text: '📝 집주인 눈치 볼 필요 없어요! 월세 현금영수증 발급 신청이 국세청에 정상 접수되었습니다.', toPage: 'deduction-detail', detailId: 'monthly-rent-home', source: 'mockdatas/index.md > 김갓생 > 알림' },
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
