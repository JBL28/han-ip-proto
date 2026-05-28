import { renderers } from './renderers/pages.js';
import { variants } from './data/pages.js';

const root = document.querySelector('#app');
const variant = root?.dataset.variant;
const page = root?.dataset.page;

if (!root || !variants[variant] || !renderers[page]) {
  document.body.innerHTML = '<main class="app-shell"><h1>페이지를 찾을 수 없어요</h1><p class="body-muted">A/B/C 프로토타입 라우트를 확인해주세요.</p></main>';
} else {
  root.className = 'app-shell page-enter';
  root.innerHTML = renderers[page](variant);
}
