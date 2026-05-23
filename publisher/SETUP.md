# IG auto-publisher — setup

Cron-driven Instagram carousel publisher. Every 6 hours, GitHub Actions picks the next
pending post and publishes it via the IG Graph API. Images are served straight from
this repo via `raw.githubusercontent.com`.

## One-time Meta setup

1. **IG account** — convert to **Business** or **Creator** (Settings → Account type).
2. **Facebook Page** — create one (or use existing) and link it to the IG account.
3. **Meta app** — go to https://developers.facebook.com/apps → Create App → Business.
   - Add product: **Instagram Graph API**.
   - In *App Roles*, add yourself as an Admin/Developer.
4. **Get long-lived access token**:
   - Open Graph API Explorer → pick your app → "Get User Access Token" with scopes:
     `instagram_basic`, `instagram_content_publish`, `pages_show_list`, `pages_read_engagement`.
   - Short-lived token returned. Exchange for long-lived (60-day):
     ```
     curl -s "https://graph.facebook.com/v25.0/oauth/access_token?\
     grant_type=fb_exchange_token&client_id=<APP_ID>&client_secret=<APP_SECRET>&\
     fb_exchange_token=<SHORT_LIVED_TOKEN>"
     ```
5. **Get IG_USER_ID** (the numeric IG-Business-Account ID, NOT your username):
   ```
   curl -s "https://graph.facebook.com/v25.0/me/accounts?access_token=<LONG_TOKEN>"
   # → find your Page ID, then:
   curl -s "https://graph.facebook.com/v25.0/<PAGE_ID>?fields=instagram_business_account&\
   access_token=<LONG_TOKEN>"
   # response.instagram_business_account.id is IG_USER_ID
   ```

## GitHub repo setup

1. Push this repo to **public** GitHub (raw.githubusercontent.com needs public).
2. Settings → Secrets and variables → Actions → New secret:
   - `IG_ACCESS_TOKEN` — long-lived token from step 4
   - `IG_USER_ID` — numeric ID from step 5
   - `GH_PAT_FOR_SECRETS` — a personal access token with `repo` scope, used **only** by the
     monthly `refresh-token` workflow to rotate `IG_ACCESS_TOKEN` (a workflow can't write
     its own secrets without an external PAT).
3. Settings → Actions → General → Workflow permissions → **Read and write**.

## First publish — verify before going live

Manually trigger with dry run:
```
gh workflow run publish-next-carousel.yml -f dry_run=true
```
This logs the image URLs and caption that *would* be published. Open each URL in a
browser — they should render as 1080×1080 PNGs.

Then trigger a real run:
```
gh workflow run publish-next-carousel.yml
```
Check IG. The bot commits queue.json marking that post as `published`.

## Cadence

`.github/workflows/publish.yml` runs at minute 0 every 6 hours UTC. To change:
edit the `cron:` line. Note GitHub cron is best-effort — can drift 5-15 min under load.

## Adding a new series

1. Create `<name>_series/` with `post_1/slides_png/slide_0{1..8}.png` per post.
2. Add `<name>_series/captions.json` — schema:
   ```json
   {
     "1": {
       "title": "Post title",
       "variants": {
         "mystery_hook": "...",
         "direct_value": "...",
         "short_punchy": "..."
       },
       "tags": ["#tag1", "#tag2"]
     }
   }
   ```
   `mystery_hook` is preferred; falls through to `direct_value` then `short_punchy` if empty.
   Any single variant is enough — others can be omitted.
3. Register in `publisher/lib.js` → `SERIES` array:
   ```js
   { name: 'newthing_series', folderPrefix: 'post_' }
   ```
4. Run `npm run queue` (or push — the workflow rebuilds on every run).

New posts are appended after existing pending ones (series-by-series order). Already-
published posts keep their status across rebuilds.

## Migrating from CAPTIONS.md (one-shot)

If you have a legacy `CAPTIONS.md` (markdown with `## P1 — title` / `**Mystery hook**` etc),
run `node publisher/convert_captions.js` once to generate `captions.json` per series.
CAPTIONS.md is no longer read at runtime — keep it as a readable mirror or delete.

## Manual ops

```
npm run queue                       # rebuild queue.json from disk
DRY_RUN=1 npm run publish           # local dry run (needs IG_ACCESS_TOKEN, IG_USER_ID, GITHUB_REPOSITORY)
npm run publish                     # actually post next pending
npm run refresh                     # refresh token (prints new token to stdout)
```

## Audio (manual step)

API can't attach trending audio to carousels. After each auto-publish, open the post
in the IG app → tap the post → "..." → "Add music". Music shows on the feed thumbnail
+ in reels reposts. Takes ~10s per post.

## Limits & gotchas

- 100 carousel publishes per 24h (we use 4/day → plenty of headroom).
- Long-lived token expires after 60 days. Monthly refresh workflow handles this.
- Container creation can take 30-60s for carousels — `pollContainerStatus` waits up to 2min.
- raw.githubusercontent.com URLs become stale if a file is force-pushed; avoid history rewrites
  on `main` while posts are pending.
- Caption max ~2200 chars, 30 hashtags. Our captions are well under both.
