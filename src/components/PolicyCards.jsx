import { Link } from 'react-router-dom';
import { AppCard } from './AppCard.jsx';

export function PolicyFilterChip({ label, selected, onClick }) {
  return <button className="filter-chip ui-action" type="button" aria-pressed={selected} onClick={onClick}>{label}</button>;
}

export function PolicyRecommendationCard({ policy, imageSrc, to }) {
  return (
    <AppCard as={Link} to={to} className="policy-card" aria-label={`${policy.title} 정책 상세보기`} title={policy.source}>
      <span className="visual-tile policy-card__visual"><img src={imageSrc} alt="" aria-hidden="true" /></span>
      <div className="policy-card__body">
        <strong className="ui-list-title">{policy.title}</strong>
        <p className="ui-body-muted">{policy.description}</p>
        <div className="mini-chip-row">
          <span className="mini-chip">{policy.cycle}</span>
          <span className="mini-chip">{policy.provision}</span>
          <span className="mini-chip">온라인 {policy.online === 'Y' ? '가능' : '확인 필요'}</span>
        </div>
      </div>
      <span className="card-arrow" aria-hidden="true">›</span>
    </AppCard>
  );
}

export function PolicyDetailHero({ policy, imageSrc }) {
  return (
    <AppCard className="detail-hero-card policy-detail-hero">
      <div>
        <p className="ui-eyebrow">정책 상세보기</p>
        <h1>{policy.title}</h1>
        <p className="ui-body-muted">{policy.description}</p>
        {policy.note && <p className="detail-note ui-caption">{policy.note}</p>}
      </div>
      <span className="visual-tile detail-hero-visual"><img src={imageSrc} alt="" aria-hidden="true" /></span>
    </AppCard>
  );
}

export function PolicyFieldList({ title, fields }) {
  return (
    <AppCard className="detail-section-card">
      <h2 className="ui-section-title">{title}</h2>
      <dl className="field-list">
        {fields.filter((field) => field.value).map((field) => (
          <div className="field-row" key={field.label}>
            <dt>{field.label}</dt>
            <dd>{field.value}</dd>
          </div>
        ))}
      </dl>
    </AppCard>
  );
}
