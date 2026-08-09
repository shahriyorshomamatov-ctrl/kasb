/* ══════════════════════════════════════════════════════════════
   MANA SHU YERNI TO'LDIRING — boshqa hech qayerga tegish shart emas.
   Bu fayl index.html va rahmat.html — ikkalasiga ham ishlaydi.

   [ ] belgisi turgan joylar — men bilmagan ma'lumot, siz to'ldiring.
   ══════════════════════════════════════════════════════════════ */

window.CONFIG = {
  /* ── Kurs haqida ────────────────────────────────────────── */
  BOSHLANISH:  "1-sentabr",              // [ ] guruh qachon boshlanadi
  DAVOMIYLIK:  "3 oy",                   // 2 oy nazariy + 1 oy amaliy
  FORMAT:      "Oflayn · Navoiy",
  MANZIL:      "Navoiy shahri",          // [ ] aniq manzil
  DARS_JADVALI: "Haftasiga 3 kun",       // [ ] qaysi kunlar, soat nechada
  JOYLAR_SONI: "20",                     // [ ] guruhda nechta joy

  /* ── Narx ───────────────────────────────────────────────── */
  NARX_ESKI:   "400$",                   // chizilgan holda ko'rinadi
  NARX:        "300$",
  NARX_IZOH:   "Guruh to'lgach qabul yopiladi",
  TOLOV:       "To'liq yoki bo'lib to'lash mumkin",  // [ ] o'zingizga moslang

  /* ── Aloqa ──────────────────────────────────────────────── */
  TELEGRAM_KANAL: "https://t.me/Kasb_Navoiy",
  INSTAGRAM:      "https://instagram.com/kasb_navoiy",
  TELEFON_RAQAM:  "+998 94 758 12 27",
  SAYT_MANZILI:   "https://kurs.kasbnavoiy.uz",   // [ ] haqiqiy domen

  /* ── 7 ta modul ─────────────────────────────────────────── */
  MODULLAR: [
    ["Telefon orqali professional video olish",
     "Yorug'lik, kadr, rakurs, barqarorlik — sifatli videoning asosi."],
    ["CapCut orqali professional montaj",
     "Ritm, o'tishlar, tempo, rang va subtitr. Telefonning o'zida."],
    ["Viral Reels va kontent strategiyasi",
     "Birinchi 3 soniya, hook, oblojka, joylash vaqti va trend tahlili."],
    ["Birinchi mijozni topish va narx belgilash",
     "Buyurtmani qayerdan olish, qanday gaplashish, qancha so'rash."],
    ["Shaxsiy brend qurish",
     "O'zingizni tanitish — chunki odamlar logotipga emas, odamga ishonadi."],
    ["ChatGPT, Claude, Canva AI va CapCut AI",
     "Ssenariy, montaj va dizaynni bir necha barobar tezlashtiradigan vositalar."],
    ["SMM va bizneslarga kontent qilish",
     "Kompaniyaning butun ijtimoiy tarmog'ini boshqarish — eng barqaror daromad."]
  ],

  /* ── 4 ta Challenge ─────────────────────────────────────── */
  CHALLENGELAR: [
    ["Birinchi reels", "24 soat ichida telefonda bitta reels olib, montaj qilib topshirasiz."],
    ["Rakurs sinovi", "Bitta obyektni 5 xil rakursda olasiz. Farqni o'zingiz ko'rasiz."],
    ["Real mijoz",    "Haqiqiy biznes uchun kontent tayyorlaysiz. Natijani mijoz baholaydi."],
    ["Shaxsiy brend", "7 kun ichida o'z profilingizni butunlay o'zgartirasiz."]
  ],

  /* ── Ustozlar ───────────────────────────────────────────────
     Rasmlarni /images/ustozlar/ papkasiga tashlang, keyin
     RASM-TAYYORLASH.command ni bosing.                          */
  USTOZLAR: [
    {
      ism:    "Shahriyor Shomamatov",
      unvon:  "SMM va shaxsiy brend · Navoiy",
      rasm:   "images/ustozlar/shahriyor.jpg",
      natija: [
        "119 ming obunachi — taksist_artist loyihasi",
        "To'xtasin Odilov: 2 oyda 100+ o'quvchi",
        "Navoiydagi eng yirik o'quv markazlari bilan ishlaydi"
      ]
    },
    {
      ism:    "Mamadaminov Amiriddin",
      unvon:  "Mobilograf · ustoz · Navoiy",
      rasm:   "images/ustozlar/amiriddin.jpg",
      natija: [
        "Sohada 5 yillik yo'l — noldan boshlagan",
        "2023-yildan buyon o'z kursini o'qitadi",
        "Bog'bon jamoasi va Bobur Mansurov bilan ishlagan"
      ]
    }
  ],

  /* ── Ishonch raqamlari ──────────────────────────────────── */
  RAQAMLAR: [
    ["189 ming", "ustozlardan birining auditoriyasi"],
    ["100+",     "bitta loyihada 2 oyda kelgan o'quvchi"],
    ["1 700+",   "bitta loyihada 1 oyda kelgan so'rov"],
    ["4",        "hozirda yuritilayotgan faol loyiha"]
  ],

  /* ── Savol-javob ────────────────────────────────────────────
     Javoblarni bemalol o'zgartiring — bu sizning shartlaringiz. */
  FAQ: [
    ["Menda umuman tajriba yo'q. Uddalay olamanmi?",
     "Ha. Kurs noldan boshlanadi — birinchi modul telefonni qo'lga olishdan boshlanadi."],
    ["Qanaqa telefon kerak?",
     "Video oladigan har qanday zamonaviy telefon yetadi. Eng qimmati shart emas."],
    ["Mikrofon, shtativ, kamera sotib olishim kerakmi?",
     "Yo'q. Boshlash uchun faqat telefon. Qolgan jihozlarni birinchi daromadingizdan keyin olasiz."],
    ["Darslar qachon bo'ladi?",
     "Haftasiga 3 kun, oflayn. Aniq jadval guruh to'lgandan keyin e'lon qilinadi."],
    ["To'lovni bo'lib to'lasa bo'ladimi?",
     "Ha, bo'lib to'lash mumkin. Shartlarni qo'ng'iroq paytida kelishamiz."],
    ["Kursdan keyin ish topa olamanmi?",
     "Kurs oxirida portfolio va real loyiha tajribasi bo'ladi. Eng kuchli 6 nafar o'quvchi Medion Marketing jamoasiga taklif qilinadi."],
    ["Sertifikat berasizmi?",
     "Ha. Yakunda imtihon bo'ladi va sertifikat beriladi."]
  ]
};
