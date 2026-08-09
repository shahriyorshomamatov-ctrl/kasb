# Mobilografiya va SMM kursi — landing page

Medion Marketing · Navoiy. Bitta maqsad: saytga kirgan odam kursga yozilsin.

## Uchta tugma — asosiy ishlar shular

| Faylni ikki marta bosing | Nima qiladi |
|---|---|
| **SAYTNI-OCHISH.command** | Saytni brauzerda ochadi. O'zgartirgach — Cmd+R |
| **RASM-TAYYORLASH.command** | Ustoz rasmlarini 600×600 kvadrat qilib siqadi |
| **OG-RASM-YANGILASH.command** | Havola rasmini (`images/og.jpg`) qaytadan yasaydi |

> Birinchi marta macOS ochmasa: faylni **o'ng tugma → Open → Open** qiling.

## To'ldirish kerak bo'lgan joylar

`config.js` da `[ ]` belgisi qo'yilgan qatorlar — men bilmagan ma'lumot:

| Nima | Hozir turgan qiymat |
|---|---|
| `BOSHLANISH` | `1-sentabr` — guruh qachon boshlanadi |
| `MANZIL` | `Navoiy shahri` — aniq manzil |
| `DARS_JADVALI` | `Haftasiga 3 kun` — qaysi kunlar, soat nechada |
| `JOYLAR_SONI` | `20` — guruhda nechta joy |
| `TOLOV` | bo'lib to'lash shartlari |
| `SAYT_MANZILI` | `https://kurs.kasbnavoiy.uz` — haqiqiy domen |

Qolgan hamma narsa prezentatsiyalardan olingan: 7 ta modul, 4 ta Challenge,
format, mukofot, jamoaga taklif, narx (400$ → 300$).

**Sana yoki narxni o'zgartirsangiz** — `OG-RASM-YANGILASH.command` ni bosing.

## Fayllar

```
index.html           asosiy bet
rahmat.html          forma yuborilgandan keyingi bet
config.js            ⬅ HAMMA MA'LUMOT SHU YERDA
api/register.js      Vercel serverless — arizani Telegram botga yuboradi
images/og.jpg        havola rasmi (avtomatik yasaladi)
images/og-manba.html og.jpg ning shabloni — config.js dan o'qiydi
images/ustozlar/     ustoz rasmlari
vercel.json          kesh sozlamalari
.env.example         BOT_TOKEN va CHAT_ID namunasi
```

## Ustoz rasmlari

1. Rasmni `images/ustozlar/` papkasiga tashlang: `shahriyor.jpg`, `amiriddin.jpg`
2. `RASM-TAYYORLASH.command` ni bosing

O'lcham va format farqi yo'q. Rasm qo'yilmasa sayt buzilmaydi — ism bosh harfi ko'rinadi.

## Telegram bot

Masterklass sayti bilan **bir xil botni** ishlatsangiz bo'ladi, lekin arizalar
alohida tushishi uchun **boshqa guruh** oching va o'sha guruhning `CHAT_ID` sini
qo'ying. Xabar sarlavhasi: "Yangi ariza — Mobilografiya va SMM kursi".

## Vercel'ga chiqarish

```bash
npx vercel
```

Keyin **Settings → Environment Variables**: `BOT_TOKEN`, `CHAT_ID`. So'ng:

```bash
npx vercel --prod
```

## Domen o'zgarsa

`index.html` va `rahmat.html` boshidagi `og:url` va `og:image` to'liq havolalarini,
hamda `config.js` dagi `SAYT_MANZILI` ni yangilang.
