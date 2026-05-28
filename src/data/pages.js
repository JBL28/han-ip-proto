export const variants = {
  a: { name: 'A안', tone: '절제된 금융 앱' },
  b: { name: 'B안', tone: '정보 카드형 분석 앱' },
  c: { name: 'C안', tone: 'AI 비서형 앱' },
};

export const pages = {
  signup: { title: '회원가입 플로우' },
  home: { title: '메인 페이지' },
  'tax-saving': { title: '절세 추천' },
  'tax-chat': { title: '절세챗봇' },
  'deduction-detail': { title: '공제 상세보기' },
  policies: { title: '정책추천' },
  'policy-detail': { title: '정책 상세보기' },
  notifications: { title: '알림' },
  my: { title: '마이페이지' },
  persona: { title: 'AI 페르소나 변경' },
};

export const sourceManifest = {
  scenario: 'mockdatas/index.md',
  pdfExtractionFolder: '.omx/artifacts/pdf-text',
  policyXmlFolder: 'mockdatas',
  pdfs: [
    {
      id: 'han-income-20',
      file: 'mockdatas/한버팀_1번_소득세법_20조 (1).pdf',
      extractedText: '.omx/artifacts/pdf-text/한버팀_1번_소득세법_20조 (1).pdf.txt',
      chars: 0,
      status: 'no-extractable-text',
      note: '현재 PDF 텍스트 스트림에서 ToUnicode 텍스트를 추출하지 못해 화면 evidence로 사용하지 않음',
    },
    { id: 'han-eitc-child-27-30', file: 'mockdatas/한버팀_1번_조세특례제한법100조의_27-30.hwp.pdf', extractedText: '.omx/artifacts/pdf-text/한버팀_1번_조세특례제한법100조의_27-30.hwp.pdf.txt', chars: 2424, status: 'extracted' },
    { id: 'han-eitc-2-13', file: 'mockdatas/한버팀_1번_조세특례제한법_100조의_2-13.hwp.pdf', extractedText: '.omx/artifacts/pdf-text/한버팀_1번_조세특례제한법_100조의_2-13.hwp.pdf.txt', chars: 10617, status: 'extracted' },
    { id: 'han-income-51', file: 'mockdatas/한버팀_2번_소득세법_51.hwp.pdf', extractedText: '.omx/artifacts/pdf-text/한버팀_2번_소득세법_51.hwp.pdf.txt', chars: 788, status: 'extracted' },
    { id: 'han-income-50', file: 'mockdatas/한버팀_3번_소득세법_50.hwp.pdf', extractedText: '.omx/artifacts/pdf-text/한버팀_3번_소득세법_50.hwp.pdf.txt', chars: 1061, status: 'extracted' },
    { id: 'han-income-53', file: 'mockdatas/한버팀_3번_소득세법_53.hwp.pdf', extractedText: '.omx/artifacts/pdf-text/한버팀_3번_소득세법_53.hwp.pdf.txt', chars: 819, status: 'extracted' },
    { id: 'han-income-59-4-education', file: 'mockdatas/한버팀_4번_소득세법59조의_4.hwp.pdf', extractedText: '.omx/artifacts/pdf-text/한버팀_4번_소득세법59조의_4.hwp.pdf.txt', chars: 4690, status: 'extracted' },
    { id: 'han-income-34-59-4-donation', file: 'mockdatas/한버팀_5번_소득세법_34조_59조_4.hwp.pdf', extractedText: '.omx/artifacts/pdf-text/한버팀_5번_소득세법_34조_59조_4.hwp.pdf.txt', chars: 5990, status: 'extracted-with-artifacts', note: '원 PDF 텍스트 추출 중 일부 조문 번호/따옴표가 깨짐' },
    { id: 'han-special-30', file: 'mockdatas/한버팀_6번_조세특례제한법_30조.hwp.pdf', extractedText: '.omx/artifacts/pdf-text/한버팀_6번_조세특례제한법_30조.hwp.pdf.txt', chars: 2448, status: 'extracted' },
  ],
};

const hanPdfEvidence = {
  "eitc": [
    {
      "sourceId": "han-eitc-2-13",
      "line": "19-20",
      "sourceType": "pdf-raw-excerpt",
      "text": "제100조의2\u0014근로장려세제저소득자의근로를장려하고소득을지원하기위하여제100조의3부터제100조의13까\n지의규정에따른근로장려세제를적용하여근로장려금을결정ㆍ환급한다."
    },
    {
      "sourceId": "han-eitc-2-13",
      "line": "22-24",
      "sourceType": "pdf-raw-excerpt",
      "text": "제100조의3\u0014근로장려금의신청자격①소득세과세기간중에「소득세법」제19조에따른사업소득,같은법\n제20조에따른근로소득또는같은법제21조제1항제26호에따른종교인소득이있는거주자로서대통령령으로\n정하는자는다음각호의요건을모두갖춘경우해당소득세과세기간의근로장려금을신청할수있다.<개정"
    },
    {
      "sourceId": "han-eitc-child-27-30",
      "line": "19-20",
      "sourceType": "pdf-raw-excerpt",
      "text": "제100조의27\u0016자녀장려세제저소득자의자녀양육비를지원하기위하여제100조의28부터제100조의31까지의규정\n에따른자녀장려세제를적용하여자녀장려금을결정ㆍ환급한다."
    },
    {
      "sourceId": "han-eitc-child-27-30",
      "line": "22-24",
      "sourceType": "pdf-raw-excerpt",
      "text": "제100조의28\u0016자녀장려금의신청자격①소득세과세기간중에「소득세법」제19조에따른사업소득,같은법\n제20조에따른근로소득또는같은법제21조제1항제26호에따른종교인소득이있는거주자로서대통령령으로\n정하는자는다음각호의요건을모두갖춘경우해당소득세과세기간의자녀장려금을신청할수있다.<개정"
    }
  ],
  "singleParent": [
    {
      "sourceId": "han-income-51",
      "line": "8-10",
      "sourceType": "pdf-raw-excerpt",
      "text": "제51조(추가공제)①제50조에따른기본공제대상이되는사람(이하H기본공제대상자라한다)이다음각호의어\n느하나에해당하는경우에는거주자의해당과세기간종합소득금액에서기본공제외에각호별로정해진금액\n을추가로공제한다.다만,제3호와제6호에모두해당되는경우에는제6호를적용한다.<개정2013.1.1.,"
    },
    {
      "sourceId": "han-income-51",
      "line": "14-19",
      "sourceType": "pdf-raw-excerpt",
      "text": "3.해당거주자(해당과세기간에종합소득과세표준을계산할때합산하는종합소득금액이3천만원이하인거주\n자로한정한다)가배우자가없는여성으로서제50조제1항제3호에따른부양가족이있는세대주이거나배\n우자가있는여성인경우연50만원\n4.삭제<2014.1.1.>\n5.삭제<2014.1.1.>\n6.해당거주자가배우자가없는사람으로서기본공제대상자인직계비속또는입양자가있는경우연100만"
    }
  ],
  "parentSupport": [
    {
      "sourceId": "han-income-50",
      "line": "9-11",
      "sourceType": "pdf-raw-excerpt",
      "text": "제50조(기본공제)①종합소득이있는거주자(자연인만해당한다)에대해서는다음각호의어느하나에해당하는\n사람의수에1명당연150만원을곱하여계산한금액을그거주자의해당과세기간의종합소득금액에서공제\n한다.<개정2015.12.15.,2024.12.31.>"
    },
    {
      "sourceId": "han-income-50",
      "line": "15-18",
      "sourceType": "pdf-raw-excerpt",
      "text": "3.거주자(그배우자를포함한다.이하이호에서같다)와생계를같이하는다음각목의어느하나에해당하\n는부양가족(제51조제1항제2호의장애인에해당되는경우에는나이의제한을받지아니한다)으로서해당과세\n기간의소득금액합계액이100만원이하인사람(총급여액500만원이하의근로소득만있는부양가족을포함\n한다)"
    },
    {
      "sourceId": "han-income-53",
      "line": "8-10",
      "sourceType": "pdf-raw-excerpt",
      "text": "제53조(생계를같이하는부양가족의범위와그판정시기)①제50조에규정된생계를같이하는부양가족은주\n민등록표의동거가족으로서해당거주자의주소또는거소에서현실적으로생계를같이하는사람으로한다.\n다만,직계비속ㆍ입양자의경우에는그러하지아니하다."
    },
    {
      "sourceId": "han-income-53",
      "line": "14-15",
      "sourceType": "pdf-raw-excerpt",
      "text": "③거주자의부양가족중거주자(그배우자를포함한다)의직계존속이주거형편에따라별거하고있는경우\n에는제1항에도불구하고제50조에서규정하는생계를같이하는사람으로본다."
    }
  ],
  "preschoolEducation": [
    {
      "sourceId": "han-income-59-4-education",
      "line": "36-39",
      "sourceType": "pdf-raw-excerpt",
      "text": "③근로소득이있는거주자가그거주자와기본공제대상자(나이및소득의제한을받지아니하되,제3호나목의\n기관에대해서는과세기간종료일현재18세미만인사람만해당한다)를위하여해당과세기간에대통령령으로\n정하는교육비를지급한경우다음각호의금액의100분의15에해당하는금액을해당과세기간의종합소득\n산출세액에서공제한다.다만,소득세또는증여세가비과세되는대통령령으로정하는교육비는공제하지아"
    },
    {
      "sourceId": "han-income-59-4-education",
      "line": "41-44",
      "sourceType": "pdf-raw-excerpt",
      "text": "1.기본공제대상자인배우자ㆍ직계비속ㆍ형제자매ㆍ입양자및위탁아동(이하이호에서직계비속등이라한다)\n을위하여지급한다음각목의교육비를합산한금액.다만,대학원에지급하거나직계비속등이제2호라목에\n따른학자금대출을받아지급하는교육비는제외하며,대학생인경우에는1명당연900만원,초등학교\n취학전아동과초ㆍ중ㆍ고등학생인경우에는1명당연300만원을한도로한다."
    },
    {
      "sourceId": "han-income-59-4-education",
      "line": "57-58",
      "sourceType": "pdf-raw-excerpt",
      "text": "라.초등학교취학전아동을위하여영유아보육법「에따른어린이집,학원의설립ㆍ운영및과외교습에\n관한법률「에따른학원또는대통령령으로정하는체육시설에지급한교육비(학원및체육시설에지급"
    }
  ],
  "donation": [
    {
      "sourceId": "han-income-34-59-4-donation",
      "line": "8-9",
      "sourceType": "pdf-raw-excerpt",
      "text": "제\u0006조(기부금의필요경비불산입)①이조에서?기부금이란사업자가사업과직접적인관계없이무상으로지\n출하는금액(대통령령으로정하는거래를통하여실질적으로증여한것으로인정되는금액을포함한다)을말한"
    },
    {
      "sourceId": "han-income-34-59-4-donation",
      "line": "22-23",
      "sourceType": "pdf-raw-excerpt",
      "text": "1.일반기부금9사회복지ㆍ문화ㆍ예술ㆍ교육ㆍ종교ㆍ자선ㆍ학술등공익성을고려하여대통령령으로정하는기\n부금(제2항제1호에따른기부금은제외한다)"
    },
    {
      "sourceId": "han-income-34-59-4-donation",
      "line": "111-115",
      "sourceType": "pdf-raw-excerpt",
      "text": "다)가해당과세기간에지급한기부금[제50조제1항제2호및제3호에해당하는사람(나이의제한을받지아니하\n며,다른거주자의기본공제를적용받은사람은제외한다)이지급한기부금을포함한다]이있는경우다음각\n호의기부금을합한금액에서사업소득금액을계산할때필요경비에산입한기부금을뺀금액의100분의15(해\n당금액이1천만원을초과하는경우그초과분에대해서는100분의30)에해당하는금액(이하제61조제2항에서\n?기부금세액공제액이라한다)을해당과세기간의합산과세되는종합소득산출세액(필요경비에산입한기부금이"
    }
  ],
  "smeReduction": [
    {
      "sourceId": "han-special-30",
      "line": "17-26",
      "sourceType": "pdf-raw-excerpt",
      "text": "제30조(중소기업취업자에대한소득세감면)①청년,60세이상인사람,장애인및제29조의8제2항에따른\n경력단절근로자(이하이조에서“경력단절근로자”라한다)등대통령령으로정하는사람이「중소기업기본\n법」제2조에따른중소기업(비영리기업을포함한다)으로서대통령령으로정하는기업(이하이조에서“중\n소기업체”라한다)에2012년1월1일(60세이상인사람또는장애인의경우2014년1월1일)부터2026년12월\n31일까지취업하는경우그중소기업체로부터받는근로소득으로서그취업일부터3년[대통령령으로정하는\n청년(이하이항에서“청년”이라한다)의경우에는5년]이되는날(청년으로서대통령령으로정하는병역을이\n행한후1년이내에병역이행전에근로를제공한중소기업체에복직하는경우에는복직한날부터2년이되는\n날을말하며,그복직한날이최초취업일부터5년이지나지아니한경우에는최초취업일부터7년이되는날\n을말한다)이속하는달까지발생한소득에대해서는소득세의100분의70(청년의경우에는100분의90)에\n상당하는세액을감면(과세기간별로200만원을한도로한다)한다.이경우소득세감면기간은소득세를감면"
    }
  ]
};

export const personas = {
  hanbeoteam: {
    id: 'hanbeoteam',
    name: '한버팀',
    age: '34세',
    label: '워킹맘',
    source: 'mockdatas/index.md + 한버팀 PDF 추출 텍스트',
    signup: {
      incomeBasic: '연소득 약 2,600만 원, 중소기업 사무직',
      residenceFamily: '경기 부천 거주, 한부모 가정 (자녀 1명)',
      dataConnection: '마이데이터 연동(홈택스, 정부24, 주거래은행)을 통해 소득 및 지출 내역, 가족 관계 자동 스크래핑 완료',
    },
    home: {
      totalBenefitMessage: '한버팀님, 올해 몰라서 놓칠 뻔한 혜택이 총 315만 원이에요!',
      recommendations: [
        '근로장려금 및 자녀장려금 (최대 300만 원)',
        '한부모 소득공제 (기본공제 외 100만 원 추가 공제)',
        '취학 전 아동 학원비 세액공제 (결제액의 15% 공제)',
      ],
      calendar: [
        '5월: 근로·자녀장려금 정기 신청 기간 (마감일 강조)',
        '매월: 한부모가족 아동양육비 입금일 및 신청 요건 갱신일',
      ],
    },
    taxSaving: {
      items: [
        {
          id: 'han-tax-1',
          title: '근로장려금 및 자녀장려금',
          description: '마이데이터 기반 예상 수령액 자동 계산',
          legalBasis: ['조세특례제한법 제100조의2~제100조의13', '조세특례제한법 제100조의27~제100조의30', '소득세법 제20조'],
          sourceStatus: [{ sourceId: 'han-income-20', status: 'no-extractable-text' }],
          sourceDocuments: ['mockdatas/index.md', '한버팀_1번_조세특례제한법_100조의_2-13.hwp.pdf', '한버팀_1번_조세특례제한법100조의_27-30.hwp.pdf'],
          evidence: hanPdfEvidence.eitc,
        },
        {
          id: 'han-tax-2',
          title: '한부모 소득공제',
          description: '부녀자 공제와 중복 불가함에 따라 더 유리한 한부모 공제 자동 추천',
          legalBasis: ['소득세법 제51조(추가공제)'],
          sourceDocuments: ['mockdatas/index.md', '한버팀_2번_소득세법_51.hwp.pdf'],
          evidence: hanPdfEvidence.singleParent,
        },
        {
          id: 'han-tax-3',
          title: '따로 사는 부모님(친정/시가) 인적공제',
          description: '주거 형편상 따로 살더라도 용돈/생활비를 보태드리고 있다면 공제 가능 - 매우 자주 놓치는 항목',
          legalBasis: ['소득세법 제50조(기본공제)', '소득세법 제53조(생계를 같이하는 부양가족의 범위와 판정시기)'],
          sourceDocuments: ['mockdatas/index.md', '한버팀_3번_소득세법_50.hwp.pdf', '한버팀_3번_소득세법_53.hwp.pdf'],
          evidence: hanPdfEvidence.parentSupport,
        },
        {
          id: 'han-tax-4',
          title: '취학 전 아동 학원비/체육시설 수강료 세액공제',
          description: '태권도장, 미술학원 등 교육비 공제',
          legalBasis: ['소득세법 제59조의4(특별세액공제) 제3항'],
          sourceDocuments: ['mockdatas/index.md', '한버팀_4번_소득세법59조의_4.hwp.pdf'],
          evidence: hanPdfEvidence.preschoolEducation,
        },
        {
          id: 'han-tax-5',
          title: '기부금 세액공제',
          description: '종교단체, 자선단체 기부금 등',
          legalBasis: ['소득세법 제34조', '소득세법 제59조의4(특별세액공제) 제4항'],
          sourceDocuments: ['mockdatas/index.md', '한버팀_5번_소득세법_34조_59조_4.hwp.pdf', '한버팀_4번_소득세법59조의_4.hwp.pdf'],
          evidence: hanPdfEvidence.donation,
        },
        {
          id: 'han-tax-6',
          title: '중소기업 취업자 소득세 감면',
          description: '경력단절여성 재취업 요건 등 충족 시',
          legalBasis: ['조세특례제한법 제30조(중소기업 취업자에 대한 소득세 감면)'],
          sourceDocuments: ['mockdatas/index.md', '한버팀_6번_조세특례제한법_30조.hwp.pdf'],
          evidence: hanPdfEvidence.smeReduction,
        },
      ],
      aiQuestion: '혹시 아이 어린이집 특별활동비나 교복(원복) 구입비로 따로 계좌이체 하신 적 있으신가요?',
      addedDeduction: '[교육비 세액공제] (카드 결제 내역에 잡히지 않은 특별활동비/현장체험학습비 지출을 증빙하여 공제 항목에 추가)',
    },
    chatbot: {
      selectedPersona: '관심형 (학생 수준)',
      description: '어려운 행정 용어를 빼고 3줄 요약 + 맞춤형 추천 제공',
      questions: [
        '한부모 소득공제랑 부녀자 소득공제가 있다던데, 나는 둘 다 받을 수 있어?',
        '친정 엄마가 아이를 봐주시는데, 따로 살아도 인적공제 받을 수 있는 거야?',
        '근로장려금 신청 대상인지, 조건이 어떻게 되는지 3줄로 요약해 줘.',
      ],
    },
    mypage: {
      benefitAmount: "올해 '한입'을 통해 확실하게 챙긴 누적 혜택 240만 원 (작년 근로장려금 환급액 + 매월 아동수당 합산액)",
    },
    notifications: {
      recommendations: [
        "💡 한버팀님! 부모님께 매달 이체하신 내역이 있어요. '부양가족 인적공제' 대상이 되는지 1분 만에 확인해 볼까요?",
        '이번 달 문화누리카드 지원금 신청이 시작되었어요. 아이와 함께 쓸 수 있어요!',
      ],
      statuses: [
        '✅ 한부모가족 아동양육비 21만 원이 계좌로 정상 입금되었습니다.',
        '🚨 근로장려금 신청 마감이 딱 3일 남았어요! 터치 한 번으로 쉽게 신청하세요.',
      ],
    },
  },
  kimgatsaeng: {
    id: 'kimgatsaeng',
    name: '김갓생',
    age: '26세',
    label: '사회초년생',
    source: 'mockdatas/index.md',
    signup: {
      incomeBasic: '연소득 약 4,200만 원, 공기업 신입 사원',
      residenceFamily: '서울 거주(자취/월세), 1인 가구',
      dataConnection: '마이데이터 연동(국세청, 은행, 카드사)을 통해 급여내역, 월세 이체내역, 카드 사용 비율 등 자동 스크래핑 완료',
    },
    home: {
      totalBenefitMessage: '김갓생님, 지금 소비 습관 유지 시 예상 환급액은 145만 원이에요!',
      recommendations: [
        '월세액 세액공제 (연간 낸 월세의 17% 전액 세금에서 차감)',
        '주택청약종합저축 소득공제 (연 납입액의 40% 공제)',
        '고향사랑기부제 (10만 원 내면 13만 원어치 혜택!)',
      ],
      calendar: [
        '10월/11월: 국세청 연말정산 미리보기 서비스 오픈일 알림',
        "12월: 청약저축 소득공제를 위한 '무주택확인서' 은행 제출 마감일 (12/31)",
      ],
    },
    taxSaving: {
      items: [
        { id: 'kim-tax-1', title: '월세액 세액공제', description: '연봉 5,500만 원 이하 17% 적용 / 전입신고, 확정일자 요건 안내', legalBasis: ['조세특례제한법 제95조의2'], sourceDocuments: ['mockdatas/index.md'] },
        { id: 'kim-tax-2', title: '주택청약종합저축 소득공제', description: '총급여 7천만 원 이하 무주택 세대주 요건 및 은행 등록 가이드', legalBasis: ['조세특례제한법 제87조'], sourceDocuments: ['mockdatas/index.md'] },
        { id: 'kim-tax-3', title: '고향사랑기부제 세액공제', description: '내 고향이나 원하는 지자체에 10만 원 기부 시 100% 세액공제 + 3만 원 답례품', legalBasis: ['조세특례제한법 제58조'], sourceDocuments: ['mockdatas/index.md'] },
        { id: 'kim-tax-4', title: '시력보정용 안경/콘택트렌즈 구입비 의료비 세액공제', description: '연 50만 원 한도, 안경점 결제 내역 확인', legalBasis: ['소득세법 제59조의4', '소득세법 시행령 제118조의5'], sourceDocuments: ['mockdatas/index.md'] },
        { id: 'kim-tax-5', title: '학자금 대출 원리금 상환액 세액공제', description: '취업 후 갚기 시작한 학자금 대출 상환액 15% 공제', legalBasis: ['소득세법 제59조의4'], sourceDocuments: ['mockdatas/index.md'] },
        { id: 'kim-tax-6', title: '연금저축/IRP 세액공제', description: '공기업 취업 후 여유 자금으로 미리 준비하는 13월의 월급 극대화 전략', legalBasis: ['소득세법 제59조의3', '소득세법 제40조의2'], sourceDocuments: ['mockdatas/index.md'] },
      ],
      aiQuestion: "마이데이터 결제 내역에 'OO안경원'이 있네요! 혹시 시력 교정용 안경이나 렌즈를 사셨나요?",
      addedDeduction: '[의료비 세액공제] (국세청 연말정산 간소화 서비스에 자동 등록되지 않아 직접 챙겨야 하는 안경 구입비를 추가 공제로 연결)',
    },
    chatbot: {
      selectedPersona: '초보형 (세금 문외한)',
      description: '세금, 연말정산 1도 모르는 쌩초보를 위한 초간단 비유와 설명',
      questions: [
        '연말정산이 13월의 월급이라던데... 나 세금 토해낼 수도 있다는데 진짜야? 왜 토해내는 거야?',
        '체크카드 쓰면 돈 돌려준다던데, 그럼 신용카드는 아예 쓰면 안 돼?',
        '안경 맞춘 것도 세금 깎아준다던데, 영수증 벌써 버렸으면 어떡해?',
      ],
    },
    mypage: {
      benefitAmount: "취업 후 '한입'과 함께 차곡차곡 챙긴 누적 혜택 95만 원 (작년 연말정산 월세 환급금 + K-패스 교통비 환급 등)",
    },
    notifications: {
      recommendations: [
        '💡 이번 달 신용카드 지출액이 기준치를 넘었어요! 내일부터는 체크카드를 써야 연말정산 때 돈을 더 받아요.',
        '김갓생님, 안경점에서 결제한 15만 원을 연말정산에 반영할까요? (터치하여 1분 만에 영수증 등록하기)',
      ],
      statuses: [
        '✅ 고향사랑기부제 10만 원 납부가 완료되어, 연말정산 100% 세액공제 항목에 자동 추가되었습니다.',
        '📝 집주인 눈치 볼 필요 없어요! 월세 현금영수증 발급 신청이 국세청에 정상 접수되었습니다.',
      ],
    },
  },
};

export const chatbotPersonas = [
  { id: 'beginner', name: '초보형', description: '아예 모르는사람(유치원 수준) → 쉬운 설명' },
  { id: 'interested', name: '관심형', description: '들어는 봤지만 (관심있지만) 자세히 모름(학생 수준) → 요약 + 추천' },
  { id: 'study', name: '공부형', description: '약간의 정보를 알고 있고, 배울 의지가 있는 사람(성인 수준) → 분석 + 전략' },
];

export const policyCategories = ['문화', '교육', '취업', '의료', '대출', '지원금', '보호', '행정', '주거'];

export const welfarePolicies = {
  hanbeoteam: [
    {
      sourceFile: 'mockdatas/_ED_95_9C_EB_B2_84_ED_8C_80_1_EB_B2_88__EB_B3_B5_EC_A7_80_EB_A1_9C__EC_A0_95_EC_B1_85.xml',
      inqNum: '71868', intrsThemaArray: '생활지원,보호·돌봄', jurMnofNm: '보건복지부', jurOrgNm: '장애인서비스과', lifeArray: '영유아,아동,청소년', onapPsbltYn: 'Y', rprsCtadr: '129',
      servDgst: '장애아동 가족의 일상적인 돌봄 부담을 경감하고 보호자의 사회활동을 돕기 위하여 돌봄 및 일시적 휴식지원 서비스를 제공합니다.',
      servDtlLink: 'https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003262&wlfareInfoReldBztpCd=01', servId: 'WLF00003262', servNm: '아이돌봄서비스', displayNameFromIndex: '아이돌봄서비스', xmlServNm: '장애아가족양육지원', sourceConflict: true, sourceConflictNote: 'mockdatas/index.md 표기와 XML servNm 값 불일치', sprtCycNm: '년', srvPvsnNm: '프로그램/서비스(서비스)', svcfrstRegTs: '20210903', trgterIndvdlArray: '장애인',
    },
    { sourceFile: 'mockdatas/index.md', servNm: '한부모가족 아동양육비 지원', note: '복지로 API 만으로는 부족 -> 정부24, 경기민원24, 부천시 크롤링 필요.. (확장가능성)' },
    {
      sourceFile: 'mockdatas/_ED_95_9C_EB_B2_84_ED_8C_80_3_EB_B2_88__EB_B3_B5_EC_A7_80_EB_A1_9C__EC_A0_95_EC_B1_85.xml',
      inqNum: '270896', intrsThemaArray: '문화·여가', jurMnofNm: '문화체육관광부', jurOrgNm: '문화정책과', lifeArray: '아동,청소년,청년,중장년,노년', onapPsbltYn: 'N', rprsCtadr: '1544-3412',
      servDgst: '기초생활수급자 및 차상위계층 대상 문화예술·국내 여행·체육 활동 지원을 통해 문화 향유 기회 확대로 문화격차 완화 및 소외계층의 삶의 질 향상을 도모합니다.',
      servDtlLink: 'https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000055&wlfareInfoReldBztpCd=01', servId: 'WLF00000055', servNm: '통합문화이용권', sprtCycNm: '년', srvPvsnNm: '전자바우처(바우처)', svcfrstRegTs: '20210903', trgterIndvdlArray: '장애인,저소득,한부모·조손',
    },
    {
      sourceFile: 'mockdatas/_ED_95_9C_EB_B2_84_ED_8C_80_4_EB_B2_88__EB_B3_B5_EC_A7_80_EB_A1_9C__EC_A0_95_EC_B1_85.xml',
      inqNum: '71853', intrsThemaArray: '생활지원,보호·돌봄', jurMnofNm: '보건복지부', jurOrgNm: '장애인서비스과', lifeArray: '영유아,아동,청소년', onapPsbltYn: 'Y', rprsCtadr: '129',
      servDgst: '장애아동 가족의 일상적인 돌봄 부담을 경감하고 보호자의 사회활동을 돕기 위하여 돌봄 및 일시적 휴식지원 서비스를 제공합니다.',
      servDtlLink: 'https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003262&wlfareInfoReldBztpCd=01', servId: 'WLF00003262', servNm: '아이돌봄서비스', displayNameFromIndex: '아이돌봄서비스', xmlServNm: '장애아가족양육지원', sourceConflict: true, sourceConflictNote: 'mockdatas/index.md 표기와 XML servNm 값 불일치', duplicateSourceFile: 'mockdatas/_ED_95_9C_EB_B2_84_ED_8C_80_4_EB_B2_88__EB_B3_B5_EC_A7_80_EB_A1_9C__EC_A0_95_EC_B1_85 (1).xml', sprtCycNm: '년', srvPvsnNm: '프로그램/서비스(서비스)', svcfrstRegTs: '20210903', trgterIndvdlArray: '장애인',
    },
  ],
  kimgatsaeng: [
    {
      sourceFile: 'mockdatas/_EA_B9_80_EA_B0_93_EC_83_9D_1_EB_B2_88__EB_B3_B5_EC_A7_80_EB_A1_9C__EC_A0_95_EC_B1_85.xml',
      inqNum: '1218', jurMnofNm: '고용노동부', jurOrgNm: '인적자원개발과', onapPsbltYn: 'N', rprsCtadr: '1350',
      servDgst: '급격한 기술발전에 적응하고 노동시장 변화에 대응하는 사회안전망 차원에서 생애에 걸친 역량개발 향상 등을 위해 국민 스스로 직업능력개발훈련을 실시할 수 있도록 훈련비 등을 지원합니다.',
      servDtlLink: 'https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00006229&wlfareInfoReldBztpCd=01', servId: 'WLF00006229', servNm: '국민내일배움카드제 직업훈련지원(훈련비, 훈련장려금)', sprtCycNm: '수시', srvPvsnNm: '전자바우처(바우처)', svcfrstRegTs: '20260316',
    },
    {
      sourceFile: 'mockdatas/_EA_B9_80_EA_B0_93_EC_83_9D_2_EB_B2_88__EB_B3_B5_EC_A7_80_EB_A1_9C__EC_A0_95_EC_B1_85.xml',
      inqNum: '11896875', intrsThemaArray: '주거', jurMnofNm: '국토교통부', jurOrgNm: '청년주거정책과', lifeArray: '청년', onapPsbltYn: 'Y', rprsCtadr: '1599-0001',
      servDgst: "고금리·고물가 등으로 경제적 어려움을 겪는 청년층의 주거비 부담 경감을 위해 월 최대20만원씩 최장 24개월간 월세를 지원합니다(생애1회). ※ '26년 신규 신청기간: 3.30(월) 09:00 ~ 5.29(금) 16:00까지",
      servDtlLink: 'https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004661&wlfareInfoReldBztpCd=01', servId: 'WLF00004661', servNm: '청년월세 지원사업', sprtCycNm: '월', srvPvsnNm: '현금지급', svcfrstRegTs: '20220413', trgterIndvdlArray: '저소득',
    },
    { sourceFile: 'mockdatas/index.md', servNm: '청년주택드림청약통장', note: '온통청년 확인 대상으로 문서에 명시' },
    { sourceFile: 'mockdatas/index.md', servNm: '청년내일저축계좌', note: '온통청년 확인 대상으로 문서에 명시' },
    { sourceFile: 'mockdatas/index.md', servNm: '청년 자산형성 지원(청년도약계좌)', note: '온통청년 확인 대상으로 문서에 명시' },
  ],
};

export const mockData = {
  sourceType: 'mockdatas-folder-pdf-backed',
  sourceManifest,
  personas,
  chatbotPersonas,
  policyCategories,
  welfarePolicies,
};
