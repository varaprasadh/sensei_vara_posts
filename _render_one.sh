#!/usr/bin/env bash
# Render a single HTML to PNG. Called by xargs.
# Usage: _render_one.sh <absolute-html-path>
set -e
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
html_abs="$1"
png_dir="$(dirname "$(dirname "$html_abs")")/slides_png"
mkdir -p "$png_dir"
name="$(basename "$html_abs" .html)"
out="$png_dir/$name.png"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --no-sandbox \
  --force-device-scale-factor=1 --window-size=1080,1080 \
  --default-background-color=00000000 \
  --screenshot="$out" "file://$html_abs" 2>/dev/null
