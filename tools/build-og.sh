#!/usr/bin/env bash
# Builds the link preview images (images/og/*.jpg, 1200×630) that show when a
# page of the sites is shared in a text, chat or post. Each one is a photo of
# tools/og/card.html taken by headless Chrome, so the record and next game on
# it come from the team's data.js at build time.
#
#   tools/build-og.sh            (from the repo root; Chrome or Chromium must be installed)
#
# The "Calendar feeds" GitHub Action runs this after every data.js change.
set -euo pipefail
cd "$(dirname "$0")/.."

CHROME="${CHROME:-}"
for c in "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" google-chrome google-chrome-stable chromium chromium-browser; do
  [ -n "$CHROME" ] && break
  if [ -x "$c" ] || command -v "$c" >/dev/null 2>&1; then CHROME="$c"; fi
done
[ -n "$CHROME" ] || { echo "Chrome not found (set CHROME=/path/to/chrome)"; exit 1; }

PORT="${PORT:-4199}"
python3 -m http.server "$PORT" --bind 127.0.0.1 >/dev/null 2>&1 &
SERVER=$!
PROFILE="$(mktemp -d)"
trap 'kill $SERVER 2>/dev/null; rm -rf "$PROFILE"' EXIT
sleep 1

mkdir -p images/og

# Chrome on some systems gives the page a shorter viewport than the window it was asked for
# (87px on macOS): measure it once and open each window that much taller.
printf '<body><script>document.body.textContent="VIEW "+innerHeight</script></body>' > "$PROFILE/v.html"
"$CHROME" --headless=new --disable-gpu --no-first-run --user-data-dir="$PROFILE/chrome" --window-size=1200,630 \
  --dump-dom "file://$PROFILE/v.html" > "$PROFILE/v.txt" 2>/dev/null &
pid=$!
for _ in $(seq 1 40); do grep -q VIEW "$PROFILE/v.txt" 2>/dev/null && break; sleep 0.5; done
kill "$pid" 2>/dev/null || true; wait "$pid" 2>/dev/null || true
VIEW=$(grep -o 'VIEW [0-9]*' "$PROFILE/v.txt" | cut -d' ' -f2)
HEIGHT=$((630 + 630 - ${VIEW:-630}))

shoot() {   # shoot <output name> <query string>
  local png="$PROFILE/$1.png"
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --no-first-run --no-default-browser-check \
    --user-data-dir="$PROFILE/chrome" --window-size=1200,$HEIGHT --virtual-time-budget=10000 \
    --screenshot="$png" "http://127.0.0.1:$PORT/tools/og/card.html?$2" >/dev/null 2>&1 &
  local pid=$!
  # some Chrome builds write the screenshot but never exit: wait for the file, then close it
  for _ in $(seq 1 60); do
    if [ -s "$png" ] || ! kill -0 "$pid" 2>/dev/null; then break; fi
    sleep 0.5
  done
  sleep 0.5
  kill "$pid" 2>/dev/null || true
  wait "$pid" 2>/dev/null || true
  [ -s "$png" ] || { echo "no screenshot for $1"; return 1; }
  # keep the top 1200×630 (the page) and save it as a JPEG
  if command -v sips >/dev/null 2>&1; then
    sips --cropToHeightWidth 630 1200 --cropOffset 0 0 -s format jpeg -s formatOptions 84 "$png" --out "images/og/$1.jpg" >/dev/null
  else
    python3 -c "from PIL import Image; Image.open('$png').convert('RGB').crop((0, 0, 1200, 630)).save('images/og/$1.jpg', quality=84, optimize=True)"
  fi
  echo "images/og/$1.jpg"
}

shoot hub "sport=hub"
for sport in football soccer field-hockey volleyball golf cross-country esports; do
  stats=stats; [ "$sport" = cross-country ] && stats=runners
  for page in index schedule "$stats" history media; do
    shoot "$sport-$page" "sport=$sport&page=$page"
  done
done
