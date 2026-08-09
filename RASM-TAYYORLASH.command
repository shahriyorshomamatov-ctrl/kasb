#!/bin/bash
# Spiker rasmlarini sayt uchun tayyorlaydi: kvadrat 600x600, yuzga moslangan, siqilgan.
#
# QANDAY ISHLATILADI:
#   1. Rasmlarni images/ustozlar/ papkasiga tashlang.
#      Nomi muhim:  shahriyor.jpg   va   amiriddin.jpg
#      (o'lchami va formati farqi yo'q — .jpg, .png, .heic hammasi bo'ladi)
#   2. Shu faylni ikki marta bosing.

cd "$(dirname "$0")" || exit 1
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PAPKA="images/ustozlar"

if [ ! -x "$CHROME" ]; then
  echo "Google Chrome topilmadi."
  read -r -p "Yopish uchun Enter bosing..."; exit 1
fi

PORT=5499
while lsof -i :$PORT >/dev/null 2>&1; do PORT=$((PORT + 1)); done
python3 -m http.server $PORT >/dev/null 2>&1 &
SERVER=$!
disown 2>/dev/null || true
trap 'kill $SERVER 2>/dev/null; rm -f "$PAPKA/_ish.html"' EXIT
sleep 1

topildi=0
for nom in shahriyor amiriddin; do
  manba=""
  for ken in jpg jpeg JPG JPEG png PNG heic HEIC webp; do
    if [ -f "$PAPKA/$nom.$ken" ]; then manba="$PAPKA/$nom.$ken"; break; fi
  done
  [ -z "$manba" ] && continue

  # allaqachon tayyor bo'lsa (600x600) — o'tkazib yuboramiz
  o=$(sips -g pixelWidth -g pixelHeight "$manba" 2>/dev/null | tr -d ' \n')
  if [ "$o" = "pixelWidth:600pixelHeight:600" ]; then
    echo "  $nom — allaqachon tayyor, tegilmadi"
    topildi=$((topildi + 1)); continue
  fi

  # HEIC bo'lsa avval jpg ga o'giramiz
  ish="$manba"
  if [[ "$manba" == *.heic ]] || [[ "$manba" == *.HEIC ]]; then
    sips -s format jpeg "$manba" --out "$PAPKA/_$nom.jpg" >/dev/null 2>&1
    ish="$PAPKA/_$nom.jpg"
  fi

  # Chrome bilan kvadrat qilib kesamiz — yuz yuqoriroqda qolsin
  cat > "$PAPKA/_ish.html" <<HTML
<!DOCTYPE html><meta charset="utf-8"><style>
  *{margin:0;padding:0}html,body{width:600px;height:600px;overflow:hidden;background:#15171D}
  img{width:600px;height:600px;object-fit:cover;object-position:center 28%;display:block}
</style><img src="$(basename "$ish")">
HTML

  "$CHROME" --headless --disable-gpu --hide-scrollbars \
    --window-size=600,600 --screenshot="$PAPKA/_$nom.png" \
    --virtual-time-budget=3000 \
    "http://localhost:$PORT/$PAPKA/_ish.html" >/dev/null 2>&1

  if [ -f "$PAPKA/_$nom.png" ]; then
    rm -f "$PAPKA/$nom".*
    sips -s format jpeg -s formatOptions 80 "$PAPKA/_$nom.png" --out "$PAPKA/$nom.jpg" >/dev/null 2>&1
    rm -f "$PAPKA/_$nom.png" "$PAPKA/_$nom.jpg.tmp"
    echo "  $nom.jpg — tayyor ($(du -h "$PAPKA/$nom.jpg" | cut -f1))"
    topildi=$((topildi + 1))
  else
    echo "  $nom — kesib bo'lmadi"
  fi
  rm -f "$PAPKA/_$nom.jpg" 2>/dev/null
done

rm -f "$PAPKA/_ish.html"
echo ""
if [ "$topildi" -eq 0 ]; then
  echo "  Rasm topilmadi."
  echo "  Rasmlarni $PAPKA/ papkasiga shu nomlar bilan tashlang:"
  echo "     shahriyor.jpg     amiriddin.jpg"
else
  echo "  $topildi ta rasm tayyor. Saytni ochib tekshiring."
fi
echo ""
read -r -p "Yopish uchun Enter bosing..."
