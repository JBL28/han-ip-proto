import { Link } from 'react-router-dom';
import { AppCard } from './AppCard.jsx';

export function DetailHeroCard({ eyebrow, title, amountText, summary, imageSrc }) {
  return (
    <AppCard className="detail-hero-card">
      <div>
        <p className="ui-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <strong className="detail-amount ui-amount">{amountText}</strong>
        <p className="ui-body-muted">{summary}</p>
      </div>
      <span className="visual-tile detail-hero-visual"><img src={imageSrc} alt="" aria-hidden="true" /></span>
    </AppCard>
  );
}

export function DetailInfoSection({ section }) {
  return (
    <AppCard className="detail-section-card">
      <h2 className="ui-section-title">{section.title}</h2>
      <ul className="detail-check-list">
        {section.items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </AppCard>
  );
}

export function BottomActionCard({ personaId }) {
  return (
    <AppCard className="bottom-action-card">
      <strong className="ui-list-title">더 궁금한 점이 있나요?</strong>
      <p className="ui-body-muted">AI 챗봇이 지금 화면의 내용을 쉽게 풀어드릴게요.</p>
      <div className="action-row">
        <Link className="outline-cta ui-action" to={`/${personaId}/tax-saving`}>목록으로</Link>
        <Link className="blue-pill-cta ui-action" to={`/${personaId}/tax-chat`}>챗봇에게 물어보기</Link>
      </div>
    </AppCard>
  );
}
