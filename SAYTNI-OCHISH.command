#!/bin/bash
# Shu faylni ikki marta bosing — sayt brauzerda ochiladi.
# Oynani yopmang: yopsangiz sayt ham to'xtaydi.

cd "$(dirname "$0")" || exit 1

PORT=5173
# Port band bo'lsa, bo'shini topamiz
while lsof -i :$PORT >/dev/null 2>&1; do
  PORT=$((PORT + 1))
done

echo ""
echo "  Sayt ishga tushdi:  http://localhost:$PORT"
echo ""
echo "  Faylni o'zgartirgach — brauzerda Cmd+R bosing."
echo "  Tugatish uchun bu oynada Ctrl+C bosing yoki oynani yoping."
echo ""

sleep 1 && open "http://localhost:$PORT/index.html" &
python3 -m http.server $PORT
