#!/usr/bin/env bash
# Render slides_html/*.html → slides_png/*.png at 1080x1080 using Chrome headless.
# Usage: ./render_pngs.sh <series_dir>
#   e.g. ./render_pngs.sh db_series

set -euo pipefail

SERIES_DIR="${1:?usage: $0 <series_dir>}"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PARALLEL="${PARALLEL:-4}"

if [[ ! -d "$SERIES_DIR" ]]; then
  echo "no such dir: $SERIES_DIR" >&2
  exit 1
fi

render_one() {
  local html="$1"
  # Chrome needs an absolute file:// URL — otherwise it parses the first path
  # segment as a host and bails with ERR_INVALID_URL.
  local html_abs
  case "$html" in
    /*) html_abs="$html" ;;
    *)  html_abs="$PWD/$html" ;;
  esac
  local png_dir
  png_dir="$(dirname "$(dirname "$html_abs")")/slides_png"
  mkdir -p "$png_dir"
  local name
  name="$(basename "$html_abs" .html)"
  local out="$png_dir/$name.png"
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --no-sandbox \
    --force-device-scale-factor=1 \
    --window-size=1080,1080 \
    --default-background-color=00000000 \
    --screenshot="$out" \
    "file://$html_abs" 2>/dev/null
  echo "$out"
}

export -f render_one
export PWD
export CHROME

find "$SERIES_DIR" -type f -path "*/slides_html/slide_*.html" \
  | xargs -P "$PARALLEL" -I{} bash -c 'render_one "$@"' _ {}

echo "done: $SERIES_DIR"
