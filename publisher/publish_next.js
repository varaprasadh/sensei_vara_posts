#!/usr/bin/env node
// Publish next pending post to Instagram as a carousel.
// Env: IG_ACCESS_TOKEN, IG_USER_ID, GITHUB_REPOSITORY (owner/repo), IMAGE_BRANCH (default: main)
// Optional: DRY_RUN=1 — print payload only, no API calls.
import {
  loadQueue, saveQueue,
  createImageContainer, createCarouselContainer,
  pollContainerStatus, publishContainer,
  buildSlideUrl,
} from './lib.js';

const REQUIRED = ['IG_ACCESS_TOKEN', 'IG_USER_ID', 'GITHUB_REPOSITORY'];
for (const k of REQUIRED) {
  if (!process.env[k]) { console.error(`missing env: ${k}`); process.exit(1); }
}
const token = process.env.IG_ACCESS_TOKEN;
const igUserId = process.env.IG_USER_ID;
const repo = process.env.GITHUB_REPOSITORY;
const branch = process.env.IMAGE_BRANCH || 'main';
const dryRun = process.env.DRY_RUN === '1';

const q = loadQueue();
const next = q.queue.find(p => p.status === 'pending');
if (!next) {
  console.log('no pending posts — queue exhausted');
  process.exit(0);
}

console.log(`publishing ${next.series}/${next.folder} (post ${next.post_number})`);

const urls = next.slides.map(slide =>
  buildSlideUrl({ repo, branch, series: next.series, folder: next.folder, slide })
);
console.log(`  ${urls.length} image URLs:`);
for (const u of urls) console.log(`    ${u}`);

if (dryRun) {
  console.log('\n--- DRY RUN — caption ---');
  console.log(next.caption);
  process.exit(0);
}

// 1. create one container per image
const childIds = [];
for (const url of urls) {
  const res = await createImageContainer({ igUserId, imageUrl: url, token });
  console.log(`  child container: ${res.id}`);
  childIds.push(res.id);
}

// 2. create carousel container
const carousel = await createCarouselContainer({
  igUserId,
  children: childIds,
  caption: next.caption,
  token,
});
console.log(`  carousel container: ${carousel.id}`);

// 3. poll until carousel container is FINISHED (children should also be ready)
await pollContainerStatus({ containerId: carousel.id, token });

// 4. publish
const published = await publishContainer({ igUserId, containerId: carousel.id, token });
console.log(`  published media id: ${published.id}`);

// 5. update state
next.status = 'published';
next.published_at = new Date().toISOString();
next.media_id = published.id;
q.last_published_at = next.published_at;
saveQueue(q);

console.log('done');
