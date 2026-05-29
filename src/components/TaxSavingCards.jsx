import { Link } from 'react-router-dom';
import { AppCard } from './AppCard.jsx';

export function TaxSavingBenefitCard({ item, imageSrc, to }) {
  return (
    <AppCard as={Link} to={to} className="tax-saving-card" aria-label={`${item.title} ${item.amount} ${item.tag} 상세보기`} title={item.source}>
      <span className="visual-tile tax-saving-card__visual"><img src={imageSrc} alt="" aria-hidden="true" /></span>
      <strong className="ui-chip-title tax-saving-card__title">{item.title}</strong>
      <span className="ui-amount tax-saving-card__amount">{item.amount}</span>
      <span className="tax-saving-card__tag ui-caption">{item.tag}</span>
      <span className="card-arrow" aria-hidden="true">›</span>
    </AppCard>
  );
}

export function TaxSavingSupportBanner({ banner, imageSrc, to }) {
  return (
    <AppCard className="tax-saving-banner">
      <div className="tax-saving-banner__copy">
        <p className="ui-eyebrow">{banner.title}</p>
        <strong className="ui-knowledge-title">{banner.lines[0]}<br />{banner.lines[1]}</strong>
        <Link className="blue-pill-cta ui-action" to={to}>{banner.ctaLabel}</Link>
      </div>
      <span className="visual-tile tax-saving-banner__visual"><img src={imageSrc} alt="" aria-hidden="true" /></span>
    </AppCard>
  );
}
