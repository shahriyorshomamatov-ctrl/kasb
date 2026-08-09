/**
 * POST /api/register — ro'yxatdan o'tish arizasini Telegram botga yuboradi.
 *
 * Vercel'da Environment Variables bo'limiga qo'shing:
 *   BOT_TOKEN  — @BotFather bergan token
 *   CHAT_ID    — arizalar tushadigan chat/guruh ID
 *
 * Bu qiymatlar faqat serverda o'qiladi — brauzerga hech qachon chiqmaydi.
 */

// Oddiy xotira ichidagi limit: bitta IP daqiqasiga 5 tadan ko'p yubormasin.
const hits = new Map();
const OYNA = 60 * 1000;
const LIMIT = 5;

function tezmi(ip) {
  const hozir = Date.now();
  const ro = (hits.get(ip) || []).filter((t) => hozir - t < OYNA);
  ro.push(hozir);
  hits.set(ip, ro);
  if (hits.size > 5000) hits.clear(); // xotira o'smasin
  return ro.length > LIMIT;
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, xato: 'Faqat POST' });
  }

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;
  if (!BOT_TOKEN || !CHAT_ID) {
    console.error('BOT_TOKEN yoki CHAT_ID sozlanmagan');
    return res.status(500).json({ ok: false, xato: 'Server sozlanmagan' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};

  // ── Honeypot: bot to'ldirsa, jim turib "ok" qaytaramiz ──
  if (body.kompaniya) return res.status(200).json({ ok: true });

  const ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'nomalum';
  if (tezmi(ip)) {
    return res.status(429).json({ ok: false, xato: 'Juda tez-tez yuborilyapti' });
  }

  // ── Tekshiruv ──
  const ism = String(body.ism || '').trim().slice(0, 80);
  const raqamlar = String(body.telefon || '').replace(/\D/g, '');
  const tel = raqamlar.startsWith('998') ? raqamlar.slice(3) : raqamlar;

  if (ism.length < 2) {
    return res.status(400).json({ ok: false, xato: 'Ism juda qisqa' });
  }
  if (!/^\d{9}$/.test(tel)) {
    return res.status(400).json({ ok: false, xato: "Telefon raqam noto'g'ri" });
  }

  const toliq = '+998' + tel;
  const chiroyli = `+998 ${tel.slice(0, 2)} ${tel.slice(2, 5)} ${tel.slice(5, 7)} ${tel.slice(7, 9)}`;
  const vaqt = new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' });
  const manba = String(body.manba || '').slice(0, 120);

  const matn =
    '<b>Yangi ariza — Mobilografiya va SMM kursi</b>\n\n' +
    `<b>Ism:</b> ${esc(ism)}\n` +
    `<b>Telefon:</b> <a href="tel:${toliq}">${esc(chiroyli)}</a>\n` +
    `<b>Vaqt:</b> ${esc(vaqt)}` +
    (manba ? `\n<b>Manba:</b> ${esc(manba)}` : '');

  try {
    const tg = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: matn,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    const javob = await tg.json();
    if (!javob.ok) {
      console.error('Telegram xatosi:', javob.description);
      return res.status(502).json({ ok: false, xato: 'Xabar yuborilmadi' });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('Yuborishda xato:', e);
    return res.status(502).json({ ok: false, xato: 'Tarmoq xatosi' });
  }
}
