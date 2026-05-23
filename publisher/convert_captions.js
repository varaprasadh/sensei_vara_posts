#!/usr/bin/env node
// One-shot: parse each series' CAPTIONS.md → captions.json.
// After running, captions.json becomes the source of truth; CAPTIONS.md is kept
// only as a human-readable mirror (can be deleted if desired).
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib.js';

const VARIANTS = [
  ['Mystery hook', 'mystery_hook'],
  ['Direct value', 'direct_value'],
  ['Short & punchy', 'short_punchy'],
];

// Heading conventions per series — only needed for this one-shot MD → JSON migration.
const MD_SERIES = [
  { name: 'ai_series',   captionHeading: /^##\s+Post\s+(\d+)\b/ },
  { name: 'git_series',  captionHeading: /^##\s+P\s*(\d+)\b/ },
  { name: 'db_series',   captionHeading: /^##\s+P\s*(\d+)\b/ },
  { name: 'node_series', captionHeading: /^##\s+P\s*(\d+)\b/ },
];

for (const series of MD_SERIES) {
  const mdPath = path.join(ROOT, series.name, 'CAPTIONS.md');
  if (!fs.existsSync(mdPath)) {
    console.log(`${series.name}: no CAPTIONS.md, skipping`);
    continue;
  }
  const lines = fs.readFileSync(mdPath, 'utf8').split('\n');
  const sections = {};
  let current = null;
  for (const line of lines) {
    const m = line.match(series.captionHeading);
    if (m) {
      const title = line.replace(series.captionHeading, '').replace(/^\s*[—-]\s*/, '').trim();
      current = { n: Number(m[1]), title, body: [] };
      sections[current.n] = current;
      continue;
    }
    if (current) current.body.push(line);
  }

  const out = {};
  for (const [n, s] of Object.entries(sections)) {
    const text = s.body.join('\n');
    const variants = {};
    for (const [label, key] of VARIANTS) {
      const re = new RegExp(`\\*\\*${label}\\*\\*\\n([\\s\\S]*?)(?=\\n\\*\\*|\\n##|$)`);
      const mm = text.match(re);
      const body = mm ? mm[1].trim() : '';
      if (body) variants[key] = body;
    }
    const tagsMatch = text.match(/\*\*Tags\*\*\n([\s\S]*?)(?=\n\*\*|\n##|\n---|$)/);
    const tagsLine = tagsMatch ? tagsMatch[1].trim() : '';
    const tags = tagsLine.startsWith('#')
      ? tagsLine.split(/\s+/).filter(t => t.startsWith('#'))
      : [];
    if (Object.keys(variants).length === 0) continue;
    out[n] = { title: s.title, variants, tags };
  }

  const jsonPath = path.join(ROOT, series.name, 'captions.json');
  fs.writeFileSync(jsonPath, JSON.stringify(out, null, 2) + '\n');
  console.log(`${series.name}: wrote ${Object.keys(out).length} entries → captions.json`);
}
