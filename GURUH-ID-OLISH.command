#!/bin/bash
# Telegram guruhingizning CHAT_ID sini topib beradi.
#
# Token faqat shu oynada qoladi — hech qayerga yuborilmaydi va saqlanmaydi.

clear
echo ""
echo "  ══════════════════════════════════════════════════"
echo "   TELEGRAM GURUH ID SINI TOPISH"
echo "  ══════════════════════════════════════════════════"
echo ""
echo "  Boshlashdan oldin tekshiring:"
echo "    1. Bot yaratilgan (@BotFather → /newbot)"
echo "    2. Bot guruhga ADMIN qilib qo'shilgan"
echo "    3. Guruhga biror xabar yozilgan"
echo ""
echo "  ──────────────────────────────────────────────────"
echo ""
printf "  Bot tokenini shu yerga qo'ying va Enter bosing:\n  "
read -r TOKEN
echo ""

TOKEN=$(echo "$TOKEN" | tr -d ' \n\r')

if [ -z "$TOKEN" ]; then
  echo "  Token kiritilmadi."
  echo ""
  read -r -p "  Yopish uchun Enter bosing..."
  exit 1
fi

# 1. Token to'g'rimi?
echo "  Token tekshirilmoqda..."
BOT=$(curl -s "https://api.telegram.org/bot$TOKEN/getMe")

if ! echo "$BOT" | grep -q '"ok":true'; then
  echo ""
  echo "  ✗ Token noto'g'ri."
  echo "    @BotFather ga /mybots yozib, tokenni qaytadan oling."
  echo ""
  read -r -p "  Yopish uchun Enter bosing..."
  exit 1
fi

BOTNOM=$(echo "$BOT" | sed -n 's/.*"username":"\([^"]*\)".*/\1/p')
echo "  ✓ Bot topildi: @$BOTNOM"
echo ""

# 2. Guruhlarni qidiramiz
echo "  Guruhlar qidirilmoqda..."
echo ""

curl -s "https://api.telegram.org/bot$TOKEN/getUpdates" | python3 -c '
import sys, json
try:
    d = json.load(sys.stdin)
except Exception:
    print("  Javobni o\x27qib bo\x27lmadi."); sys.exit(1)

chats = {}
for u in d.get("result", []):
    for k in ("message","channel_post","edited_message","my_chat_member"):
        c = (u.get(k) or {}).get("chat")
        if c:
            chats[c["id"]] = (c.get("title") or c.get("first_name") or "?", c.get("type"))

if not chats:
    print("  Hech qanday chat topilmadi.")
    print("")
    print("  Sabablari:")
    print("    - Guruhga hali xabar yozilmagan")
    print("    - Bot guruhga qo\x27shilmagan yoki admin emas")
    print("    - Botda Privacy Mode yoqilgan")
    print("      (@BotFather → /mybots → Bot Settings → Group Privacy → Turn off)")
    print("")
    print("  Guruhga bitta xabar yozing va shu dasturni qaytadan ishga tushiring.")
    sys.exit(0)

print("  ══════════════════════════════════════════════════")
for cid, (title, ctype) in chats.items():
    belgi = "◀ GURUH — SHUNI OLING" if ctype in ("group","supergroup","channel") else "(shaxsiy chat)"
    print("")
    print("   %s" % title)
    print("   CHAT_ID:  %s   %s" % (cid, belgi))
print("")
print("  ══════════════════════════════════════════════════")
'

echo ""
echo "  Yuqoridagi CHAT_ID raqamini (minus bilan birga) nusxalab,"
echo "  Vercel'dagi Environment Variables oynasiga qo'ying."
echo ""
read -r -p "  Yopish uchun Enter bosing..."
