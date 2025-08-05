Как загрузить свой сайт в Интернет?(На хостинг)
https://www.youtube.com/watch?v=Hee8I1Owvzg&t=357s

const botToken = '8435543532:AAGfUkUm2FguwDsdJB5fp5s6U4YaN_oQ9X8';
const chatId = '994189833';

Необходимо зайти в form.js и изменить необходимое по инструкции. Также взаимодействие будет происходить в worker.js

1. Настройка Cloudflare Worker
   https://dash.cloudflare.com/794125c2dbcce20d8eadde0fb4bb41f8/home
   Шаг 1: Создайте Worker в Cloudflare
   Зайдите в Cloudflare Dashboard.

В боковом меню выберите Workers & Pages → Create application → Worker.

Дайте имя вашему Worker (например, telegram-bot-worker).

Вставьте код из worker.js в редактор.

Шаг 2: Добавьте секретные переменные (botToken и chatId)
В интерфейсе Worker перейдите во вкладку Settings → Variables.

В разделе Environment Variables добавьте:

TELEGRAM_BOT_TOKEN – ваш токен бота.

TELEGRAM_CHAT_ID – ID чата.

Обновите код Worker, используя эти переменные:

javascript
const botToken = env.TELEGRAM_BOT_TOKEN; // Доступ через env
const chatId = env.TELEGRAM_CHAT_ID;
Шаг 3: Сохраните и опубликуйте Worker
Нажмите Save and Deploy. Ваш Worker получит URL вида:

text
https://telegram-bot-worker.<your-username>.workers.dev
