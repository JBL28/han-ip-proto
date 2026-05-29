import { useParams } from 'react-router-dom';
import profileHanbeoteam from '../../assets/my/profile-hanbeoteam.svg';
import profileKimgatsaeng from '../../assets/my/profile-kimgatsaeng.svg';
import { BenefitTotalCard, MyMenuList, MyProfileCard } from '../../components/MyPageCards.jsx';
import { getMyPageData } from '../../data/screenData.js';
import { getPersona, getRememberedPersonaId } from '../../routes/routeConfig.js';

const profileImages = { hanbeoteam: profileHanbeoteam, kimgatsaeng: profileKimgatsaeng };

export function MyPage() {
  const { personaId = getRememberedPersonaId() } = useParams();
  const persona = getPersona(personaId);
  const data = getMyPageData(personaId);
  return (
    <section className="screen-page my-page" aria-label="마이페이지">
      <header className="screen-heading"><h1>마이페이지</h1><p>내 혜택과 설정을 한눈에 확인해요</p></header>
      <MyProfileCard persona={persona} imageSrc={profileImages[personaId]} />
      <BenefitTotalCard data={data} />
      <MyMenuList personaId={personaId} />
    </section>
  );
}
