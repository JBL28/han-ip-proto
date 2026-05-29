import { Link } from 'react-router-dom';
import { AppCard } from './AppCard.jsx';

export function NotificationFilterTabs({ active, onChange }) {
  const tabs = [
    { id: 'all', label: '전체' },
    { id: 'recommendation', label: '혜택 추천' },
    { id: 'status', label: '신청/처리 현황' },
  ];
  return (
    <div className="filter-tabs" role="tablist" aria-label="알림 필터">
      {tabs.map((tab) => <button key={tab.id} type="button" role="tab" aria-selected={active === tab.id} onClick={() => onChange(tab.id)}>{tab.label}</button>)}
    </div>
  );
}

export function NotificationItemCard({ item, to, read, onRead }) {
  return (
    <AppCard as={Link} to={to} className={`notification-card${read ? ' is-read' : ''}`} onClick={onRead} title={item.source}>
      <span className={`notification-dot notification-dot--${item.category}`} aria-hidden="true" />
      <div>
        <span className="notification-type ui-caption">{item.category === 'recommendation' ? '혜택 추천' : '신청/처리 현황'}</span>
        <p className="ui-body-muted">{item.text}</p>
      </div>
      <span className="card-arrow" aria-hidden="true">›</span>
    </AppCard>
  );
}
