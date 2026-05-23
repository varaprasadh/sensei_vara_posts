# @sensei_vara — Node.js series captions & hashtags (Posts 1-20)

3 caption variants per post: **mystery hook** / **direct value** / **short & punchy**.
Hashtags below each — 8-12 per IG best practice.

---

## P1 — Node = V8 + libuv + bindings

**Mystery hook**
Everyone says "Node is just JavaScript."
It's not.
Under the hood there are three separate engines doing three different jobs.
Once you see them, `require('fs')` never looks the same. ⬇️

**Direct value**
Node.js is V8 (JS engine) + libuv (async I/O) + bindings (C++ bridge). Each one has a distinct job. Here's how the three parts divide the work — with a real diagram. ⬇️

**Short & punchy**
Node isn't one thing.
It's three.
Swipe to see the split. →

**Tags**
#nodejs #javascript #backend #softwareengineering #devthread #webdev #programming #coding #v8 #buildinpublic

---

## P2 — The event loop — phases, not just "a loop"

**Mystery hook**
"The event loop" is the most-said phrase in Node.
And the most misunderstood.
It's not one loop. It's six phases in a fixed order.
Miss one and your async code misfires. ⬇️

**Direct value**
The event loop has 6 phases: timers → pending callbacks → idle → poll → check → close. Each runs a different queue. Here's what each phase processes — with real examples per phase. ⬇️

**Short & punchy**
6 phases. Fixed order.
Your async code depends on all of them. →

**Tags**
#nodejs #javascript #async #backend #softwareengineering #devthread #webdev #devtips #programming #eventloop #buildinpublic

---

## P3 — Call stack vs event queue

**Mystery hook**
Your code looks synchronous.
It isn't.
There are two completely separate execution tracks in Node.
Knowing which track you're on changes how you write every async function. ⬇️

**Direct value**
Call stack vs event queue: how synchronous code and async callbacks occupy different execution tracks. How V8 pops the stack before the event loop can fire. Visualized frame by frame. ⬇️

**Short & punchy**
Stack runs first.
Queue waits.
That's the whole async model. →

**Tags**
#nodejs #javascript #js #backend #softwareengineering #devthread #webdev #programming #coding #devtips #v8

---

## P4 — Microtasks vs macrotasks

**Mystery hook**
`Promise.resolve()` and `setTimeout(fn, 0)` both look instant.
One runs before the other — every single time.
The order isn't random. There's a rule. ⬇️

**Direct value**
Microtasks (Promises, queueMicrotask) always drain before macrotasks (setTimeout, setImmediate, I/O). Here's the execution order with code you can run and predict before running. ⬇️

**Short & punchy**
Promise fires before setTimeout.
Every time.
Here's why. →

**Tags**
#nodejs #javascript #async #js #backend #devthread #softwareengineering #webdev #programming #devtips #coding

---

## P5 — `process.nextTick` — the queue jumper

**Mystery hook**
There's a Node API that cuts every queue.
Promises, timers, I/O — it beats them all.
It's also the easiest way to starve your entire event loop. ⬇️

**Direct value**
`process.nextTick` runs before Promises, before I/O, before anything. Useful for consistent async behavior. Dangerous when called recursively. Here's both sides with real footgun examples. ⬇️

**Short & punchy**
`nextTick` wins every race.
That's the feature. That's the footgun. →

**Tags**
#nodejs #javascript #async #backend #devthread #softwareengineering #webdev #devtips #programming #coding #buildinpublic

---

## P6 — Callbacks → Promises → async/await

**Mystery hook**
async/await didn't replace Promises.
And Promises didn't replace callbacks.
Each one is a transformation of the one before it.
Understanding the chain changes how you debug all three. ⬇️

**Direct value**
Callbacks → Promises → async/await: each layer is syntactic sugar over the previous. What `promisify` does under the hood. What `async/await` desugars to. With side-by-side code. ⬇️

**Short & punchy**
3 syntaxes. One async model.
Save the translation. →

**Tags**
#nodejs #javascript #async #js #backend #softwareengineering #devthread #webdev #programming #devtips #coding

---

## P7 — `async` functions ALWAYS return a Promise

**Mystery hook**
You wrote `async function getUser()`.
You think it sometimes returns a user.
It never does.
It always returns a Promise. Even when you return a string. ⬇️

**Direct value**
`async` functions wrap every return value in `Promise.resolve()`. Throw inside → rejected Promise. No throw → resolved Promise. Here's what that means for error handling and the callers you forget to `await`. ⬇️

**Short & punchy**
`async` wraps everything.
No exceptions.
`typeof` won't save you. →

**Tags**
#nodejs #javascript #async #js #typescript #backend #devthread #softwareengineering #webdev #devtips #programming

---

## P8 — The unhandled rejection trap

**Mystery hook**
Node 14: unhandled Promise rejection → a warning and life goes on.
Node 15: unhandled Promise rejection → your process dies.
One version upgrade. One silent crash path.
Here's how to catch it before it catches you. ⬇️

**Direct value**
Unhandled rejections crash Node 15+ by default. What triggers them, how `process.on('unhandledRejection')` works, why `void asyncFn()` is dangerous, and the 3-line pattern that protects every async entrypoint. ⬇️

**Short & punchy**
Missed a `.catch()`?
Node 15+ crashes.
Save the fix. →

**Tags**
#nodejs #javascript #async #backend #softwareengineering #devthread #webdev #devtips #programming #coding #npm

---

## P9 — `Promise.all` vs `allSettled` vs `race` vs `any`

**Mystery hook**
You know `Promise.all`.
You use it wrong.
One rejection kills everything.
There are 3 other combinators. Each one handles failure differently. ⬇️

**Direct value**
`Promise.all` (fail fast) vs `allSettled` (collect everything) vs `race` (first settled) vs `any` (first resolved). Decision tree: which one to use for fan-out, health checks, timeouts, and fallbacks. ⬇️

**Short & punchy**
4 combinators. 4 different failure modes.
Pick the right one. →

**Tags**
#nodejs #javascript #async #js #backend #softwareengineering #devthread #webdev #devtips #programming #typescript

---

## P10 — `await` in a loop = sequential

**Mystery hook**
You wrote a `for` loop with `await` inside.
Congratulations — you just made Node synchronous.
Here's how to actually run those requests in parallel. ⬇️

**Direct value**
`await` inside `for...of` → sequential. `Promise.all` + `.map()` → parallel. `Promise.allSettled` for partial failures. `p-limit` for concurrency caps. Side by side with timing benchmarks. ⬇️

**Short & punchy**
`for await` = one at a time.
`Promise.all` = all at once.
Benchmark included. →

**Tags**
#nodejs #javascript #async #js #backend #devthread #softwareengineering #webdev #programming #devtips #performance

---

## P11 — CommonJS vs ESM — dual-package hell

**Mystery hook**
You added `"type": "module"` to your `package.json`.
Suddenly 3 deps broke.
You removed it.
Now a different dep broke.
This isn't a config problem. It's a module system war. ⬇️

**Direct value**
CJS vs ESM: what changes, what breaks, why you can't `require()` an ESM package, what dual-package means, and the 3 escape hatches (`createRequire`, `.cjs`, `.mjs`). With a working interop example. ⬇️

**Short & punchy**
Two module systems. One runtime.
They don't like each other. →

**Tags**
#nodejs #javascript #js #npm #backend #softwareengineering #devthread #webdev #programming #devtips #typescript

---

## P12 — `require.cache` — modules are cached forever

**Mystery hook**
You changed a config file.
You called `require('./config')` again.
You got the old values.
Node didn't re-read the file.
It cached it on first load and never looked again. ⬇️

**Direct value**
`require.cache` stores every module by resolved path. First `require()` runs the file. Every subsequent `require()` returns the cached export. How to bust it, when to bust it, when NOT to. ⬇️

**Short & punchy**
`require()` runs once.
Every other call is a cache hit.
Save this. →

**Tags**
#nodejs #javascript #js #backend #devthread #softwareengineering #webdev #devtips #programming #coding #npm

---

## P13 — `node_modules` resolution

**Mystery hook**
`require('react')` has no path in it.
How does Node find the file?
It doesn't guess. There's a deterministic algorithm.
And it explains every "module not found" you've ever seen. ⬇️

**Direct value**
Node's module resolution: walks up from `__dirname`, checks each `node_modules/`, respects `main` then `exports` then `index.js`. How hoisting works. Why two versions of the same package can coexist. ⬇️

**Short & punchy**
No path. Node still finds it.
Here's the algorithm. →

**Tags**
#nodejs #javascript #npm #js #backend #softwareengineering #devthread #webdev #devtips #programming #coding

---

## P14 — The `package.json` fields you ignored

**Mystery hook**
You read `name`, `version`, `scripts`.
You skipped 4 other fields that control whether your package works for TypeScript users, tree-shakers, and bundlers.
Most packages get these wrong. ⬇️

**Direct value**
`exports` (subpath control), `types` (TS entry), `sideEffects` (tree-shaking), `engines` (Node version). What each one does, what breaks without it, and the minimal correct config for a modern package. ⬇️

**Short & punchy**
4 fields. Most devs skip all 4.
Don't. →

**Tags**
#nodejs #javascript #npm #typescript #backend #softwareengineering #devthread #webdev #devtips #programming #buildinpublic

---

## P15 — Streams — the four kinds

**Mystery hook**
You read a 2 GB file with `fs.readFile`.
Node loaded all 2 GB into RAM.
There's a better way.
It's been in Node since v0.9. ⬇️

**Direct value**
Node has 4 stream types: Readable (source), Writable (sink), Duplex (both), Transform (modify in transit). Each one's interface, when to use which, and why streams beat buffers for large data. ⬇️

**Short & punchy**
4 stream types. One purpose: don't hold it all in RAM.
Swipe. →

**Tags**
#nodejs #javascript #streams #backend #softwareengineering #devthread #webdev #programming #devtips #coding #performance

---

## P16 — Backpressure — why naive piping breaks

**Mystery hook**
You piped a fast Readable into a slow Writable.
It worked — until it didn't.
Memory climbed. Process crashed.
Nobody told you streams can push back. ⬇️

**Direct value**
Backpressure: when `.write()` returns `false`, the Readable should pause. `pipe()` handles this automatically. Manual streaming often doesn't. Here's the pattern that prevents memory bloat. ⬇️

**Short & punchy**
Fast source. Slow sink.
No backpressure → OOM.
Save the fix. →

**Tags**
#nodejs #javascript #streams #backend #softwareengineering #devthread #webdev #devtips #programming #performance #coding

---

## P17 — `Buffer` — the byte primitive you ignored

**Mystery hook**
Everything in Node that touches a file, a network socket, or a crypto operation hands you a `Buffer`.
Most devs immediately call `.toString()` and move on.
Here's what you lost. ⬇️

**Direct value**
`Buffer` is a fixed-size chunk of raw memory outside V8's heap. Allocations, encodings (utf8/hex/base64), slicing, copying, and the `Buffer.from` vs `Buffer.alloc` safety difference. ⬇️

**Short & punchy**
`Buffer` is raw bytes.
`.toString()` is just one encoding.
There are 6. →

**Tags**
#nodejs #javascript #backend #js #softwareengineering #devthread #webdev #devtips #programming #coding #crypto

---

## P18 — The single-threaded lie

**Mystery hook**
"Node is single-threaded."
Everybody says it.
Node ships with `worker_threads`, `cluster`, and `child_process`.
Pick one. But know which one actually unblocks the event loop. ⬇️

**Direct value**
Worker Threads (shared memory, JS), Cluster (fork process per CPU, one port), child_process (arbitrary subprocess). Which one to reach for: CPU-bound → Worker; traffic → Cluster; external tool → child_process. ⬇️

**Short & punchy**
Single-threaded by default.
Parallelism when you need it.
3 tools. Different jobs. →

**Tags**
#nodejs #javascript #backend #softwareengineering #devthread #webdev #devtips #programming #coding #performance #scaling

---

## P19 — Memory leaks in Node — 4 common shapes

**Mystery hook**
Your server's RSS is 150 MB on deploy.
It's 1.2 GB after 3 days.
Restart fixes it. Restarting isn't fixing it.
There are 4 shapes every Node leak takes. ⬇️

**Direct value**
4 Node memory leak patterns: global accumulation, uncleaned event listeners, closure captures, and cached Maps/Sets that never evict. How to spot each with `--inspect` + Chrome DevTools heap snapshots. ⬇️

**Short & punchy**
Memory climbs. Restart helps.
That's not a fix.
4 shapes. Swipe. →

**Tags**
#nodejs #javascript #backend #softwareengineering #devthread #webdev #devtips #programming #debugging #performance #coding

---

## P20 — `console.log` isn't free (SERIES FINALE)

**Mystery hook**
You left `console.log` in prod "just to debug."
On a hot path it's serializing objects to string, writing to stdout synchronously, blocking the event loop.
One liner. Real latency. ⬇️

**Direct value**
`console.log` in Node is synchronous to stderr/stdout, JSON-serializes objects, and blocks. On hot paths: real microsecond cost. Better options: `pino`, log levels, conditional logging. Finale of a 20-post Node series. ⬇️

**Short & punchy**
`console.log` blocks.
In prod, on hot paths, that adds up.
Save the swap. →

**Tags**
#nodejs #javascript #backend #softwareengineering #devthread #buildinpublic #webdev #devtips #programming #performance #npm

---

## Posting tips

- **First 2 lines matter most** — IG truncates after that. Lead with the hook.
- **Hashtags**: drop in the first comment for a cleaner caption body.
- **Pinning order**: P1 → P4 → P11 → P20 makes a strong "series anchor" lineup on your grid.
- **Carousel covers** sell the click. If a cover isn't pulling, swap to an alt from the per-post agent reports.
- **Cross-post** to Threads + LinkedIn. LinkedIn caption can be slightly more formal.
- **Series wrap**: P20 is the finale — use the recap-style caption variant on Stories too, linking back to P1.
