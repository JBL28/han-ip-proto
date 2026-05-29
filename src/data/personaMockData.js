// Centralized UI mock data sourced only from mockdatas/index.md and mockdatas/*.xml.
// Do not add persona amounts, policy names, deduction names, or recommendation text unless it exists in mockdatas.

export const personaHomeData = {
  hanbeoteam: {
    source: 'mockdatas/index.md > 한버팀 시나리오 흐름',
    alert: {
      message: '한버팀님, 올해 몰라서 놓칠 뻔한 혜택이 총 315만 원이에요!',
      amountLabel: '총 받을 수 있는 혜택',
      amount: '315',
      amountUnit: '만원',
      recommendationHeading: '절세(혜택) 추천 항목 3개',
    },
    recommendations: [
      {
        type: 'deduction',
        title: '근로장려금 및 자녀장려금',
        description: '최대 300만 원',
        detailPage: 'deduction-detail',
        source: 'mockdatas/index.md > 한버팀 > 메인페이지 > 절세(혜택) 추천 항목 3개',
      },
      {
        type: 'deduction',
        title: '한부모 소득공제',
        description: '기본공제 외 100만 원 추가 공제',
        detailPage: 'deduction-detail',
        source: 'mockdatas/index.md > 한버팀 > 메인페이지 > 절세(혜택) 추천 항목 3개',
      },
      {
        type: 'deduction',
        title: '취학 전 아동 학원비 세액공제',
        description: '결제액의 15% 공제',
        detailPage: 'deduction-detail',
        source: 'mockdatas/index.md > 한버팀 > 메인페이지 > 절세(혜택) 추천 항목 3개',
      },
    ],
    knowledge: {
      title: '취학 전 아동 학원비/체육시설 수강료 세액공제',
      description: '태권도장, 미술학원 등 교육비 공제',
      detailPage: 'deduction-detail',
      source: 'mockdatas/index.md > 한버팀 > 절세추천 > 절세 추천 항목 6개',
    },
    calendar: {
      caption: '5월',
      schedules: [
        {
          type: 'tax',
          title: '근로·자녀장려금 정기 신청 기간 (마감일 강조)',
          period: '5월',
          detailPage: 'deduction-detail',
          source: 'mockdatas/index.md > 한버팀 > 메인페이지 > 캘린더에 어떤 정책 뜰지 고민',
        },
        {
          type: 'policy',
          title: '한부모가족 아동양육비 입금일 및 신청 요건 갱신일',
          period: '매월',
          detailPage: 'policy-detail',
          source: 'mockdatas/index.md > 한버팀 > 메인페이지 > 캘린더에 어떤 정책 뜰지 고민',
        },
      ],
    },
    policies: [
      {
        title: '아이돌봄서비스',
        description: '맞벌이를 하거나 갑자기 아이를 돌볼 수 없는 일이 생겼을 때 육아 도우미가 방문하여 12세 이하 자녀의 양육을 도와줍니다.',
        source: 'mockdatas/text/hanbeoteam__ED_95_9C_EB_B2_84_ED_8C_80_1_EB_B2_88__EB_B3_B5_EC_A7_80_EB_A1_9C__EC_A0_95_EC_B1_85.txt',
      },
      {
        title: '통합문화이용권',
        description: '기초생활수급자 및 차상위계층 대상 문화예술·국내 여행·체육 활동 지원을 통해 문화 향유 기회 확대로 문화격차 완화 및 소외계층의 삶의 질 향상을 도모합니다.',
        source: 'mockdatas/text/hanbeoteam__ED_95_9C_EB_B2_84_ED_8C_80_3_EB_B2_88__EB_B3_B5_EC_A7_80_EB_A1_9C__EC_A0_95_EC_B1_85.txt',
      },
    ],
  },
  kimgatsaeng: {
    source: 'mockdatas/index.md > 김갓생 시나리오 흐름',
    alert: {
      message: '김갓생님, 지금 소비 습관 유지 시 예상 환급액은 145만 원이에요!',
      amountLabel: '예상 환급액',
      amount: '145',
      amountUnit: '만원',
      recommendationHeading: '절세(혜택) 추천 항목 3개',
    },
    recommendations: [
      {
        type: 'deduction',
        title: '월세액 세액공제',
        description: '연간 낸 월세의 17% 전액 세금에서 차감',
        detailPage: 'deduction-detail',
        source: 'mockdatas/index.md > 김갓생 > 메인페이지 > 절세(혜택) 추천 항목 3개',
      },
      {
        type: 'deduction',
        title: '주택청약종합저축 소득공제',
        description: '연 납입액의 40% 공제',
        detailPage: 'deduction-detail',
        source: 'mockdatas/index.md > 김갓생 > 메인페이지 > 절세(혜택) 추천 항목 3개',
      },
      {
        type: 'deduction',
        title: '고향사랑기부제',
        description: '10만 원 내면 13만 원어치 혜택!',
        detailPage: 'deduction-detail',
        source: 'mockdatas/index.md > 김갓생 > 메인페이지 > 절세(혜택) 추천 항목 3개',
      },
    ],
    knowledge: {
      title: '시력보정용 안경/콘택트렌즈 구입비 의료비 세액공제',
      description: '연 50만 원 한도, 안경점 결제 내역 확인',
      detailPage: 'deduction-detail',
      source: 'mockdatas/index.md > 김갓생 > 절세추천 > 절세 추천 항목 6개',
    },
    calendar: {
      caption: '10월/11월',
      schedules: [
        {
          type: 'tax',
          title: '국세청 연말정산 미리보기 서비스 오픈일 알림',
          period: '10월/11월',
          detailPage: 'deduction-detail',
          source: 'mockdatas/index.md > 김갓생 > 메인페이지 > 캘린더에 어떤 정책 뜰지 고민',
        },
        {
          type: 'tax',
          title: "청약저축 소득공제를 위한 '무주택확인서' 은행 제출 마감일 (12/31)",
          period: '12월',
          detailPage: 'deduction-detail',
          source: 'mockdatas/index.md > 김갓생 > 메인페이지 > 캘린더에 어떤 정책 뜰지 고민',
        },
      ],
    },
    policies: [
      {
        title: '국민내일배움카드제 직업훈련지원(훈련비, 훈련장려금)',
        description: '급격한 기술발전에 적응하고 노동시장 변화에 대응하는 사회안전망 차원에서 생애에 걸친 역량개발 향상 등을 위해 국민 스스로 직업능력개발훈련을 실시할 수 있도록 훈련비 등을 지원합니다.',
        source: 'mockdatas/text/kimgatsaeng__EA_B9_80_EA_B0_93_EC_83_9D_1_EB_B2_88__EB_B3_B5_EC_A7_80_EB_A1_9C__EC_A0_95_EC_B1_85.txt',
      },
      {
        title: '청년월세 지원사업',
        description: "고금리·고물가 등으로 경제적 어려움을 겪는 청년층의 주거비 부담 경감을 위해 월 최대20만원씩 최장 24개월간 월세를 지원합니다(생애1회).\n  ※ '26년 신규 신청기간: 3.30(월) 09:00 ~ 5.29(금) 16:00까지",
        source: 'mockdatas/text/kimgatsaeng__EA_B9_80_EA_B0_93_EC_83_9D_2_EB_B2_88__EB_B3_B5_EC_A7_80_EB_A1_9C__EC_A0_95_EC_B1_85.txt',
      },
    ],
  },
};

export function getPersonaHomeData(personaId) {
  return personaHomeData[personaId] || personaHomeData.hanbeoteam;
}
