import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import aiAvatar from '../../assets/tax-chat/ai-chat-avatar.svg';
import { AppCard } from '../../components/AppCard.jsx';
import { getRememberedPersonaId, pagePath } from '../../routes/routeConfig.js';

const tabs = [
  { id: 'all', label: '전체', count: 7 },
  { id: 'benefit', label: '혜택 알림', count: 3 },
  { id: 'status', label: '신청/처리 현황', count: 2 },
  { id: 'general', label: '일반 알림', count: 2 },
];

const benefitAlerts = [
  {
    id: 'child-care-tax',
    badge: 'NEW',
    visual: '🏫',
    title: '유치원 결제 내역이 있네요!',
    emoji: '👶',
    description: '양육 · 보육 관련 절세 혜택을 분석해드릴게요.',
    time: '10분 전',
    cta: '혜택 분석하기',
    tone: 'green',
    toPage: 'deduction-detail',
    detailId: 'preschool-education-credit',
    source: 'wireframes/알림.png; mockdatas/index.md > 한버팀 > 절세추천 > 취학 전 아동 학원비/체육시설 수강료 세액공제',
  },
  {
    id: 'car-tax',
    badge: 'NEW',
    visual: '🚙',
    title: '차를 구매하셨나요?',
    emoji: '🚗',
    description: '자동차 관련 절세 혜택을 분석해드릴게요.',
    time: '1시간 전',
    cta: '혜택 분석하기',
    tone: 'blue',
    toPage: 'deduction-detail',
    detailId: 'card-spend-strategy',
    source: 'wireframes/알림.png',
  },
];

const statusAlerts = [
  {
    id: 'earned-credit-done',
    visual: '🎁',
    status: '신청 완료',
    title: '근로장려금 신청이 완료되었습니다.',
    date: '2024.05.01 신청',
    result: '접수완료',
    tone: 'red',
    toPage: 'deduction-detail',
    detailId: 'earned-child-credit',
    source: 'wireframes/알림.png; mockdatas/index.md > 한버팀 > 알림 > 근로장려금',
  },
  {
    id: 'single-parent-review',
    visual: '📄',
    status: '심사 중',
    title: '한부모 가족 지원금 심사 중입니다.',
    date: '2024.05.01 신청',
    result: '심사중',
    tone: 'green',
    toPage: 'policy-detail',
    detailId: 'child-care-service',
    source: 'wireframes/알림.png; mockdatas/index.md > 한버팀 > 알림 > 한부모가족 아동양육비',
  },
];

const generalAlerts = [
  { id: 'regular-update', icon: '🔔', text: '2024년 5월 정기 업데이트가 완료되었습니다.', time: '1일 전' },
  { id: 'chat-ready', icon: '💬', text: 'AI 챗봇과의 새로운 대화가 준비되어 있어요!', time: '2일 전' },
  { id: 'tax-deadline', icon: '📣', text: '종합소득세 신고 기간이 한 달 남았어요.', time: '3일 전' },
  { id: 'card-report', icon: '💳', text: '카드 사용 내역 분석 리포트가 도착했어요.', time: '05.03' },
];

function visibleSections(active) {
  return {
    benefit: active === 'all' || active === 'benefit',
    status: active === 'all' || active === 'status',
    general: active === 'all' || active === 'general',
  };
}

export function NotificationsPage() {
  const { personaId = getRememberedPersonaId() } = useParams();
  const [active, setActive] = useState('all');
  const sections = useMemo(() => visibleSections(active), [active]);

  return (
    <section className="notifications-page" aria-label="알림">
      <header className="notifications-page-head">
        <h1>알림</h1>
      </header>

      <nav className="notifications-tabs" aria-label="알림 필터">
        {tabs.map((tab) => (
          <button className="notifications-tab" type="button" aria-pressed={active === tab.id} onClick={() => setActive(tab.id)} key={tab.id}>
            <span>{tab.label}</span>
            <b>{tab.count}</b>
          </button>
        ))}
      </nav>

      {sections.benefit && (
        <NotificationSection title="혜택 추천 알림">
          {benefitAlerts.map((item) => (
            <BenefitNotificationCard item={item} personaId={personaId} key={item.id} />
          ))}
        </NotificationSection>
      )}

      {sections.status && (
        <NotificationSection title="신청/처리 현황">
          <AppCard className="notification-status-group">
            {statusAlerts.map((item) => (
              <StatusNotificationRow item={item} personaId={personaId} key={item.id} />
            ))}
          </AppCard>
        </NotificationSection>
      )}

      {sections.general && (
        <NotificationSection title="일반 알림">
          <AppCard className="notification-general-group">
            {generalAlerts.map((item) => (
              <GeneralNotificationRow item={item} key={item.id} />
            ))}
          </AppCard>
        </NotificationSection>
      )}

      <AppCard className="notification-chat-cta">
        <img src={aiAvatar} alt="" aria-hidden="true" />
        <div>
          <strong>더 궁금한 내용이 있으신가요?</strong>
          <p>AI 챗봇에게 질문하고 맞춤 혜택을 찾아보세요!</p>
        </div>
        <Link className="outline-cta ui-action" to={pagePath(personaId, 'tax-chat')}>AI 챗봇 바로가기 ›</Link>
      </AppCard>
    </section>
  );
}

function NotificationSection({ title, children }) {
  return (
    <section className="notification-section" aria-label={title}>
      <div className="notification-section-head">
        <h2>{title}</h2>
        <button type="button">전체보기 ›</button>
      </div>
      <div className="notification-section-body">{children}</div>
    </section>
  );
}

function BenefitNotificationCard({ item, personaId }) {
  return (
    <AppCard as={Link} to={pagePath(personaId, item.toPage, item.detailId)} className={`notification-benefit-card notification-benefit-card--${item.tone}`} title={item.source}>
      <span className="notification-new-badge">{item.badge}</span>
      <div className="notification-benefit-copy">
        <strong>{item.title} <span>{item.emoji}</span></strong>
        <p>{item.description}</p>
      </div>
      <span className="notification-benefit-time">{item.time}</span>
      <span className="notification-benefit-cta">{item.cta}<span aria-hidden="true">›</span></span>
      <span className="notification-dismiss" aria-hidden="true">×</span>
    </AppCard>
  );
}

function StatusNotificationRow({ item, personaId }) {
  return (
    <Link className="notification-status-row" to={pagePath(personaId, item.toPage, item.detailId)} title={item.source}>
      <span className="notification-status-copy">
        <em className={`notification-status-badge notification-status-badge--${item.tone}`}>{item.status}</em>
        <strong>{item.title}</strong>
        <small>{item.date}</small>
      </span>
      <b className={`notification-status-result notification-status-result--${item.tone}`}>{item.result}</b>
      <span className="card-arrow" aria-hidden="true">›</span>
    </Link>
  );
}

function GeneralNotificationRow({ item }) {
  return (
    <button className="notification-general-row" type="button">
      <strong>{item.text}</strong>
      <time>{item.time}</time>
      <span className="card-arrow" aria-hidden="true">›</span>
    </button>
  );
}
