# @sensei_vara — Postgres series captions & hashtags (Posts 1-20)

3 caption variants per post: **mystery hook** / **direct value** / **short & punchy**.
Hashtags below each — 8-12 per IG best practice.

---

## P1 — A database is a file. Why that matters.

**Mystery hook**
Everyone talks about databases like they're magic black boxes.
They're not.
Once you see what your DB actually is, every performance question changes. ⬇️

**Direct value**
A database is a file on disk. Pages, bytes, fsync calls. The whole mental model — from file descriptor to query result — in 8 slides. ⬇️

**Short & punchy**
Your database is a file.
Everything else is just software on top. →

**Tags**
#postgres #postgresql #sql #database #softwareengineering #devthread #backend #programming #databases #devtips

---

## P2 — Pages — the 8KB atom.

**Mystery hook**
Postgres doesn't read rows.
It doesn't read columns either.
It reads 8KB chunks. And that one fact changes how you think about every query. ⬇️

**Direct value**
Pages are the atomic unit of Postgres I/O — 8192 bytes, every time. Rows, indexes, TOAST — all pages. Here's what's inside one. ⬇️

**Short & punchy**
8KB in. 8KB out.
That's all Postgres sees. →

**Tags**
#postgres #postgresql #database #dba #backend #softwareengineering #devthread #sql #databases #programming #devtips

---

## P3 — The heap — where rows actually live.

**Mystery hook**
You wrote `INSERT INTO users`. Where did that row go?
Not where you think.
The heap is weirder than the name suggests. ⬇️

**Direct value**
The heap: Postgres's unordered row store. Page layout, line pointers, tuple headers, dead tuples. What happens between INSERT and SELECT. ⬇️

**Short & punchy**
The heap is chaos.
Ordered queries on unordered data.
Now you know. →

**Tags**
#postgres #postgresql #sql #database #backend #dba #devthread #softwareengineering #databases #programming

---

## P4 — Indexes aren't magic — they're sorted pointers (B-tree intro).

**Mystery hook**
"Just add an index" is the most repeated advice in databases.
Almost nobody knows what that actually does.
Here's the real structure. ⬇️

**Direct value**
A B-tree index is a sorted structure of (value → heap pointer) pairs. How leaf nodes, root, and branches work together — and why ORDER BY gets fast for free. ⬇️

**Short & punchy**
Index = sorted list of pointers.
That's it.
Now stop guessing. →

**Tags**
#postgres #postgresql #sql #database #backend #softwareengineering #devthread #dba #programming #devtips #datamodeling

---

## P5 — EXPLAIN — read the plan, not the SQL.

**Mystery hook**
You've been optimizing the wrong thing.
Your slow query isn't slow for the reason you think.
The proof is one command away. ⬇️

**Direct value**
`EXPLAIN ANALYZE` decoded: seq scan vs index scan, cost estimates, actual rows, loops. How to read the plan Postgres chose — and how to change it. ⬇️

**Short & punchy**
Don't guess. EXPLAIN.
The plan doesn't lie. →

**Tags**
#postgres #postgresql #sql #database #backend #dba #devthread #softwareengineering #databases #devtips #performance

---

## P6 — `SELECT *` is a smell — projection & I/O.

**Mystery hook**
`SELECT *` looks harmless.
It isn't.
One star can multiply your I/O by 10x — even with an index. ⬇️

**Direct value**
Projection matters: `SELECT *` forces full row reads, blows index-only scans, pulls TOAST columns. How to audit and fix it with `EXPLAIN (ANALYZE, BUFFERS)`. ⬇️

**Short & punchy**
`SELECT *` reads everything.
Name your columns. →

**Tags**
#postgres #postgresql #sql #database #backend #softwareengineering #devthread #webdev #programming #devtips

---

## P7 — Joins are loops (nested loop / hash / merge).

**Mystery hook**
Every JOIN you've written is secretly a loop.
Sometimes it's 3 nested ones.
Postgres picks which kind — and the wrong pick is why your query is slow. ⬇️

**Direct value**
The 3 join strategies: nested loop (small inputs), hash join (large unsorted), merge join (pre-sorted). When Postgres picks each and how to read it in EXPLAIN. ⬇️

**Short & punchy**
Joins are loops.
3 kinds. One winner per query. →

**Tags**
#postgres #postgresql #sql #database #backend #dba #devthread #softwareengineering #databases #programming #performance

---

## P8 — Sargability — why `WHERE lower(email) = …` kills your index.

**Mystery hook**
You have an index on `email`.
Your query is still slow.
You wrapped a function around it. That's the entire problem. ⬇️

**Direct value**
Sargability: a predicate that can use an index vs one that can't. Why `WHERE lower(email) = ...` forces a seq scan — and the 3 fixes including expression indexes. ⬇️

**Short & punchy**
Wrap a function → lose the index.
That's sargability. →

**Tags**
#postgres #postgresql #sql #database #dba #backend #devthread #softwareengineering #programming #devtips #datamodeling

---

## P9 — NULL is not a value — three-valued logic.

**Mystery hook**
`WHERE email != 'test@test.com'` won't return rows where email is NULL.
Most devs are surprised by this.
SQL runs on 3-valued logic — not 2. ⬇️

**Direct value**
NULL in SQL: TRUE / FALSE / UNKNOWN. Why `NULL != anything` is UNKNOWN, why `NOT IN` with NULLs returns nothing, and how `IS DISTINCT FROM` saves you. ⬇️

**Short & punchy**
NULL is not false.
Not empty. Not zero.
UNKNOWN. →

**Tags**
#sql #postgres #postgresql #database #databases #softwareengineering #devthread #backend #programming #devtips

---

## P10 — Clause order ≠ execution order.

**Mystery hook**
You write SQL in one order.
Postgres runs it in a different order entirely.
That gap explains every "why can't I use my alias here?" error. ⬇️

**Direct value**
SQL execution order: FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. Why aliases fail in WHERE, why window fns go last, with real errors decoded. ⬇️

**Short & punchy**
You write SELECT first.
Postgres runs it sixth.
Save this. →

**Tags**
#sql #postgres #postgresql #database #backend #softwareengineering #devthread #webdev #programming #devtips

---

## P11 — B-tree vs hash vs GIN vs BRIN.

**Mystery hook**
There are 4 index types in Postgres.
Most devs only know one.
The other 3 are faster for the queries you're probably running. ⬇️

**Direct value**
B-tree (range/equality), hash (equality-only), GIN (arrays/JSONB/FTS), BRIN (time-series/monotonic). When to use each — with query patterns and size trade-offs. ⬇️

**Short & punchy**
4 index types. 4 different jobs.
You're overusing B-tree. →

**Tags**
#postgres #postgresql #database #dba #sql #backend #devthread #softwareengineering #databases #programming #performance

---

## P12 — MVCC — your row has versions, not locks.

**Mystery hook**
Two transactions read the same row at the same time without blocking each other.
No lock.
How is that possible? ⬇️

**Direct value**
MVCC: Postgres keeps multiple row versions (xmin/xmax). Readers never block writers. How snapshots work, what dead tuples cost, and why VACUUM exists because of this. ⬇️

**Short & punchy**
Readers don't block writers.
That's MVCC.
Your row has versions. →

**Tags**
#postgres #postgresql #database #dba #backend #devthread #softwareengineering #sql #databases #programming

---

## P13 — VACUUM — why your DB takes out the trash.

**Mystery hook**
Your table keeps growing even though you DELETE everything.
Disk space doesn't come back.
This isn't a bug. It's MVCC's tax — and VACUUM is the payment. ⬇️

**Direct value**
VACUUM explained: dead tuples from MVCC, how autovacuum finds and reclaims them, bloat, VACUUM FULL vs regular, and the tuning knobs that matter. ⬇️

**Short & punchy**
DELETE doesn't free space.
VACUUM does.
Now you know why. →

**Tags**
#postgres #postgresql #database #dba #backend #softwareengineering #devthread #sql #databases #devtips

---

## P14 — WAL — the DB writes twice (durability).

**Mystery hook**
When you COMMIT a transaction, Postgres writes to disk twice.
The second write is what makes it safe to cut the power.
Most devs have no idea this exists. ⬇️

**Direct value**
WAL (Write-Ahead Log): every change written to the log before the heap. How crash recovery works, what `fsync=off` risks, and why replication is basically WAL shipping. ⬇️

**Short & punchy**
Commit → two writes.
One is the safety net.
That's WAL. →

**Tags**
#postgres #postgresql #database #dba #backend #softwareengineering #devthread #sql #databases #programming

---

## P15 — Isolation levels — what "repeatable read" actually means.

**Mystery hook**
You ran the same query twice in one transaction.
Different results.
This isn't a bug. It's the default isolation level working exactly as designed. ⬇️

**Direct value**
Isolation levels: Read Committed (default), Repeatable Read, Serializable. What each one prevents (dirty read / non-repeatable read / phantom read) — with real query pairs that reproduce each anomaly. ⬇️

**Short & punchy**
4 isolation levels.
3 things they prevent.
Know what you're running. →

**Tags**
#postgres #postgresql #database #dba #sql #backend #devthread #softwareengineering #databases #programming #devtips

---

## P16 — Normalization in one carousel (1NF → 3NF, no textbook).

**Mystery hook**
Normalization has a reputation for being academic and slow.
Both are wrong.
8 slides. Real schema. No theory. ⬇️

**Direct value**
1NF → 2NF → 3NF: what each one actually removes (repeating groups, partial deps, transitive deps) — with a real orders schema transformed step by step. ⬇️

**Short & punchy**
3 normal forms.
One rule each.
Real schema, no textbook. →

**Tags**
#sql #database #datamodeling #postgres #postgresql #backend #softwareengineering #devthread #databases #programming #dba

---

## P17 — Foreign keys aren't overhead — they're invariants.

**Mystery hook**
"We removed foreign keys for performance" is the most dangerous sentence in database design.
You traded a constraint for a bug that's already in your data. ⬇️

**Direct value**
Foreign keys: not a performance cost but a correctness guarantee. What they enforce, when the index cost is real, and why soft-deletes without FKs destroy data integrity. ⬇️

**Short & punchy**
Skip FK → orphaned rows.
That's not a feature.
That's a bug. →

**Tags**
#sql #postgres #postgresql #database #datamodeling #backend #softwareengineering #devthread #databases #dba #programming

---

## P18 — UUID vs bigint as PK — the index-page truth.

**Mystery hook**
UUIDs look like a good primary key.
They're random. They're globally unique.
They're also quietly destroying your B-tree. ⬇️

**Direct value**
UUID vs bigint PK: random UUIDs fragment B-tree leaf pages → page splits → bloat → slower inserts. UUIDv7 fixes this. Benchmarks, index sizes, and the trade-off table. ⬇️

**Short & punchy**
Random UUIDs fragment indexes.
bigint or UUIDv7.
Choose wisely. →

**Tags**
#postgres #postgresql #database #datamodeling #dba #sql #backend #softwareengineering #devthread #programming #databases

---

## P19 — JSONB — when to embrace, when to regret.

**Mystery hook**
JSONB feels like escaping schema design.
It is — and that freedom has a bill.
Here's when it saves you and when it buries you. ⬇️

**Direct value**
JSONB: binary storage, GIN indexing, operators. When it wins (sparse attributes, evolving schema) vs when to regret it (joins, aggregates, required columns). With query comparisons. ⬇️

**Short & punchy**
JSONB is a tool.
Not a replacement for schema.
Know the line. →

**Tags**
#postgres #postgresql #database #sql #datamodeling #backend #softwareengineering #devthread #databases #programming #dba

---

## P20 — N+1 — the bug that scales linearly with users. (SERIES FINALE)

**Mystery hook**
Your app works fine in dev.
In prod, with 10k users, it fires 10,001 queries per page.
The logs have been lying to you this whole time. ⬇️

**Direct value**
N+1 explained: the loop that generates one query per row, how to spot it in logs and EXPLAIN, and the fixes — JOIN, eager load, `IN (...)`, subquery. Finale of a 20-post DB series. ⬇️

**Short & punchy**
1 query becomes N+1.
Scales with your users.
Fix it before prod finds it. →

**Tags**
#postgres #postgresql #sql #database #backend #webdev #softwareengineering #devthread #databases #programming #performance #buildinpublic

---

## Posting tips

- **First 2 lines matter most** — IG truncates after that. Lead with the hook.
- **Hashtags**: drop in the first comment for a cleaner caption body.
- **Pinning order**: P1 → P5 → P12 → P20 makes a strong "series anchor" lineup on your grid.
- **Carousel covers** sell the click. If a cover isn't pulling, swap to an alt from the per-post agent reports.
- **Cross-post** to Threads + LinkedIn. LinkedIn caption can be slightly more formal.
- **Series wrap**: P20 is the finale — use the recap-style caption variant on Stories too, linking back to P1.
