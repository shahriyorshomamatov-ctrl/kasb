/**
 * Google Sheets uchun kod — arizalarni jadvalga yozadi.
 *
 * QAYERGA QO'YILADI:
 *   Google Sheet → yuqoridagi menyudan "Extensions" (Kengaytmalar)
 *   → "Apps Script" → chiqqan oynadagi hamma narsani o'chirib,
 *   shu faylning ichini to'liq ko'chirib qo'ying → Save (diskcha belgisi).
 *
 * KEYIN:
 *   O'ng yuqoridagi ko'k "Deploy" → "New deployment"
 *   → chapdagi ⚙ belgisi → "Web app"
 *   → Execute as:    Me
 *   → Who has access: Anyone          ← shu muhim
 *   → "Deploy" → ruxsat so'raydi, tasdiqlang
 *   → chiqqan uzun havolani nusxalang (".../exec" bilan tugaydi)
 */

var VARAQ_NOMI = 'Arizalar';

function doPost(e) {
  try {
    var kitob = SpreadsheetApp.getActiveSpreadsheet();
    var varaq = kitob.getSheetByName(VARAQ_NOMI);

    // Varaq bo'lmasa — yaratamiz va sarlavha qatorini qo'yamiz
    if (!varaq) {
      varaq = kitob.insertSheet(VARAQ_NOMI);
    }
    if (varaq.getLastRow() === 0) {
      varaq.appendRow(['Vaqt', 'Ism', 'Telefon', 'Manba']);
      varaq.getRange(1, 1, 1, 4)
           .setFontWeight('bold')
           .setBackground('#1B1A14')
           .setFontColor('#F2CE9A');
      varaq.setFrozenRows(1);
      varaq.setColumnWidth(1, 160);
      varaq.setColumnWidth(2, 180);
      varaq.setColumnWidth(3, 150);
      varaq.setColumnWidth(4, 200);
      // Telefon ustuni doim matn bo'lsin — "+998..." formula deb o'qilmasin
      varaq.getRange('C2:C').setNumberFormat('@');
    }

    var d = JSON.parse(e.postData.contents);
    var raqam = d.chiroyli || d.telefon || '';

    // Telefonni bo'sh qoldirib qator qo'shamiz.
    // Sababi: "+998..." to'g'ridan-to'g'ri yozilsa, Sheets uni formula deb
    // o'ylaydi va #ERROR! chiqaradi. Shuning uchun keyin matn sifatida qo'yamiz.
    varaq.appendRow([
      d.vaqt || new Date(),
      d.ism || '',
      '',
      d.manba || ''
    ]);

    var qator = varaq.getLastRow();
    varaq.getRange(qator, 3).setNumberFormat('@').setValue(raqam);

    return javob({ ok: true });
  } catch (xato) {
    return javob({ ok: false, xato: String(xato) });
  }
}

// Havolani brauzerda ochib tekshirish uchun
function doGet() {
  return javob({ ok: true, holat: 'ishlayapti' });
}

function javob(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
