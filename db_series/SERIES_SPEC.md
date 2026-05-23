# DB Series Spec — @sensei_vara

Postgres-anchored. 20 posts. Mixed depth (mental models → internals → ops).
Read this in full before building a post.

## 20-post arc (locked)

**Foundations**
1. A database is a file. Why that matters.
2. Pages — the 8KB atom. Everything is pages.
3. The heap — where rows actually live.
4. Indexes aren't magic — they're sorted pointers (B-tree intro).
5. EXPLAIN — read the plan, not the SQL.

**Querying truths**
6. `SELECT *` is a smell — projection & I/O.
7. Joins are loops (nested loop / hash / merge — when each wins).
8. Sargability — why `WHERE lower(email) = …` kills your index.
9. NULL is not a value — three-valued logic.
10. Clause order ≠ execution order (FROM → WHERE → GROUP → HAVING → SELECT → ORDER).

**Internals**
11. B-tree vs hash vs GIN vs BRIN — pick the right index.
12. MVCC — your row has versions, not locks.
13. VACUUM — why your DB takes out the trash.
14. WAL — the DB writes twice (durability).
15. Isolation levels — what "repeatable read" actually means.

**Schema & integrity**
16. Normalization in one carousel (1NF → 3NF, no textbook).
17. Foreign keys aren't overhead — they're invariants.
18. UUID vs bigint as PK — the index-page truth.
19. JSONB — when to embrace, when to regret.

**Scale / ops**
20. N+1 — the bug that scales linearly with users.

## Color palette (locked — DO NOT change)

```
--bg:            #0b1220   /* deep navy black */
--bg-elev:       #141d2e
--bg-code:       #0e1626
--border:        #243049
--border-strong: #36456a
--text:          #e6edf3
--text-muted:    #93a3bf
--text-dim:      #6a7a98
--accent:        #4a90c2   /* postgres blue — primary */
--accent-soft:   rgba(74, 144, 194, 0.15)
--branch:        #7ee7b8   /* mint — success / index */
--merge:         #ffb454   /* amber — highlight / sql kw */
--conflict:      #ff7a8a   /* coral — errors */
--staged:        #c8a8ff   /* lavender — refs */
--head:          #ffb454   /* reuse amber for HEAD-like emphasis */
```

Differentiates from git series (red-orange #f1502f → PG blue #4a90c2).

## Format requirements

- **8 slides per post**, 1080×1080 each, all in ONE HTML file.
- File naming: `post_N/postN_<slug>.html` (e.g. `post_1/post1_db_is_a_file.html`).
- Each slide is `<div class="slide" id="sN">`. IDs `s1`..`s8` exactly.
- Slide structure: editor-bar (dots + tab + slide-num) + content + footer.
- Footer: `@sensei_vara` left, `swipe →` right (last slide: `follow for more` / `save & share ♡`).
- Use fonts: Inter (UI) + JetBrains Mono (code/SHA-like) — Google Fonts link.
- Background grid via `.slide::before` (subtle 40px grid).
- Tab name should be DB-themed: `db.sql`, `pages.sql`, `heap.sql`, `index.sql`, `explain.sql`, `mvcc.sql`, etc.

## Slide flow per post (template — adapt content, keep rhythm)

1. **Cover** — bold hook headline + tagline. `cover-content` style. Big h1 (~110px).
2. **The hook / what most people get wrong** — set up the mental model
3. **Core concept #1** — diagram/SVG illustrating it
4. **Core concept #2** — code snippet or second diagram
5. **Mechanism / how it works** — SVG or layered diagram
6. **Real example / gotcha** — code with highlighted line (`.hi`)
7. **See it yourself** — copy-pastable Postgres command + sample output
8. **Recap + next-post tease** — `recap-list` + CTA box

## Base CSS template (copy this verbatim, then add post-specific styles)

Use `/Users/varaprasadh/workspace/personal/instagram/db_series/_TEMPLATE.html` as your starting point. Copy it, rename, fill slides 1-8.

## SVG diagram style

- Nodes: `<circle r="42" fill="var(--bg-elev) or #141d2e" stroke="var(--accent)" stroke-width="2">`
- SHA/labels: amber `#ffb454` JetBrains Mono ~16px
- Edges: PG blue lines + arrow markers
- Special accents (PK/index): mint `#7ee7b8`
- Errors/conflicts: coral `#ff7a8a`

## Voice

- Hooky, direct, opinionated. "Most devs do X. That's wrong because Y."
- Caveman-adjacent in slide text — terse, no filler.
- Postgres-anchored examples but lessons generally portable.
- One key insight per slide. Don't cram.

## Footer block (every slide)

```html
<div class="footer">
  <span class="handle">@sensei_vara</span>
  <span class="swipe">swipe →</span>
</div>
```

Last slide:
```html
<div class="footer">
  <span class="handle">follow for more</span>
  <span class="swipe">save & share ♡</span>
</div>
```

## Build script

Copy `build_slides.js` from any `git_series/post_N/`. It's content-agnostic — it splits any `postN_*.html` with `s1..sN` slides.
