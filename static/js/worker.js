// worker.js (размещается в Cloudflare Workers)
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const { message } = await request.json();
  const botToken = 'Bot_Token'; // Хранится в секретах Cloudflare
  const chatId = 'My_Chat_Id';

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'HTML' }),
  });

  return new Response(JSON.stringify({ success: true }), { 
    headers: { 'Content-Type': 'application/json' },
  });
}