require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bot veb-serveri (Express) ishlayapti!');
});

app.listen(PORT, () => {
  console.log(`🌐 Express web-server ${PORT}-portda ishga tushdi.`);
});

const TOKEN = process.env.BOT_TOKEN;
const ADMIN_ID = process.env.ADMIN_ID;

if (!TOKEN || TOKEN === 'your_bot_token_here') {
  console.error('❌ BOT_TOKEN topilmadi!');
  process.exit(1);
}

if (!ADMIN_ID) {
  console.error('❌ ADMIN_ID topilmadi!');
  process.exit(1);
}

const bot = new TelegramBot(TOKEN, { polling: true });

console.log('🤖 Bot ishga tushdi!');
console.log(`📋 Admin ID: ${ADMIN_ID}`);

// ═══════════════════════════════════════════════════════════════
// 20 ta savol — Infratuzilma iqtisodiyoti (Orta daraja)
// ═══════════════════════════════════════════════════════════════
const ALL_QUESTIONS = [
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
  },
  {
    question: "Qashqadaryo va Samarqand transport infratuzilmasidagi farqlarni aniqlash uchun qaysi usul eng mos?",
    options: [
      "Prognozlash",
      "Ekonometrik usul",
      "Taqqoslash",
      "Ilmiy abstraksiya"
    ],
    correct: 2
  },
  {
    question: "2021–2025-yillarda infratuzilmaga yo‘naltirilgan investitsiyalarning yillar bo‘yicha o‘zgarishini o‘rganishda qaysi usul mos?",
    options: [
      "Statistik tahlil",
      "Deduksiya",
      "Taqqoslash",
      "Ilmiy abstraksiya"
    ],
    correct: 0
  },
  {
    question: "Investitsiyalar hajmi bilan iqtisodiy o‘sish o‘rtasidagi bog‘liqlikning miqdoriy darajasini aniqlash uchun qaysi usul tanlanadi?",
    options: [
      "Tarixiy usul",
      "Ekonometrik usul",
      "Mantiqiy usul",
      "Taqqoslash"
    ],
    correct: 1
  },
  {
    question: "2030-yilgacha infratuzilmaga bo‘lgan ehtiyojni aniqlash vazifasiga qaysi usul bevosita mos?",
    options: [
      "Taqqoslash",
      "Statistik guruhlash",
      "Prognozlash",
      "Ilmiy abstraksiya"
    ],
    correct: 2
  },
  {
    question: "Qaysi biri slaydda keltirilgan umumiy ilmiy tadqiqot usullari tarkibiga kirmaydi?",
    options: [
      "Induksiya va deduksiya",
      "Tahlil va sintez",
      "Tizimli yondashuv",
      "Ekonometrik modellashtirish"
    ],
    correct: 3
  },
  {
    question: "Infratuzilma tizimini elementlarga ajratib o‘rganib, keyin ularni yagona tizim sifatida birlashtirishda qaysi usullar qo‘llanadi?",
    options: [
      "Induksiya va deduksiya",
      "Tahlil va sintez",
      "Tarixiy va mantiqiy",
      "Taqqoslash va prognozlash"
    ],
    correct: 1
  },
  {
    question: "Slaydda infratuzilma tushunchasining iqtisodiy mohiyati qanday ifodalangan?",
    options: [
      "Iqtisodiy tizimdan tashqaridagi mustaqil sektor",
      "Iqtisodiy tizimning asosi, poydevori va ichki tuzilmasi",
      "Faqat ishlab chiqarish binolari majmui",
      "Faqat davlat moliyalashtiradigan obyektlar majmui"
    ],
    correct: 1
  },
  {
    question: "Infratuzilma iqtisodiyoti fanining vazifasi qaysi javobda to‘g‘ri ifodalangan?",
    options: [
      "Faqat infratuzilma obyektlari sonini hisoblash",
      "Bozor ishtirokchilari va infratuzilmalar rivojlanishi, qonuniyatlari hamda harakatlari modellarini optimallashtirish",
      "Korxonalarning faqat ishlab chiqarish hajmini oshirish",
      "Davlat budjeti xarajatlarini kamaytirish"
    ],
    correct: 1
  },
  {
    question: "Qaysi holat iqtisodiy o‘sishni to‘liqroq ifodalaydi?",
    options: [
      "Faqat YIMning mutlaq ko‘payishi",
      "Faqat aholi sonining ko‘payishi",
      "YIMning mutlaq va aholi jon boshiga o‘sishi, resurs samaradorligi, sifat va tarkibning yaxshilanishi",
      "Faqat davlat xarajatlarining ko‘payishi"
    ],
    correct: 2
  },
  {
    question: "Infratuzilmaning makroiqtisodiy o‘sishga bilvosita ta’siri qanday namoyon bo‘ladi?",
    options: [
      "Faqat soliqlarni kamaytirish orqali",
      "Ishlab chiqarish omillarini rag‘batlantirish yoki ularning samaradorligini oshirish orqali",
      "Importni to‘liq cheklash orqali",
      "Pul massasini ko‘paytirish orqali"
    ],
    correct: 1
  },
  {
    question: "Slaydda keltirilgan Mark Zandi fikriga ko‘ra, infratuzilmaga sarflangan har bir dollar qancha daromad keltiradi?",
    options: [
      "1,09 dollar",
      "1,29 dollar",
      "1,59 dollar",
      "2,59 dollar"
    ],
    correct: 2
  },
  {
    question: "2021–2025-yillarda besh soha orasida jami asosiy kapitalga investitsiya hajmi eng katta bo‘lgan soha qaysi?",
    options: [
      "Transport va saqlash",
      "Ishlab chiqarish sanoati",
      "Axborot va aloqa",
      "Elektr energiyasi, gaz, bug‘ va konditsiyalash"
    ],
    correct: 1
  },
  {
    question: "Besh soha ichida real o‘sish ko‘rsatkichi eng yuqori bo‘lgan soha qaysi?",
    options: [
      "Ishlab chiqarish sanoati",
      "Elektr energetikasi",
      "Transport va saqlash",
      "Axborot va aloqa"
    ],
    correct: 3
  },
  {
    question: "“Eng ko‘p investitsiya kiritilgan soha doimo eng tez o‘sadi” fikriga qaysi natija zid keladi?",
    options: [
      "Ishlab chiqarish sanoatida 516,299 trln so‘m investitsiya va +40,9% o‘sish, axborot va aloqada 52,019 trln so‘m investitsiya va +202,8% o‘sish",
      "Barcha sohalarda investitsiyalar mavjudligi",
      "Transportga investitsiyalar kiritilgani",
      "Energetikada o‘sish kuzatilgani"
    ],
    correct: 0
  },
  {
    question: "239,280 trln so‘m jami investitsiya va +52,0% real o‘sish qaysi sohaga tegishli?",
    options: [
      "Ishlab chiqarish sanoati",
      "Elektr energiyasi, gaz, bug‘ va konditsiyalash",
      "Transport va saqlash",
      "Qishloq, o‘rmon va baliqchilik xo‘jaligi"
    ],
    correct: 1
  },
  {
    question: "Transport va saqlash sohasining 2021–2025-yillardagi jami investitsiyasi va real o‘sishi qaysi?",
    options: [
      "117,745 trln so‘m; +63,9%",
      "122,357 trln so‘m; +21,1%",
      "239,280 trln so‘m; +52,0%",
      "52,019 trln so‘m; +202,8%"
    ],
    correct: 0
  },
  {
    question: "Transport, energetika, aloqa va boshqa elementlarni o‘zaro bog‘langan yagona majmua sifatida tahlil qilish qaysi yondashuvga mos?",
    options: [
      "Tizimli yondashuv",
      "Faqat induksiya",
      "Faqat tarixiy usul",
      "Ilmiy abstraksiyadan voz kechish"
    ],
    correct: 0
  },
  {
    question: "Investitsiya va real o‘sish ma’lumotlarini birgalikda tahlil qilganda qaysi xulosa ma’lumotlarga bevosita mos?",
    options: [
      "Investitsiya va o‘sish barcha sohalarda bir xil tartibda o‘zgaradi",
      "Eng kam investitsiya olgan soha albatta eng past o‘sishga ega",
      "Investitsiya hajmi va real o‘sish sur’ati bo‘yicha sohalarning reytingi bir xil emas",
      "Investitsiya real o‘sishga hech qanday aloqador emas"
    ],
    correct: 2
  }
];

// ═══════════════════════════════════════════════════════════════
// Foydalanuvchi sessiyalari
// ═══════════════════════════════════════════════════════════════
const sessions = new Map();
const TIME_LIMIT_MS = 10 * 60 * 1000; // 10 daqiqa

function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function prepareQuestions() {
  const shuffledQuestions = shuffleArray(ALL_QUESTIONS);
  return shuffledQuestions.map((q) => {
    const correctAnswer = q.options[q.correct];
    const shuffledOptions = shuffleArray(q.options);
    const newCorrectIndex = shuffledOptions.indexOf(correctAnswer);
    return {
      question: q.question,
      options: shuffledOptions,
      correct: newCorrectIndex,
    };
  });
}

function getOptionLetter(index) {
  return String.fromCharCode(65 + index); // A, B, C, D
}

// ═══════════════════════════════════════════════════════════════
// Savolni yuborish
// ═══════════════════════════════════════════════════════════════
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

  let text = `📝 *Savol ${qIndex + 1}/20*  ⏱ _${remaining} daq. qoldi_\n\n`;
  text += `❓ ${q.question}\n\n`;

  const keyboard = q.options.map((opt, i) => {
    return [
      {
        text: `${getOptionLetter(i)}) ${opt}`,
        callback_data: `ans_${qIndex}_${i}`,
      },
    ];
  });

  bot.sendMessage(chatId, text, {
    parse_mode: 'Markdown',
    protect_content: true,
    reply_markup: {
      inline_keyboard: keyboard,
    },
  });
}

// ═══════════════════════════════════════════════════════════════
// Testni tugatish
// ═══════════════════════════════════════════════════════════════
function finishTest(chatId, timeOut) {
  const session = sessions.get(chatId);
  if (!session || session.finished) return;

  session.finished = true;

  if (session.timer) {
    clearTimeout(session.timer);
  }

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

  // Foydalanuvchiga natijani yuborish
  const userResult = `
${timeOut ? '⏰ *Vaqt tugadi!*\n\n' : '✅ *Test yakunlandi!*\n\n'}📊 *Sizning natijangiz:*

📚 Fan: Infratuzilma iqtisodiyoti
📝 Jami savollar: ${total}
✅ To'g'ri javoblar: ${correct}
❌ Noto'g'ri javoblar: ${wrong}
⏭ Javob berilmagan: ${unanswered}
📈 Foiz: ${percentage}%
🎓 Baho: ${grade}
⏱ Sarflangan vaqt: ${minutes} daq. ${seconds} son.
  `;

  bot.sendMessage(chatId, userResult, {
    parse_mode: 'Markdown',
    protect_content: true,
  });

  // ═══════════════════════════════════════════════
  // Adminga natijani yuborish
  // ═══════════════════════════════════════════════
  const user = session.user;
  const adminReport = `
📋 *YANGI TEST NATIJASI*

👤 *Talaba:*
├ Ism: ${user.first_name || '—'} ${user.last_name || ''}
├ Username: ${user.username ? '@' + user.username : '—'}
├ User ID: \`${user.id}\`
└ Til: ${user.language_code || '—'}

📚 *Fan:* Infratuzilma iqtisodiyoti
📅 *Sana:* ${endTime.toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' })}

📊 *Natija:*
├ ✅ To'g'ri: ${correct} / ${total}
└ 🎓 Baho: ${grade}
${timeOut ? '\n⚠️ Vaqt tugaganligi sababli test avtomatik yakunlandi.' : ''}
`;

  // Adminga faqat to'g'ri javob va baho yuboriladi
  bot.sendMessage(ADMIN_ID, adminReport, {
    parse_mode: 'Markdown',
  }).catch((err) => {
    console.error('❌ Adminga xabar yuborishda xatolik:', err.message);
  });

  sessions.delete(chatId);
}

// ═══════════════════════════════════════════════════════════════
// /start - Botni boshlash
// ═══════════════════════════════════════════════════════════════
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const name = msg.from.first_name || "Do'stim";

  if (sessions.has(chatId)) {
    bot.sendMessage(chatId, '⚠️ Sizda hali test davom etmoqda! Avval uni yakunlang.', {
      protect_content: true,
    });
    return;
  }

  const welcome = `
🎓 *Assalomu alaykum, ${name}!*

📚 *Fan:* Infratuzilma iqtisodiyoti
📝 *Savollar soni:* 20 ta
⏱ *Vaqt:* 10 daqiqa
🔀 *Savollar va javoblar aralashtirilgan*

📌 *Qoidalar:*
• Har bir savolga bitta to'g'ri javob bor
• Javob tanlagandan keyin ortga qaytib bo'lmaydi
• Vaqt tugasa test avtomatik yakunlanadi
• Natija o'qituvchiga yuboriladi
• Ishlagan savollaringiz to'g'ri yoki noto'g'riligi sizga sir qoladi

Tayyor bo'lsangiz quyidagi tugmani bosing 👇
  `;

  bot.sendMessage(chatId, welcome, {
    parse_mode: 'Markdown',
    protect_content: true,
    reply_markup: {
      inline_keyboard: [
        [{ text: '🚀 Testni boshlash', callback_data: 'start_test' }],
      ],
    },
  });
});

// ═══════════════════════════════════════════════════════════════
// /myid - ID ni ko'rish
// ═══════════════════════════════════════════════════════════════
bot.onText(/\/myid/, (msg) => {
  bot.sendMessage(msg.chat.id, `🆔 Sizning Telegram ID: \`${msg.from.id}\``, {
    parse_mode: 'Markdown',
  });
});

// ═══════════════════════════════════════════════════════════════
// Callback query handler
// ═══════════════════════════════════════════════════════════════
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  if (data === 'start_test') {
    if (sessions.has(chatId)) {
      bot.answerCallbackQuery(query.id, { text: '⚠️ Test allaqachon boshlangan!' });
      return;
    }

    const questions = prepareQuestions();

    const session = {
      user: query.from,
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

    bot.sendMessage(chatId, '⏱ *Test boshlandi!* Sizda 10 daqiqa vaqt bor.\n\nOmad tilayman! 🍀', {
      parse_mode: 'Markdown',
      protect_content: true,
    });

    sendQuestion(chatId);
    return;
  }

  if (data.startsWith('ans_')) {
    const session = sessions.get(chatId);
    if (!session || session.finished) {
      bot.answerCallbackQuery(query.id, { text: '⚠️ Test topilmadi yoki yakunlangan!' });
      return;
    }

    const parts = data.split('_');
    const qIndex = parseInt(parts[1]);
    const aIndex = parseInt(parts[2]);

    if (session.answers[qIndex] !== undefined) {
      bot.answerCallbackQuery(query.id, { text: '⚠️ Bu savolga allaqachon javob bergansiz!' });
      return;
    }

    const elapsed = Date.now() - session.startTime;
    if (elapsed >= TIME_LIMIT_MS) {
      bot.answerCallbackQuery(query.id, { text: '⏰ Vaqt tugadi!' });
      finishTest(chatId, true);
      return;
    }

    session.answers[qIndex] = aIndex;
    session.answeredCount++;

    const q = session.questions[qIndex];
    if (aIndex === q.correct) {
      session.correctAnswers++;
    }

    // Talabaga javobi to'g'ri yoki noto'g'riligi aytilmaydi
    bot.answerCallbackQuery(query.id, { text: '✅ Javob qayd etildi!' });

    session.currentQuestion = qIndex + 1;
    sendQuestion(chatId);
  }
});

// ═══════════════════════════════════════════════════════════════
// Oddiy xabarlarga javob
// ═══════════════════════════════════════════════════════════════
bot.on('message', (msg) => {
  if (!msg.text || msg.text.startsWith('/')) return;

  const chatId = msg.chat.id;

  if (sessions.has(chatId)) {
    bot.sendMessage(chatId, '📝 Test davom etmoqda! Iltimos, savolga javob bering.', {
      protect_content: true,
    });
    return;
  }

  bot.sendMessage(chatId, '👋 Testni boshlash uchun /start buyrug\'ini yuboring.', {
    protect_content: true,
  });
});

// ═══════════════════════════════════════════════════════════════
// Xatoliklarni ushlash
// ═══════════════════════════════════════════════════════════════
bot.on('polling_error', (error) => {
  if (error.code === 'ETELEGRAM' && error.response && error.response.statusCode === 409) {
    console.error('❌ Boshqa bot instansiyasi ishlayapti! Avval uni to\'xtating.');
    process.exit(1);
  }
  console.error('❌ Polling xatosi:', error.code, error.message);
});

bot.on('error', (error) => {
  console.error('❌ Bot xatosi:', error.message);
});

console.log('✅ Bot tayyor! Telegramda /start yuboring.');
