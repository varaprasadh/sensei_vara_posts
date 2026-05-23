// Shared helpers: series discovery, caption parsing, IG Graph API.
import fs from 'node:fs';
import path from 'node:path';

export const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
export const QUEUE_PATH = path.join(ROOT, 'publisher', 'queue.json');
export const GRAPH = 'https://graph.facebook.com/v25.0';

// Each series declares how to find its post folders. Captions live in
// <series>/captions.json (see schema in convert_captions.js).
// Dropping a new "<name>_series/" with post_N/ folders + captions.json is enough.
export const SERIES = [
  { name: 'ai_series',   folderPrefix: 'post_' },
  { name: 'git_series',  folderPrefix: 'post_' },
  { name: 'db_series',   folderPrefix: 'post_' },
  { name: 'node_series', folderPrefix: 'post_' },
];

// Variant chosen for publishing. Falls through in order if missing.
export const VARIANT_PRIORITY = ['mystery_hook', 'direct_value', 'short_punchy'];

export function listPosts(series) {
  const dir = path.join(ROOT, series.name);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.startsWith(series.folderPrefix))
    .map(folder => {
      const n = Number(folder.slice(series.folderPrefix.length));
      return Number.isFinite(n) ? { folder, n } : null;
    })
    .filter(Boolean)
    .sort((a, b) => a.n - b.n);
}

// Load <series>/captions.json → { [postNumber]: { caption, tags } }.
// Picks first non-empty variant in VARIANT_PRIORITY order.
export function loadCaptions(series) {
  const file = path.join(ROOT, series.name, 'captions.json');
  if (!fs.existsSync(file)) return {};
  const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
  const out = {};
  for (const [n, entry] of Object.entries(raw)) {
    let caption = '';
    for (const key of VARIANT_PRIORITY) {
      const v = entry.variants?.[key];
      if (v && v.trim()) { caption = v.trim(); break; }
    }
    if (!caption) continue;
    const tags = Array.isArray(entry.tags) ? entry.tags.join(' ') : '';
    out[n] = { caption, tags };
  }
  return out;
}

export function buildSlideUrl({ repo, branch, series, folder, slide }) {
  return `https://raw.githubusercontent.com/${repo}/${branch}/${series}/${folder}/slides_png/${slide}`;
}

export function slidesFor(series, folder) {
  const dir = path.join(ROOT, series, folder, 'slides_png');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => /^slide_\d+\.png$/.test(f)).sort();
}

// IG Graph API ------------------------------------------------------------

async function ig(method, urlPath, params, token) {
  const url = new URL(`${GRAPH}${urlPath}`);
  const body = new URLSearchParams();
  for (const [k, v] of Object.entries(params || {})) body.append(k, v);
  body.append('access_token', token);
  const res = await fetch(url, { method, body });
  const json = await res.json();
  if (!res.ok || json.error) {
    throw new Error(`IG ${method} ${urlPath}: ${JSON.stringify(json)}`);
  }
  return json;
}

export async function createImageContainer({ igUserId, imageUrl, token }) {
  return ig('POST', `/${igUserId}/media`, {
    image_url: imageUrl,
    is_carousel_item: 'true',
  }, token);
}

export async function createCarouselContainer({ igUserId, children, caption, token }) {
  return ig('POST', `/${igUserId}/media`, {
    media_type: 'CAROUSEL',
    children: children.join(','),
    caption,
  }, token);
}

export async function pollContainerStatus({ containerId, token, timeoutMs = 120000 }) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const res = await fetch(`${GRAPH}/${containerId}?fields=status_code&access_token=${token}`);
    const json = await res.json();
    if (json.status_code === 'FINISHED') return;
    if (json.status_code === 'ERROR' || json.status_code === 'EXPIRED') {
      throw new Error(`container ${containerId} ended in ${json.status_code}`);
    }
    await new Promise(r => setTimeout(r, 3000));
  }
  throw new Error(`container ${containerId} did not finish within ${timeoutMs}ms`);
}

export async function publishContainer({ igUserId, containerId, token }) {
  return ig('POST', `/${igUserId}/media_publish`, { creation_id: containerId }, token);
}

export function loadQueue() {
  return JSON.parse(fs.readFileSync(QUEUE_PATH, 'utf8'));
}

export function saveQueue(q) {
  fs.writeFileSync(QUEUE_PATH, JSON.stringify(q, null, 2) + '\n');
}
