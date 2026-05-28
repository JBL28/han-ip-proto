import { access } from 'node:fs/promises';
import { renderers } from '../src/renderers/pages.js';
import { variants } from '../src/data/pages.js';

const pages = ['signup', 'home', 'tax-saving', 'tax-chat', 'deduction-detail', 'policies', 'policy-detail', 'notifications', 'my', 'persona'];
const variantKeys = Object.keys(variants);
const failures = [];

for (const variant of variantKeys) {
  for (const page of pages) {
    const file = `${variant}/${page}/index.html`;
    try {
      await access(file);
    } catch {
      failures.push(`missing route file: ${file}`);
    }
    const html = renderers[page]?.(variant);
    if (!html || html.length < 200) failures.push(`empty render: ${variant}/${page}`);
    if (html.includes('undefined')) failures.push(`undefined text: ${variant}/${page}`);
  }
}

for (const file of ['index.html', 'src/styles/global.css', 'src/app.js', 'src/data/pages.js', 'docs/mock-api.md']) {
  try { await access(file); } catch { failures.push(`missing file: ${file}`); }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`validated ${variantKeys.length * pages.length} route pages`);
