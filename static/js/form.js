document.getElementById('telegramForm').addEventListener('submit', async function(e) {
    e.preventDefault();

	// Проверка капчи
	if (!window.simpleCaptcha || !window.simpleCaptcha.validate()) {
		alert('Пожалуйста, правильно решите капчу');
		return;
	}
    
    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const messageDiv = document.getElementById('telegramMessage');
    
    // Блокируем кнопку на время отправки
    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправляем...';

    try {
        // Получаем название программы по значению
        const programValue = formData.get('program');
        const programNames = {
            '11': 'ЕГЭ (мест нет)',
            '0': 'Лайт-курс ОГЭ',
            '9': '9 класс (ОГЭ)',
            '8': '8 класс',
            '7': '7 класс'
        };
        const programName = programNames[programValue] || programValue;

        // Формируем текст сообщения с HTML-разметкой
        const message = `
📌 <b>Новая заявка на курс</b>

👤 <b>Имя:</b> ${escapeHtml(formData.get('name'))}
📞 <b>Телефон:</b> <code>${escapeHtml(formData.get('phone'))}</code>
🎟 <b>Промокод:</b> ${formData.get('promo') ? escapeHtml(formData.get('promo')) : 'не указан'}
📚 <b>Программа:</b> ${escapeHtml(programName)}

📝 <b>Дополнительно:</b>
${formData.get('message') ? escapeHtml(formData.get('message')) : 'нет информации'}

⏱ <i>${new Date().toLocaleString('ru-RU')}</i>
        `.trim();



		
		// Отправляем на наш сервер вместо прямого обращения к Telegram API
		/* 

        const response = await fetch('Замените путь на URL вашего Cloudflare Worker', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });

		*/


		/* Верхнее необходимо будет заменить от сюда (вроде) ---->*/

        // Ваши данные бота
        const botToken = 'Bot_Token';
        const chatId = 'My_Chat_Id';
        
        // Отправляем в Telegram
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML'
            })
        });

		/* <---- До сюда*/


        const result = await response.json();
        
        if (result.ok) {
            messageDiv.innerHTML = '<p style="color: #4CAF50;">Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.</p>';
            form.reset();
        } else {
            throw new Error(result.description || 'Ошибка отправки в Telegram');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        messageDiv.innerHTML = `<p style="color: #ff4757;">Ошибка: ${error.message}. Пожалуйста, попробуйте ещё раз или свяжитесь другим способом.</p>`;
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
    }
});

// Функция для экранирования HTML-символов (защита от XSS)
function escapeHtml(text) {
    if (!text) return '';
    return text.toString()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}