require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

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
    question: "Infratuzilma iqtisodiyotining asosiy ob'ekti nima hisoblanadi?",
    options: [
      "Iqtisodiy faoliyatni ta'minlovchi yordamchi tarmoqlar va tizimlar",
      "Faqat sanoat korxonalari",
      "Davlat boshqaruv organlari",
      "Xalqaro savdo bitimlari",
    ],
    correct: 0,
  },
  {
    question: "Ishlab chiqarish infratuzilmasi va ijtimoiy infratuzilmaning farqi nimada?",
    options: [
      "Ishlab chiqarish infratuzilmasi moddiy ishlab chiqarishga, ijtimoiy infratuzilma aholining turmush sharoitiga xizmat qiladi",
      "Farqi yo'q, ikkalasi bir xil",
      "Ijtimoiy infratuzilma faqat transport sohasini o'z ichiga oladi",
      "Ishlab chiqarish infratuzilmasi faqat qishloq xo'jaligiga tegishli",
    ],
    correct: 0,
  },
  {
    question: "Davlat-xususiy sheriklik (PPP) modelining asosiy afzalligi nimada?",
    options: [
      "Davlat xarajatlarini kamaytirgan holda xususiy sektor samaradorligidan foydalanish imkonini beradi",
      "Davlat barcha xarajatlarni o'z zimmasiga oladi",
      "Xususiy sektor boshqaruvdan to'liq chetlashtiriladi",
      "Faqat xorijiy investorlar uchun qulay",
    ],
    correct: 0,
  },
  {
    question: "Infratuzilma multiplikator effekti qanday namoyon bo'ladi?",
    options: [
      "Infratuzilmaga 1 so'm investitsiya YaIMning bir necha barobar o'sishiga olib keladi",
      "Faqat infratuzilma sohasida ish o'rinlari paydo bo'ladi",
      "Investitsiya qaytarilmaydi",
      "Faqat soliq tushumlari oshadi",
    ],
    correct: 0,
  },
  {
    question: "Transport infratuzilmasining iqtisodiy o'sishga ta'siri qanday?",
    options: [
      "Logistika xarajatlarini kamaytiradi, hududlararo savdoni kengaytiradi va ish o'rinlari yaratadi",
      "Faqat yo'lovchi tashish uchun xizmat qiladi",
      "Iqtisodiy o'sishga ta'sir qilmaydi",
      "Faqat shahar ichidagi harakatlanishni yengillashtiiradi",
    ],
    correct: 0,
  },
  {
    question: "O'zbekistonda energetika infratuzilmasining asosiy muammolaridan biri qaysi?",
    options: [
      "Energiya tarmoqlarining eskirishi va uzatish jarayonidagi yo'qotishlar yuqoriligi",
      "Energiyaga talab yo'qligi",
      "Haddan tashqari ko'p elektr stansiyalari mavjudligi",
      "Barcha hududlar barqaror energiya bilan ta'minlanganligi",
    ],
    correct: 0,
  },
  {
    question: "Konsessiya shartnomasi nima?",
    options: [
      "Davlat mulkini xususiy tashkilotga muayyan muddat uchun boshqarishga berish shartnomasi",
      "Davlat mulkini sotish shartnomasi",
      "Xorijiy kompaniyalarni mamlakatdan chiqarish hujjati",
      "Soliqlardan ozod qilish hujjati",
    ],
    correct: 0,
  },
  {
    question: "Raqamli infratuzilmaning zamonaviy iqtisodiyotdagi roli qanday?",
    options: [
      "Elektron tijorat, masofaviy ta'lim, raqamli xizmatlar va innovatsion iqtisodiyotni rivojlantiradi",
      "Faqat ijtimoiy tarmoqlar uchun kerak",
      "Iqtisodiyotga ta'sir qilmaydi",
      "Faqat davlat xavfsizligi uchun zarur",
    ],
    correct: 0,
  },
  {
    question: "BOT (Build-Operate-Transfer) modeli qanday ishlaydi?",
    options: [
      "Xususiy investor ob'ektni quradi, muayyan muddat foydalanadi, keyin davlatga topshiradi",
      "Davlat quradi, xususiy sektorga sotadi",
      "Xususiy sektor quradi va doimiy egalik qiladi",
      "Xalqaro tashkilot quradi va boshqaradi",
    ],
    correct: 0,
  },
  {
    question: "Infratuzilma loyihalarini moliyalashtirishda obligatsiyalar qanday rol o'ynaydi?",
    options: [
      "Infratuzilma obligatsiyalari orqali uzoq muddatli investitsiya mablag'larini jalb qilish mumkin",
      "Obligatsiyalar faqat qisqa muddatli foydalar uchun ishlatiladi",
      "Infratuzilma loyihalarida obligatsiyalar ishlatilmaydi",
      "Obligatsiyalar faqat xorijiy valyutada chiqariladi",
    ],
    correct: 0,
  },
  {
    question: "Suv ta'minoti infratuzilmasining qishloq xo'jaligidagi ahamiyati nimada?",
    options: [
      "Sug'orish tizimlarini ta'minlab, qishloq xo'jaligi mahsullarining hosildorligini oshiradi",
      "Qishloq xo'jaligiga aloqasi yo'q",
      "Faqat shahar aholisi uchun ahamiyatli",
      "Faqat sanoat korxonalari uchun kerak",
    ],
    correct: 0,
  },
  {
    question: "Logistika markazlarining mintaqaviy iqtisodiyotga ta'siri qanday?",
    options: [
      "Tranzit savdoni rivojlantiradi, ish o'rinlari yaratadi va hududning raqobatbardoshligini oshiradi",
      "Faqat ombor xo'jaligini tashkil qiladi",
      "Mintaqaviy iqtisodiyotga ta'sir qilmaydi",
      "Faqat import operatsiyalari uchun kerak",
    ],
    correct: 0,
  },
  {
    question: "Infratuzilma indeksida qaysi ko'rsatkichlar hisobga olinadi?",
    options: [
      "Transport, energetika, aloqa, suv ta'minoti va ijtimoiy infratuzilma sifati",
      "Faqat yo'llarning umumiy uzunligi",
      "Faqat aholi soni va YaIM",
      "Faqat harbiy salohiyat ko'rsatkichlari",
    ],
    correct: 0,
  },
  {
    question: "Yashil infratuzilma loyihalariga investitsiya kiritishning iqtisodiy foydasi nimada?",
    options: [
      "Uzoq muddatda energiya tejash, ekologik zararni kamaytirish va barqaror iqtisodiy o'sishni ta'minlaydi",
      "Qisqa muddatda katta foyda keltiradi",
      "Iqtisodiy foydasi yo'q, faqat ekologik maqsadda",
      "Faqat rivojlangan davlatlar uchun foydali",
    ],
    correct: 0,
  },
  {
    question: "O'zbekistonda transport yo'laklari (koridorlari)ning ahamiyati nimada?",
    options: [
      "Xalqaro tranzit savdoda O'zbekistonning geografik mavqeidan samarali foydalanish imkonini beradi",
      "Faqat ichki transport uchun kerak",
      "Transport yo'laklari iqtisodiyotga ta'sir qilmaydi",
      "Faqat yo'lovchi tashish uchun xizmat qiladi",
    ],
    correct: 0,
  },
  {
    question: "Amortizatsiya infratuzilma ob'ektlarida qanday ahamiyatga ega?",
    options: [
      "Ob'ektlarning eskirish darajasini hisoblab, o'z vaqtida ta'mirlash yoki yangilash rejasini tuzishga yordam beradi",
      "Amortizatsiya faqat buxgalteriya hisobi uchun kerak",
      "Infratuzilma ob'ektlari eskirmasligi sababli amortizatsiya hisoblanmaydi",
      "Amortizatsiya faqat sanoat uskunalariga tegishli",
    ],
    correct: 0,
  },
  {
    question: "Infratuzilma sohasida tabiiy monopoliya tushunchasi nimani anglatadi?",
    options: [
      "Ba'zi infratuzilma tarmoqlarida raqobat samarasiz bo'lib, bitta operator samaraliroq xizmat ko'rsatadi",
      "Barcha infratuzilma sohalari erkin raqobatga asoslangan",
      "Tabiiy monopoliya faqat savdo sohasiga tegishli",
      "Tabiiy monopoliya qonun bilan taqiqlangan",
    ],
    correct: 0,
  },
  {
    question: "Infratuzilma loyihalarida texnik-iqtisodiy asoslash (TEA) nima uchun zarur?",
    options: [
      "Loyihaning iqtisodiy samaradorligini, xarajatlarini va daromadlarini oldindan baholash uchun",
      "Faqat hukumat talabi bo'lgani uchun",
      "TEA faqat xorijiy loyihalar uchun kerak",
      "TEA loyihaning texnik tomonini o'rganmaydi",
    ],
    correct: 0,
  },
  {
    question: "Telekommunikatsiya infratuzilmasining rivojlanishi aholining hayot sifatiga qanday ta'sir qiladi?",
    options: [
      "Masofaviy ta'lim, telemedicina, elektron hukumat xizmatlariga kirishni ta'minlaydi",
      "Faqat ko'ngilochar maqsadlarga xizmat qiladi",
      "Aholining hayot sifatiga ta'sir qilmaydi",
      "Faqat biznes uchun foydali",
    ],
    correct: 0,
  },
  {
    question: "Infratuzilma investitsiyalarining qaytarilish muddati odatda qanday?",
    options: [
      "Uzoq muddatli — 10-30 yil oralig'ida, lekin barqaror iqtisodiy va ijtimoiy samara beradi",
      "Qisqa muddatli — 1-2 yil ichida to'liq qaytariladi",
      "Investitsiya hech qachon qaytarilmaydi",
      "Qaytarilish muddati 6 oy",
    ],
    correct: 0,
  },
];

// ═══════════════════════════════════════════════════════════════
// Foydalanuvchi sessiyalari
// ═══════════════════════════════════════════════════════════════
const sessions = new Map();
const TIME_LIMIT_MS = 15 * 60 * 1000; // 15 daqiqa

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
├ ❌ Noto'g'ri: ${wrong}
├ ⏭ Javob berilmagan: ${unanswered}
├ 📈 Foiz: ${percentage}%
├ 🎓 Baho: ${grade}
└ ⏱ Vaqt: ${minutes} daq. ${seconds} son.
${timeOut ? '\n⚠️ Vaqt tugaganligi sababli test avtomatik yakunlandi.' : ''}
`;

  // Batafsil javoblarni alohida xabarda yuborish (Telegram 4096 belgi limiti uchun)
  let details = '━━━━━━━━━━━━━━━━━━━━━━━━\n*Batafsil javoblar:*\n';

  session.questions.forEach((q, i) => {
    const userAnswer = session.answers[i];
    const isCorrect = userAnswer === q.correct;
    const status = userAnswer === undefined ? '⏭' : isCorrect ? '✅' : '❌';
    const userOpt = userAnswer !== undefined ? `${getOptionLetter(userAnswer)}) ${q.options[userAnswer]}` : 'Javob berilmagan';
    const correctOpt = `${getOptionLetter(q.correct)}) ${q.options[q.correct]}`;

    details += `\n${status} *${i + 1}.* ${q.question}\n`;
    details += `   Javob: ${userOpt}\n`;
    if (userAnswer !== q.correct) {
      details += `   To'g'ri: ${correctOpt}\n`;
    }
  });

  // Adminga asosiy natijani yuborish
  bot.sendMessage(ADMIN_ID, adminReport, {
    parse_mode: 'Markdown',
  }).then(() => {
    // Keyin batafsil javoblarni yuborish
    // Telegram xabar limiti 4096 belgi, shuning uchun bo'lib yuboramiz
    const chunks = splitMessage(details, 4000);
    chunks.forEach((chunk, idx) => {
      setTimeout(() => {
        bot.sendMessage(ADMIN_ID, chunk, { parse_mode: 'Markdown' }).catch(console.error);
      }, idx * 500);
    });
  }).catch((err) => {
    console.error('❌ Adminga xabar yuborishda xatolik:', err.message);
  });

  sessions.delete(chatId);
}

// Uzun xabarlarni bo'lib yuborish
function splitMessage(text, maxLength) {
  if (text.length <= maxLength) return [text];

  const chunks = [];
  let current = '';
  const lines = text.split('\n');

  for (const line of lines) {
    if ((current + '\n' + line).length > maxLength) {
      if (current) chunks.push(current);
      current = line;
    } else {
      current = current ? current + '\n' + line : line;
    }
  }
  if (current) chunks.push(current);
  return chunks;
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
⏱ *Vaqt:* 15 daqiqa
🔀 *Savollar va javoblar aralashtirilgan*

📌 *Qoidalar:*
• Har bir savolga bitta to'g'ri javob bor
• Javob tanlagandan keyin ortga qaytib bo'lmaydi
• Vaqt tugasa test avtomatik yakunlanadi
• Natija o'qituvchiga yuboriladi

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

    bot.sendMessage(chatId, '⏱ *Test boshlandi!* Sizda 15 daqiqa vaqt bor.\n\nOmad tilayman! 🍀', {
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
    const isCorrect = aIndex === q.correct;

    if (isCorrect) {
      session.correctAnswers++;
      bot.answerCallbackQuery(query.id, { text: '✅ To\'g\'ri!' });
    } else {
      bot.answerCallbackQuery(query.id, { text: '❌ Noto\'g\'ri!' });
    }

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
