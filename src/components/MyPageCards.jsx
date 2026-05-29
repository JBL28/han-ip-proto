import { Link } from 'react-router-dom';
import { AppCard } from './AppCard.jsx';

export function MyProfileCard({ persona, imageSrc }) {
  return (
    <AppCard className="my-profile-card">
      <span className="visual-tile my-profile-card__visual"><img src={imageSrc} alt="" aria-hidden="true" /></span>
      <div>
        <p className="ui-eyebrow">내 정보</p>
        <h1>{persona.name}</h1>
        <p className="ui-body-muted">{persona.description}</p>
        <p className="ui-caption">{persona.summary}</p>
      </div>
    </AppCard>
  );
}

export function BenefitTotalCard({ data }) {
  return (
    <AppCard className="benefit-total-card" title={data.source}>
      <span className="ui-label-sm">지금까지 받은 혜택 금액</span>
      <strong className="ui-amount">{data.amount}</strong>
      <p className="ui-body-muted">{data.description}</p>
      <p className="ui-caption">{data.detail}</p>
    </AppCard>
  );
}

export function MyMenuList({ personaId }) {
  const items = [
    { label: '스크랩한 정책', to: `/${personaId}/policies` },
    { label: 'AI 페르소나 변경', to: `/${personaId}/persona` },
    { label: '알림', to: `/${personaId}/notifications` },
    { label: '개인정보 관리', to: `/${personaId}/my`, muted: true },
    { label: '고객센터', to: `/${personaId}/my`, muted: true },
    { label: '로그아웃', to: '/', muted: true },
  ];
  return (
    <AppCard className="my-menu-card">
      {items.map((item) => (
        <Link className={`my-menu-row${item.muted ? ' is-muted' : ''}`} to={item.to} key={item.label}>
          <span>{item.label}</span><b aria-hidden="true">›</b>
        </Link>
      ))}
    </AppCard>
  );
}
