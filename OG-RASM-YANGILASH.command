#!/bin/bash
# Havola ulashilganda ko'rinadigan rasmni (images/og.jpg) qaytadan yasaydi.
# config.js dagi sana/vaqt/joy/narx o'zgargandan keyin shu faylni bosing.

cd "$(dirname "$0")" || exit 1

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
if [ ! -x "$CHROME" ]; then
  echo "Google Chrome topilmadi. Uni o'rnating yoki og.jpg ni qo'lda qo'ying."
  read -r -p "Yopish uchun Enter bosing..."
  exit 1
fi

PORT=5399
while lsof -i :$PORT >/dev/null 2>&1; do PORT=$((PORT + 1)); done

python3 -m http.server $PORT >/dev/null 2>&1 &
SERVER=$!
disown 2>/dev/null || true
trap 'kill $SERVER 2>/dev/null' EXIT
sleep 1

echo "Rasm yasalmoqda..."
"$CHROME" --headless --disable-gpu --hide-scrollbars \
  --window-size=1200,630 --screenshot="images/og.png" \
  --virtual-time-budget=4000 \
  "http://localhost:$PORT/images/og-manba.html" >/dev/null 2>&1

if [ ! -f "images/og.png" ]; then
  echo "Xato: rasm yasalmadi."
  read -r -p "Yopish uchun Enter bosing..."
  exit 1
fi

sips -s format jpeg -s formatOptions 82 images/og.png --out images/og.jpg >/dev/null 2>&1
rm -f images/og.png

echo ""
echo "  Tayyor:  images/og.jpg  ($(du -h images/og.jpg | cut -f1))"
echo ""
read -r -p "Yopish uchun Enter bosing..."
