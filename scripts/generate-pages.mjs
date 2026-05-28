import { mkdir, writeFile } from 'node:fs/promises';

const variants = ['a', 'b', 'c'];
const pages = ['signup', 'home', 'tax-saving', 'tax-chat', 'deduction-detail', 'policies', 'policy-detail', 'notifications', 'my', 'persona'];

const html = (variant, page) => `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <title>한입 ${variant.toUpperCase()} · ${page}</title>
    <link rel="stylesheet" href="../../src/styles/global.css" />
  </head>
  <body data-theme="${variant}">
    <main id="app" data-variant="${variant}" data-page="${page}" aria-live="polite"></main>
    <script type="module" src="../../src/app.js"></script>
  </body>
</html>
`;

for (const variant of variants) {
  for (const page of pages) {
    await mkdir(`${variant}/${page}`, { recursive: true });
    await writeFile(`${variant}/${page}/index.html`, html(variant, page));
  }
}
