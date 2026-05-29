/*
 * HOME PAGE DATA/LAYOUT CONTRACT
 *
 * HomePage는 메인 화면의 데이터 선택과 카드 배치만 담당한다.
 * - 페르소나별 콘텐츠는 getPersonaHomeData(personaId)에서 가져온다.
 * - 여기서 금액/추천/설명/일정 데이터를 임의 생성하지 않는다.
 * - 큰 카드 순서는 BenefitAlertCard -> KnowledgeBiteCard -> PolicyCalendarCard로 유지한다.
 * - 카드 간 바깥 여백은 .main2-page gap 하나로 통일한다. 개별 카드에 margin을 추가하지 않는다.
 * - 카드의 내부 구조/폰트/색상 규칙은 HomeCards.jsx의 HOME CARD IMPLEMENTATION CONTRACT를 따른다.
 *
 * Signup button component usage reference:
 * - 회원가입 하단 CTA는 src/components/SignupControls.jsx의 SignupActionBar를 사용한다.
 * - 단일 full-width 버튼: <SignupActionBar single primary={{ as: Link, to, onClick, children: '가입 완료하기' }} />
 * - 2버튼 split 액션(이전/다음, 시각상 약 3:7):
 *   <SignupActionBar secondary={{ as: Link, to, children: '이전' }} primary={{ as: Link, to, onClick, children: '다음' }} />
 * - 1:1 선택 버튼 그룹: <EqualButtonGroup label="..." options={[{ value, label, selected, onClick }, ...]} />
 * - 새 화면에서 같은 버튼 비율이 필요하면 새 CSS를 만들지 말고 위 컴포넌트를 import해 사용한다.
 */
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import glassesLensesImage from '../../assets/main/glasses-lenses.png';
import walletBellImage from '../../assets/main/wallet-bell.png';
import { getPersonaHomeData } from '../../data/personaMockData.js';
import { getRememberedPersonaId, pagePath } from '../../routes/routeConfig.js';
import { BenefitAlertCard, KnowledgeBiteCard, PolicyCalendarCard } from '../../components/HomeCards.jsx';

function monthForPersona(personaId) {
  return personaId === 'kimgatsaeng' ? new Date(2025, 11, 1) : new Date(2025, 4, 1);
}

export function HomePage() {
  const { personaId = getRememberedPersonaId() } = useParams();
  const homeData = getPersonaHomeData(personaId);
  const deductionDetailPath = pagePath(personaId, 'deduction-detail');
  const [selectedDate, setSelectedDate] = useState(monthForPersona(personaId));
  const calendarMonth = useMemo(() => monthForPersona(personaId), [personaId]);

  useEffect(() => {
    setSelectedDate(calendarMonth);
  }, [calendarMonth]);
  const modifiers = useMemo(() => ({}), []);

  return (
    <section className="main2-page" aria-label="메인 페이지">
      <BenefitAlertCard
        alert={homeData.alert}
        recommendations={homeData.recommendations}
        personaId={personaId}
        deductionDetailPath={deductionDetailPath}
        visualSrc={walletBellImage}
      />

      <KnowledgeBiteCard
        knowledge={homeData.knowledge}
        personaId={personaId}
        visualSrc={glassesLensesImage}
      />

      <PolicyCalendarCard
        calendar={homeData.calendar}
        personaId={personaId}
        month={calendarMonth}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        modifiers={modifiers}
      />
    </section>
  );
}
