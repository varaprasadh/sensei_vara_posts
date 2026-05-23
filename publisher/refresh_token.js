#!/usr/bin/env node
// Refresh long-lived Instagram access token (60-day TTL).
// Prints the new token to stdout so a workflow can pipe it into `gh secret set`.
// Env: IG_ACCESS_TOKEN
const token = process.env.IG_ACCESS_TOKEN;
if (!token) { console.error('missing IG_ACCESS_TOKEN'); process.exit(1); }

const url = new URL('https://graph.instagram.com/refresh_access_token');
url.searchParams.set('grant_type', 'ig_refresh_token');
url.searchParams.set('access_token', token);

const res = await fetch(url);
const json = await res.json();
if (!res.ok || json.error) {
  console.error('refresh failed:', JSON.stringify(json));
  process.exit(1);
}

// json: { access_token, token_type, expires_in }
process.stdout.write(json.access_token);
console.error(`refreshed — expires in ${json.expires_in}s`);
