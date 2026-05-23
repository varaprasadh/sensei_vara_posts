# Node.js Series Spec — @sensei_vara

20 posts. Mixed depth (runtime models → async → modules → streams → perf).
Read in full before building a post.

## 20-post arc (locked)

**Runtime mental models**
1. Node = V8 + libuv + bindings
2. The event loop — phases, not just "a loop"
3. Call stack vs event queue
4. Microtasks vs macrotasks (Promise vs setTimeout vs setImmediate)
5. `process.nextTick` — queue jumper + footgun

**Async**
6. Callbacks → Promises → async/await
7. `async` functions ALWAYS return a Promise
8. Unhandled rejection trap
9. `Promise.all` vs `allSettled` vs `race` vs `any`
10. `await` in a loop = sequential — parallelize properly

**Modules / runtime**
11. CommonJS vs ESM — dual-package hell
12. `require.cache` — modules cached forever
13. `node_modules` resolution
14. `package.json` fields you ignored (`exports`, `types`, `sideEffects`, `engines`)

**Built-ins / streams**
15. Streams — the four kinds
16. Backpressure — why naive piping breaks
17. `Buffer` — the byte primitive

**Perf / debugging**
18. Single-threaded lie — Worker Threads vs Cluster vs child_process
19. Memory leaks — 4 common shapes
20. `console.log` isn't free — prod-perf gotchas

## Color palette (locked — DO NOT change)

```
--bg:            #0a140d   /* deep forest black */
--bg-elev:       #122019
--bg-code:       #0c1810
--border:        #1f3024
--border-strong: #2f4a37
--text:          #e8f0e8
--text-muted:    #9bb3a0
--text-dim:      #6c8275
--accent:        #68a063   /* node green — primary */
--accent-soft:   rgba(104, 160, 99, 0.15)
--branch:        #c8f573   /* neon lime — highlight */
--merge:         #ffd166   /* gold — numbers/refs */
--conflict:      #ff6b6b   /* red — errors */
--staged:        #93dcff   /* sky — special */
--head:          #ffd166   /* gold for HEAD-like emphasis */
```

Differentiates from git (red) and db (PG blue).

## Format requirements

Same as DB series:
- **8 slides per post**, 1080×1080 each, all in ONE HTML file.
- File naming: `post_N/postN_<slug>.html`.
- Each slide is `<div class="slide" id="sN">`. IDs `s1`..`s8` exactly.
- Slide structure: editor-bar (dots + tab + slide-num) + content + footer.
- Footer: `@sensei_vara` left, `swipe →` right (last slide: `follow for more` / `save & share ♡`).
- Tab names should be Node-themed: `event_loop.js`, `libuv.c`, `require.js`, `package.json`, `stream.js`, `worker.js`, etc.

## Slide flow per post (template — keep rhythm)

1. **Cover** — bold hook headline + tagline. Big h1 (~110px).
2. **Hook / what most get wrong** — mental model setup
3. **Core concept #1** — diagram/SVG
4. **Core concept #2** — code or second diagram
5. **Mechanism / how it works** — SVG or layered diagram
6. **Real example / gotcha** — code with `.hi` highlighted line
7. **See it yourself** — copy-pastable Node snippet + sample output
8. **Recap + next-post tease** — `recap-list` + CTA box

## Base CSS template

Use `/Users/varaprasadh/workspace/personal/instagram/node_series/_TEMPLATE.html` as starting point.

## Voice

- Hooky, terse, opinionated. "Most devs think X. That's wrong because Y."
- Node-anchored examples (real APIs, real CLI).
- Caveman-adjacent in slide body text.
- One key insight per slide.

## Build script

Copy `_build_slides.js`. Content-agnostic.
