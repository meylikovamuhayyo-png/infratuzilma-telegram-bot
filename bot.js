require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const fs = require('fs');
const path = require('path');

// ═══════════════════════════════════════════════════════════════
// Express Web Server (для Render)
// ═══════════════════════════════════════════════════════════════
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bot veb-serveri (Express) ishlayapti!');
});

app.listen(PORT, () => {
  console.log(`🌐 Express web-server ${PORT}-portda ishga tushdi.`);
});

// ═══════════════════════════════════════════════════════════════
// Настройки Бота и Администратора
// ═══════════════════════════════════════════════════════════════
const TOKEN = process.env.BOT_TOKEN;
const ADMIN_ID = process.env.ADMIN_ID;

if (!TOKEN || !ADMIN_ID) {
  console.error('❌ BOT_TOKEN yoki ADMIN_ID topilmadi!');
  process.exit(1);
}

const bot = new TelegramBot(TOKEN, { polling: true });
console.log('🤖 Bot ishga tushdi!');

// ═══════════════════════════════════════════════════════════════
// База данных студентов (для Soha iqtisodiyoti)
// ═══════════════════════════════════════════════════════════════
const SOHA_STUDENTS_PATH = path.join(__dirname, 'soha iqtisodiyoti va menejmenti', 'students.json');

function loadSohaStudentsDB() {
  try {
    if (fs.existsSync(SOHA_STUDENTS_PATH)) {
      const data = fs.readFileSync(SOHA_STUDENTS_PATH, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('❌ Talabalar bazasini yuklashda xatolik:', err.message);
  }
  return { groups: {} };
}

function findSohaStudent(fullName) {
  const db = loadSohaStudentsDB();
  const searchName = fullName.trim().toLowerCase();
  for (const [groupName, students] of Object.entries(db.groups)) {
    for (const student of students) {
      if (student.toLowerCase() === searchName) {
        return { found: true, name: student, group: groupName };
      }
    }
  }
  return { found: false };
}

// ═══════════════════════════════════════════════════════════════
// 1. Тестовые вопросы по предмету Infratuzilma iqtisodiyoti
// ═══════════════════════════════════════════════════════════════
const INFRATUZILMA_QUESTIONS = [
  {
    question: "Infratuzilma iqtisodiyoti fanining predmetini eng aniq ifodalovchi javobni aniqlang.",
    options: [
      "Faqat ishlab chiqarish korxonalarining moliyaviy natijalarini o‘rganish",
      "Insonlar tomonidan barpo etiladigan va o‘zaro hamkorlikni tarkiblovchi siyosiy, iqtisodiy hamda ijtimoiy me’yor va qoidalarni o‘rganish",
      "Faqat davlat budjeti daromadlarini o‘rganish",
      "Ishlab chiqarish texnologiyalarini texnik jihatdan baholash"
    ],
    correct: 1
  },
  {
    question: "Korxonada elektr energiyasi va internetning 24 soat uzilishi eng avvalo nimani ko‘rsatadi?",
    options: [
      "Infratuzilmaning iqtisodiy tizim faoliyatining zarur sharti ekanini",
      "Infratuzilma faqat davlat sektoriga xizmat qilishini",
      "Ishlab chiqarish infratuzilmadan mustaqil ekanini",
      "Infratuzilmaning faqat ijtimoiy vazifa bajarishini"
    ],
    correct: 0
  }
];

// ═══════════════════════════════════════════════════════════════
// 2. Тестовые вопросы по предмету Soha iqtisodiyoti va menejmenti
// ═══════════════════════════════════════════════════════════════
const SOHA_QUESTIONS = [
  {
    question: "1. Asosiy fondlarning aylanma aktivlardan asosiy farqi nimada?",
    options: [
      "Bir ishlab chiqarish davrida sarflanib, qiymatini to'liq o'tkazadi",
      "Sotish uchun saqlanib, qiymatini savdo jarayonida shakllantiradi",
      "Uzoq muddat foydalanilib, qiymatini mahsulotga qismlab o'tkazadi",
      "Qisqa muddat foydalanilib, qiymatini korxona foydasiga o'tkazadi"
    ],
    correct: 2
  },
  {
    question: "2. Quyidagi obyektlardan qaysi biri noishlab chiqarish asosiy fondlariga kiradi?",
    options: [
      "Korxona xodimlariga xizmat qiladigan bolalar bog'chasi binosi",
      "Korxona mahsulotlarini tayyorlashda ishlatiladigan ishlab chiqarish binosi",
      "Korxona xomashyosini tashishga mo'ljallangan yuk transporti vositasi",
      "Korxona uskunalarini energiya bilan ta'minlaydigan uzatish qurilmasi"
    ],
    correct: 0
  },
  {
    question: "3. Asosiy fondlarning aktiv qismini oshirishga qaysi tadbir bevosita xizmat qiladi?",
    options: [
      "Ma'muriy binolar uchun qo'shimcha xonalar ajratish",
      "Xodimlar turar joylarining umumiy maydonini kengaytirish",
      "Korxona hududidagi dam olish joylarini ko'paytirish",
      "Ishlab chiqarish uchun yangi dastgohlar xarid qilish"
    ],
    correct: 3
  },
  {
    question: "4. Asosiy fondlarning turlar bo'yicha tuzilmasi qanday aniqlanadi?",
    options: [
      "Har bir fond guruhining umumiy xodimlar soniga nisbati orqali",
      "Har bir fond guruhining umumiy fondlar qiymatidagi ulushi orqali",
      "Har bir fond guruhining yillik mahsulot hajmiga nisbati orqali",
      "Har bir fond guruhining umumiy ishlab chiqarish xarajatidagi ulushi orqali"
    ],
    correct: 1
  },
  {
    question: "5. Uskunani sotib olish, yetkazish va o'rnatish xarajatlari qaysi qiymatni shakllantiradi?",
    options: [
      "Uskunaning foydalanish davri oxiridagi tugatish qiymatini",
      "Uskunaning eskirish chegirilgan holatdagi qoldiq qiymatini",
      "Uskunaning foydalanishga topshirish paytidagi boshlang'ich qiymatini",
      "Uskunaning joriy sharoitda qayta yaratilish tiklanish qiymatini"
    ],
    correct: 2
  },
  {
    question: "6. Uskunaning tiklanish qiymati qanday iqtisodiy mazmunni ifodalaydi?",
    options: [
      "Uskunani hozirgi sharoitda qayta yaratish uchun zarur qiymatni",
      "Uskunani dastlab sotib olish uchun sarflangan tarixiy qiymatni",
      "Uskunaning mahsulot tannarxiga o'tkazilgan jami eskirish qiymatini",
      "Uskunaning foydalanish yakunida sotilishidan olinadigan tugatish qiymatini"
    ],
    correct: 0
  },
  {
    question: "12. Amortizatsiya jarayonining asosiy iqtisodiy mazmuni nimadan iborat?",
    options: [
      "Asosiy fondlar qiymatini korxona daromadiga to'liq qo'shish",
      "Asosiy fondlar qiymatini mahsulot tannarxiga bosqichma-bosqich o'tkazish",
      "Asosiy fondlar qiymatini aylanma mablag'lardan butunlay ajratish",
      "Asosiy fondlar qiymatini sotish narxiga bir martada o'tkazish"
    ],
    correct: 1
  },
  {
    question: "13. Uskuna qiymati 80 mln so'm, yillik amortizatsiya normasi 10%. Yillik amortizatsiya ajratmasi qancha?",
    options: [
      "6 mln so'm",
      "7 mln so'm",
      "8 mln so'm",
      "9 mln so'm"
    ],
    correct: 2
  },
  {
    question: "14. Bir maromli amortizatsiya usulining asosiy xususiyati qaysi?",
    options: [
      "Amortizatsiya summasi xizmat yillari davomida teng taqsimlanadi",
      "Amortizatsiya summasi dastlabki xizmat yilida to'liq hisoblanadi",
      "Amortizatsiya summasi ishlab chiqarilgan mahsulotga qarab belgilanadi",
      "Amortizatsiya summasi faqat uskunani sotish vaqtida hisoblanadi"
    ],
    correct: 0
  },
  {
    question: "15. Tezlashtirilgan amortizatsiya usuli korxonaga qanday imkoniyat yaratadi?",
    options: [
      "Uskunaning jismoniy eskirish jarayonini butunlay to'xtatish imkonini",
      "Uskunaning xizmat muddatini qo'shimcha xarajatlarsiz uzaytirish imkonini",
      "Uskunaning mahsulot ishlab chiqarishdagi ishtirokini kamaytirish imkonini",
      "Uskuna qiymatining katta qismini dastlabki yillarda qoplash imkonini"
    ],
    correct: 3
  },
  {
    question: "16. Ishlab chiqarish quvvati qaysi ko'rsatkichni ifodalaydi?",
    options: [
      "Korxonaning muayyan davrda haqiqatda sotgan mahsulotlari miqdorini",
      "Korxonaning ilg'or sharoitlarda ishlab chiqarishi mumkin bo'lgan maksimal mahsulot miqdorini",
      "Korxonaning muayyan davrda omborda saqlayotgan tayyor mahsulotlari miqdorini",
      "Korxonaning mavjud shartnomalar asosida yetkazib berishi kerak bo'lgan mahsulot miqdorini"
    ],
    correct: 1
  },
  {
    question: "17. Korxonaning ishlab chiqarish quvvati, avvalo, qaysi bo'g'inlar asosida aniqlanadi?",
    options: [
      "Asosiy sexlar, bosh uchastkalar va asosiy uskunalar quvvati asosida",
      "Savdo bo'limlari, xizmat guruhlari va tayyor mahsulot omborlari asosida",
      "Moliya bo'limlari, hisob guruhlari va mavjud pul mablag'lari asosida",
      "Kadrlar bo'limlari, boshqaruv guruhlari va ma'muriy binolar asosida"
    ],
    correct: 0
  },
  {
    question: "18. Sexda 5 ta uskuna mavjud. Har birining yillik ish vaqti 2 000 soat, mahsulot birligiga vaqt sarfi 2 soat. Sexning yillik quvvati qancha?",
    options: [
      "4 000 dona mahsulot",
      "6 000 dona mahsulot",
      "5 000 dona mahsulot",
      "7 000 dona mahsulot"
    ],
    correct: 2
  },
  {
    question: "19. Uskunalar soni va ish vaqti o'zgarmasa, mahsulot birligiga sarflanadigan vaqtning kamayishi qanday natija beradi?",
    options: [
      "Ishlab chiqarish quvvatining kamayishiga olib keladi",
      "Ishlab chiqarish quvvatining oshishiga olib keladi",
      "Ishlab chiqarish quvvatining o'zgarmasligiga olib keladi",
      "Ishlab chiqarish quvvatining tugatilishiga olib keladi"
    ],
    correct: 1
  },
  {
    question: "20. Ishlab chiqarish quvvati va uskunalarning yuklanishi o'rtasidagi farq qaysi javobda to'g'ri ko'rsatilgan?",
    options: [
      "Quvvat haqiqiy sotuvni, yuklanish esa mahsulot narxini ifodalaydi",
      "Quvvat ombordagi zaxirani, yuklanish esa xomashyo qiymatini ifodalaydi",
      "Quvvat korxona foydasini, yuklanish esa amortizatsiya summasini ifodalaydi",
      "Quvvat maksimal imkoniyatni, yuklanish esa undan foydalanish darajasini ifodalaydi"
    ],
    correct: 3
  }
];

// ═══════════════════════════════════════════════════════════════
// Вспомогательные функции
// ═══════════════════════════════════════════════════════════════
const sessions = new Map();
const nameWaiting = new Map();
const TIME_LIMIT_MS = 10 * 60 * 1000; // 10 минут

function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function prepareQuestions(questionBank) {
  const shuffled = shuffleArray(questionBank);
  return shuffled.map((q) => {
    const correctAnswer = q.options[q.correct];
    const shuffledOptions = shuffleArray(q.options);
    return {
      question: q.question,
      options: shuffledOptions,
      correct: shuffledOptions.indexOf(correctAnswer),
    };
  });
}

function getOptionLetter(index) {
  return String.fromCharCode(65 + index);
}

function sendQuestion(chatId) {
  const session = sessions.get(chatId);
  if (!session) return;

  const qIndex = session.currentQuestion;
  const elapsed = Date.now() - session.startTime;

  if (elapsed >= TIME_LIMIT_MS) {
    finishTest(chatId, true);
    return;
  }

  if (qIndex >= session.questions.length) {
    finishTest(chatId, false);
    return;
  }

  const q = session.questions[qIndex];
  const remaining = Math.ceil((TIME_LIMIT_MS - elapsed) / 60000);

  let text = `📝 *Savol ${qIndex + 1}/${session.questions.length}* ⏱ _${remaining} daq. qoldi_\n\n`;
  text += `📚 *Fan:* ${session.subjectName}\n\n`;
  text += `❓ ${q.question}\n\n`;

  const keyboard = q.options.map((opt, i) => [
    {
      text: `${getOptionLetter(i)}) ${opt}`,
      callback_data: `ans_${qIndex}_${i}`,
    },
  ]);

  bot.sendMessage(chatId, text, {
    parse_mode: 'Markdown',
    protect_content: true,
    reply_markup: { inline_keyboard: keyboard },
  });
}

// ═══════════════════════════════════════════════════════════════
// Завершение теста и запись результатов в отдельные папки
// ═══════════════════════════════════════════════════════════════
function finishTest(chatId, timeOut) {
  const session = sessions.get(chatId);
  if (!session || session.finished) return;

  session.finished = true;
  if (session.timer) clearTimeout(session.timer);

  const total = session.questions.length;
  const correct = session.correctAnswers;
  const wrong = session.answeredCount - correct;
  const unanswered = total - session.answeredCount;
  const percentage = Math.round((correct / total) * 100);
  const endTime = new Date();
  const duration = Math.round((endTime - session.startTime) / 1000);
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  let grade = '';
  if (percentage >= 86) grade = "A'lo (5)";
  else if (percentage >= 71) grade = "Yaxshi (4)";
  else if (percentage >= 56) grade = "Qoniqarli (3)";
  else grade = "Qoniqarsiz (2)";

  // Отправка результата пользователю
  const userResult = `
${timeOut ? '⏰ *Vaqt tugadi!*\n\n' : '✅ *Test yakunlandi!*\n\n'}📊 *Sizning natijangiz:*

📚 Fan: *${session.subjectName}*
📝 Jami savollar: ${total}
✅ To'g'ri javoblar: ${correct}
❌ Noto'g'ri javoblar: ${wrong}
⏭ Javob berilmagan: ${unanswered}
📈 Foiz: ${percentage}%
🎓 Baho: ${grade}
⏱ Sarflangan vaqt: ${minutes} daq. ${seconds} son.
  `;

  bot.sendMessage(chatId, userResult, { parse_mode: 'Markdown', protect_content: true });

  // Уведомление администратору
  const user = session.user;
  const adminReport = `
📋 *YANGI TEST NATIJASI*
📚 *Fan:* ${session.subjectName}

👤 *Talaba:*
├ Ism-familiya: ${session.studentName}
├ Guruh: ${session.studentGroup}
├ Username: ${user.username ? '@' + user.username : '—'}
└ User ID: \`${user.id}\`

📅 *Sana:* ${endTime.toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' })}

📊 *Natija:*
├ ✅ To'g'ri: ${correct} / ${total} (${percentage}%)
└ 🎓 Baho: ${grade}
${timeOut ? '\n⚠️ Vaqt tugaganligi sababli test avtomatik yakunlandi.' : ''}
`;

  bot.sendMessage(ADMIN_ID, adminReport, { parse_mode: 'Markdown' }).catch((err) => {
    console.error('❌ Adminga xabar yuborishda xatolik:', err.message);
  });

  // Запись результатов в нужную папку
  let folderName = session.isSohaStudent ? 'soha_iqtisodiyoti' : 'infratuzilma_iqtisodiyoti';
  const targetFolder = path.join(__dirname, 'natijalar', folderName);

  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder, { recursive: true });
  }

  const logFile = path.join(targetFolder, 'natijalar.txt');
  const logLine = `[${endTime.toLocaleString('uz-UZ')}] | Guruh: ${session.studentGroup} | Talaba: ${session.studentName} | Natija: ${correct}/${total} (${percentage}%) | Baho: ${grade}\n`;

  fs.appendFile(logFile, logLine, (err) => {
    if (err) console.error('❌ Natijani faylga yozishda xatolik:', err.message);
  });

  sessions.delete(chatId);
}

// ═══════════════════════════════════════════════════════════════
// Обработчики Telegram
// ═══════════════════════════════════════════════════════════════
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const name = msg.from.first_name || "Do'stim";

  if (sessions.has(chatId)) {
    bot.sendMessage(chatId, '⚠️ Sizda test davom etmoqda! Avval uni yakunlang.', { protect_content: true });
    return;
  }

  nameWaiting.set(chatId, { user: msg.from });

  bot.sendMessage(
    chatId,
    `🎓 *Assalomu alaykum, ${name}!*\n\n✍️ *Iltimos, ism va familiyangizni to'liq kiriting:*\n\n_Masalan: Abdullayev Sardor_`,
    { parse_mode: 'Markdown', protect_content: true }
  );
});

bot.on('message', (msg) => {
  if (!msg.text || msg.text.startsWith('/')) return;
  const chatId = msg.chat.id;

  if (sessions.has(chatId)) {
    bot.sendMessage(chatId, '📝 Test davom etmoqda! Iltimos, savollarga javob bering.', { protect_content: true });
    return;
  }

  if (nameWaiting.has(chatId)) {
    const fullName = msg.text.trim();

    if (fullName.length < 3) {
      bot.sendMessage(chatId, "⚠️ Iltimos, ism va familiyangizni to'liq kiriting.", { protect_content: true });
      return;
    }

    const sohaCheck = findSohaStudent(fullName);
    nameWaiting.delete(chatId);

    let subjectName = "Infratuzilma iqtisodiyoti";
    let questionBank = INFRATUZILMA_QUESTIONS;
    let isSohaStudent = false;
    let studentGroup = "Umumiy foydalanuvchi";
    let studentName = fullName;

    if (sohaCheck.found) {
      subjectName = "Soha iqtisodiyoti va menejmenti";
      questionBank = SOHA_QUESTIONS;
      isSohaStudent = true;
      studentGroup = sohaCheck.group;
      studentName = sohaCheck.name;
    }

    nameWaiting.set(chatId, {
      user: msg.from,
      studentName: studentName,
      studentGroup: studentGroup,
      subjectName: subjectName,
      questionBank: questionBank,
      isSohaStudent: isSohaStudent,
    });

    const welcomeMsg = `
✅ *Xush kelibsiz, ${studentName}!*
📋 *Guruh:* ${studentGroup}
📚 *Sizga ajratilgan fan:* ${subjectName}
📝 *Savollar soni:* ${questionBank.length} ta
⏱ *Vaqt:* 10 daqiqa

Tayyor bo'lsangiz, tugmani bosing 👇
    `;

    bot.sendMessage(chatId, welcomeMsg, {
      parse_mode: 'Markdown',
      protect_content: true,
      reply_markup: {
        inline_keyboard: [[{ text: '🚀 Testni boshlash', callback_data: 'start_test' }]],
      },
    });
    return;
  }

  bot.sendMessage(chatId, "👋 Testni boshlash uchun /start buyrug'ini yuboring.");
});

bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  if (data === 'start_test') {
    if (sessions.has(chatId)) {
      bot.answerCallbackQuery(query.id, { text: '⚠️ Test allaqachon boshlangan!' });
      return;
    }

    const userData = nameWaiting.get(chatId);
    if (!userData) {
      bot.sendMessage(chatId, "⚠️ Seans eskirgan. Qaytadan /start bosing.");
      return;
    }

    nameWaiting.delete(chatId);
    const questions = prepareQuestions(userData.questionBank);

    const session = {
      user: query.from,
      studentName: userData.studentName,
      studentGroup: userData.studentGroup,
      subjectName: userData.subjectName,
      isSohaStudent: userData.isSohaStudent,
      questions: questions,
      currentQuestion: 0,
      answers: {},
      correctAnswers: 0,
      answeredCount: 0,
      startTime: Date.now(),
      finished: false,
      timer: null,
    };

    session.timer = setTimeout(() => {
      if (sessions.has(chatId) && !sessions.get(chatId).finished) {
        finishTest(chatId, true);
      }
    }, TIME_LIMIT_MS);

    sessions.set(chatId, session);

    bot.answerCallbackQuery(query.id, { text: '✅ Test boshlandi! Omad!' });
    bot.sendMessage(chatId, '⏱ *Test boshlandi!* Omadingizni bersin! 🍀', { parse_mode: 'Markdown' });

    sendQuestion(chatId);
    return;
  }

  if (data.startsWith('ans_')) {
    const session = sessions.get(chatId);
    if (!session || session.finished) {
      bot.answerCallbackQuery(query.id, { text: '⚠️ Test yakunlangan!' });
      return;
    }

    const parts = data.split('_');
    const qIndex = parseInt(parts[1]);
    const aIndex = parseInt(parts[2]);

    if (session.answers[qIndex] !== undefined) {
      bot.answerCallbackQuery(query.id, { text: '⚠️ Bu savolga javob bergansiz!' });
      return;
    }

    session.answers[qIndex] = aIndex;
    session.answeredCount++;

    if (aIndex === session.questions[qIndex].correct) {
      session.correctAnswers++;
    }

    bot.answerCallbackQuery(query.id, { text: '✅ Javob qabul qilindi!' });
    session.currentQuestion = qIndex + 1;
    sendQuestion(chatId);
  }
});