// Split agents_carousel.html into 8 standalone slide HTMLs
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'agents_carousel.html'), 'utf8');

// Extract head (everything before <body>)
const headMatch = src.match(/<!DOCTYPE html>[\s\S]*?<head>([\s\S]*?)<\/head>/);
const headInner = headMatch[1];

// Extract each slide block
const slideRegex = /<div class="slide" id="s(\d+)">([\s\S]*?)<\/div>\s*<!-- =/g;
// Easier: find all <div class="slide" id="sN"> ... matching closing </div> for that slide
const slides = [];
const slideStartRegex = /<div class="slide" id="s(\d+)">/g;
let m;
const starts = [];
while ((m = slideStartRegex.exec(src)) !== null) {
  starts.push({ id: m[1], idx: m.index });
}

for (let i = 0; i < starts.length; i++) {
  const start = starts[i].idx;
  // find end: next slide start, or </body>
  const end = i + 1 < starts.length ? starts[i + 1].idx : src.indexOf('</body>');
  const block = src.substring(start, end).trimEnd();
  // strip ONLY trailing slide-section banner comments (=====...)
  const cleaned = block.replace(/<!--\s*=+[\s\S]*?=+\s*-->\s*$/g, '').trimEnd();
  slides.push({ id: starts[i].id, html: cleaned });
}

const outDir = path.join(__dirname, 'slides_html');
fs.mkdirSync(outDir, { recursive: true });

const wrapperCss = `
  html, body { margin: 0 !important; padding: 0 !important; background: #0d1117 !important; }
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

console.log('done: ' + slides.length + ' slides');
