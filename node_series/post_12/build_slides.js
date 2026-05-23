// Split the post HTML into 8 standalone slide HTMLs
const fs = require('fs');
const path = require('path');

const srcFile = fs.readdirSync(__dirname).find(f => /^post\d+_.*\.html$/.test(f));
if (!srcFile) {
  console.error('no postN_*.html file found in', __dirname);
  process.exit(1);
}
const src = fs.readFileSync(path.join(__dirname, srcFile), 'utf8');

const headMatch = src.match(/<!DOCTYPE html>[\s\S]*?<head>([\s\S]*?)<\/head>/);
const headInner = headMatch[1];

const slideStartRegex = /<div class="slide" id="s(\d+)">/g;
const starts = [];
let m;
while ((m = slideStartRegex.exec(src)) !== null) {
  starts.push({ id: m[1], idx: m.index });
}

const slides = [];
for (let i = 0; i < starts.length; i++) {
  const start = starts[i].idx;
  const end = i + 1 < starts.length ? starts[i + 1].idx : src.indexOf('</body>');
  const block = src.substring(start, end).trimEnd();
  const cleaned = block.replace(/<!--\s*=+[\s\S]*?=+\s*-->\s*$/g, '').trimEnd();
  slides.push({ id: starts[i].id, html: cleaned });
}

const outDir = path.join(__dirname, 'slides_html');
fs.mkdirSync(outDir, { recursive: true });

const wrapperCss = `
  html, body { margin: 0 !important; padding: 0 !important; background: #0a0e14 !important; }
  body { display: block !important; gap: 0 !important; }
  .slide { border-radius: 0 !important; box-shadow: none !important; margin: 0 !important; }
`;

slides.forEach(s => {
  const num = String(s.id).padStart(2, '0');
  const out = `<!DOCTYPE html>
<html lang="en">
<head>
${headInner}
<style>${wrapperCss}</style>
</head>
<body>
${s.html}
</body>
</html>`;
  fs.writeFileSync(path.join(outDir, `slide_${num}.html`), out);
  console.log('wrote slide_' + num + '.html');
});

console.log('done: ' + slides.length + ' slides from ' + srcFile);
