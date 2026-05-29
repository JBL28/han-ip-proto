import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NotificationFilterTabs, NotificationItemCard } from '../../components/NotificationCards.jsx';
import { getNotifications } from '../../data/screenData.js';
import { getRememberedPersonaId, pagePath } from '../../routes/routeConfig.js';

export function NotificationsPage() {
  const { personaId = getRememberedPersonaId() } = useParams();
  const [active, setActive] = useState('all');
  const [readIds, setReadIds] = useState([]);
  const notifications = getNotifications(personaId);
  const visible = useMemo(() => active === 'all' ? notifications : notifications.filter((item) => item.category === active), [active, notifications]);

  return (
    <section className="screen-page notifications-page" aria-label="알림">
      <header className="screen-heading"><h1>알림</h1><p>놓치기 쉬운 혜택과 처리 현황을 확인해보세요</p></header>
      <NotificationFilterTabs active={active} onChange={setActive} />
      <div className="notification-list">
        {visible.map((item) => <NotificationItemCard key={item.id} item={item} to={pagePath(personaId, item.toPage)} read={readIds.includes(item.id)} onRead={() => setReadIds((ids) => [...new Set([...ids, item.id])])} />)}
      </div>
    </section>
  );
}
