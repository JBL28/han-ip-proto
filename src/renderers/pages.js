import { pages } from '../data/pages.js';

const logoSrc = '/src/assets/logo.png';

const icons = {
  home: '<svg class="nav-lucide" viewBox="0 0 24 24" aria-hidden="true"><path d="m3 10.5 9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></svg>',
  tax: '<svg class="nav-lucide" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m15 9-6 6"/><path d="M9.5 9.5h.01"/><path d="M14.5 14.5h.01"/></svg>',
  policies: '<svg class="nav-lucide" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4h8"/><path d="M9 2h6v4H9z"/><path d="M7 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2"/><path d="M8 12h8"/><path d="M8 16h6"/></svg>',
  my: '<svg class="nav-lucide" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  bell: '<svg class="header-lucide" viewBox="0 0 24 24" aria-hidden="true"><path d="M10.3 21a2 2 0 0 0 3.4 0"/><path d="M18 8a6 6 0 0 0-12 0c0 7-3 8-3 8h18s-3-1-3-8"/></svg>',
};

const bottomTabs = [
  { page: 'home', label: '홈', icon: icons.home },
  { page: 'tax-saving', label: '절세', icon: icons.tax },
  { page: 'tax-chat', label: '챗봇', logo: true },
  { page: 'policies', label: '정책', icon: icons.policies },
  { page: 'my', label: '마이', icon: icons.my },
];

const pageAliases = {
  signup: 'home',
  'deduction-detail': 'tax-saving',
  'policy-detail': 'policies',
  notifications: 'my',
  persona: 'my',
};

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function href(variant, page) {
  return `/${variant}/${page}/`;
}

function header(variant) {
  return `<header class="app-header">
    <div class="header-center" aria-label="한입">
      <img class="header-logo" src="${logoSrc}" alt="" />
      <span class="header-title">한입</span>
    </div>
    <a class="header-notification" href="${href(variant, 'notifications')}" aria-label="알림 페이지로 이동">${icons.bell}</a>
  </header>`;
}

function bottomIcon(tab) {
  if (tab.logo) return `<img class="bottom-nav-logo" src="${logoSrc}" alt="" />`;
  return tab.icon;
}

function bottomNav(variant, page) {
  const active = pageAliases[page] || page;
  return `<nav class="bottom-nav" aria-label="하단 내비게이션">
    <div class="bottom-nav-panel">
      <ul class="bottom-nav-list">
        ${bottomTabs.map((tab) => `<li class="bottom-nav-item">
          <a class="bottom-nav-link${tab.logo ? ' bottom-nav-link--logo' : ''}" href="${href(variant, tab.page)}" ${active === tab.page ? 'aria-current="page"' : ''}>
            <span class="bottom-nav-icon${tab.logo ? ' bottom-nav-icon--logo' : ''}">${bottomIcon(tab)}</span>
            <span class="bottom-nav-label">${escapeHtml(tab.label)}</span>
          </a>
        </li>`).join('')}
      </ul>
      <div class="bottom-nav-divider" aria-hidden="true"></div>
    </div>
  </nav>`;
}

function renderFrame(variant, page) {
  return `
    ${header(variant)}
    <section class="app-main-placeholder" aria-label="${escapeHtml(pages[page]?.title || '본문')}"></section>
    ${bottomNav(variant, page)}
  `;
}

export const renderers = Object.fromEntries(
  Object.keys(pages).map((page) => [page, (variant) => renderFrame(variant, page)]),
);
