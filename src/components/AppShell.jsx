import { useLayoutEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';

const tabs = [
  { page: 'home', label: '홈' },
  { page: 'tax-saving', label: '절세' },
  { page: 'tax-chat', label: '챗봇', logo: true },
  { page: 'policies', label: '정책' },
  { page: 'my', label: '마이' },
];

const aliases = {
  signup: 'home',
  'deduction-detail': 'tax-saving',
  'policy-detail': 'policies',
  notifications: 'my',
  persona: 'my',
};

const icons = {
  home: <svg className="nav-lucide" viewBox="0 0 24 24" aria-hidden="true"><path d="m3 10.5 9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></svg>,
  'tax-saving': <svg className="nav-lucide" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m15 9-6 6"/><path d="M9.5 9.5h.01"/><path d="M14.5 14.5h.01"/></svg>,
  policies: <svg className="nav-lucide" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4h8"/><path d="M9 2h6v4H9z"/><path d="M7 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2"/><path d="M8 12h8"/><path d="M8 16h6"/></svg>,
  my: <svg className="nav-lucide" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>,
};

export function AppShell({ variant, page, children, signup = false }) {
  const active = aliases[page] || page;

  useLayoutEffect(() => {
    document.body.dataset.theme = variant;
    const root = document.getElementById('root');
    if (root) {
      root.className = `app-shell page-enter${signup ? ' app-shell--signup' : ''}`;
      root.dataset.theme = variant;
    }
  }, [variant, signup]);

  return (
    <>
      {!signup && (
        <header className="app-header">
          <div className="header-center" aria-label="한입">
            <img className="header-logo" src={logo} alt="" />
            <span className="header-title">한입</span>
          </div>
          <NavLink className="header-notification" to={`/${variant}/notifications`} aria-label="알림 페이지로 이동">
            <svg className="header-lucide" viewBox="0 0 24 24" aria-hidden="true"><path d="M10.3 21a2 2 0 0 0 3.4 0"/><path d="M18 8a6 6 0 0 0-12 0c0 7-3 8-3 8h18s-3-1-3-8"/></svg>
          </NavLink>
        </header>
      )}

      <main className={`app-content${signup ? ' app-content--signup' : ''}`}>{children}</main>

      {!signup && (
        <nav className="bottom-nav" aria-label="하단 내비게이션">
          <div className="bottom-nav-panel">
            <ul className="bottom-nav-list">
              {tabs.map((tab) => (
                <li className="bottom-nav-item" key={tab.page}>
                  <NavLink className={`bottom-nav-link${tab.logo ? ' bottom-nav-link--logo' : ''}`} to={`/${variant}/${tab.page}`} aria-current={active === tab.page ? 'page' : undefined}>
                    <span className={`bottom-nav-icon${tab.logo ? ' bottom-nav-icon--logo' : ''}`}>{tab.logo ? <img className="bottom-nav-logo" src={logo} alt="" /> : icons[tab.page]}</span>
                    <span className="bottom-nav-label">{tab.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="bottom-nav-divider" aria-hidden="true" />
          </div>
        </nav>
      )}
    </>
  );
}
