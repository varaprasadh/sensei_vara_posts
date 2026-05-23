#!/usr/bin/env node
// Scan all *_series/ folders → publisher/queue.json.
// Series-by-series order. Preserves status of already-queued posts when rebuilding.
import fs from 'node:fs';
import { SERIES, listPosts, loadCaptions, slidesFor, QUEUE_PATH } from './lib.js';

const existing = fs.existsSync(QUEUE_PATH)
  ? JSON.parse(fs.readFileSync(QUEUE_PATH, 'utf8'))
  : { queue: [], last_published_at: null };
const prior = new Map(
  (existing.queue || []).map(item => [`${item.series}/${item.folder}`, item])
);

const queue = [];
const warnings = [];

for (const series of SERIES) {
  const captions = loadCaptions(series);
  const posts = listPosts(series);
  for (const { folder, n } of posts) {
    const cap = captions[n];
    const slides = slidesFor(series.name, folder);
    if (slides.length !== 8) {
      warnings.push(`${series.name}/${folder}: expected 8 slides, found ${slides.length}`);
      continue;
    }
    if (!cap) {
      warnings.push(`${series.name}/${folder}: no caption (entry "${n}" missing in captions.json) — skipped`);
      continue;
    }
    const key = `${series.name}/${folder}`;
    const previous = prior.get(key);
    const fullCaption = cap.tags ? `${cap.caption}\n\n${cap.tags}` : cap.caption;
    queue.push({
      series: series.name,
      folder,
      post_number: n,
      slides,
      caption: fullCaption,
      status: previous?.status || 'pending',
      published_at: previous?.published_at || null,
      media_id: previous?.media_id || null,
    });
  }
}

const out = {
  generated_at: new Date().toISOString(),
  last_published_at: existing.last_published_at || null,
  queue,
};
fs.writeFileSync(QUEUE_PATH, JSON.stringify(out, null, 2) + '\n');

console.log(`wrote ${queue.length} posts to ${QUEUE_PATH}`);
const pending = queue.filter(q => q.status === 'pending').length;
const published = queue.filter(q => q.status === 'published').length;
console.log(`  pending: ${pending}, published: ${published}`);
if (warnings.length) {
  console.log('\nwarnings:');
  for (const w of warnings) console.log(`  - ${w}`);
}
