document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Загружаем данные из JSON
        const response = await fetch('/static/data/programs.json');
        if (!response.ok) throw new Error('Failed to load programs');
        
        const data = await response.json();
        console.log('Loaded programs:', data.programs);
        
        // Рендерим карточки и форму
        renderPrograms(data.programs);
        updateProgramSelect(data.programs);
        setupProgramLinks();
    } catch (error) {
        console.error('Error loading programs:', error);
        // Fallback - используем тестовые данные если JSON не загрузился
        const testData = getTestPrograms();
        renderPrograms(testData);
        updateProgramSelect(testData);
        setupProgramLinks();
    }
});

function renderPrograms(programs) {
    const container = document.querySelector('.program-cards');
    if (!container) return;

    // Сохраняем лайт-курс (если есть в HTML)
    const lightCourse = document.querySelector('.program-card.light-course');
    container.innerHTML = '';
    if (lightCourse) container.appendChild(lightCourse);

    // Рендерим карточки из данных
    programs.forEach(program => {
        const card = document.createElement('div');
        card.className = `program-card ${!program.available ? 'ege-full' : ''}`;
        
        card.innerHTML = `
            ${!program.available ? '<div class="full-label">Мест нет</div>' : ''}
            <h3>${program.title}</h3>
            <ul>${program.features.map(f => `<li>${f}</li>`).join('')}</ul>
            <div class="price">${program.price}</div>
            <a href="#contact" class="btn ${!program.available ? 'disabled' : ''}" 
               data-program-id="${program.form_value}">
                ${!program.available ? 'Запись закрыта' : 'Записаться'}
            </a>
        `;
        
        container.appendChild(card);
    });
}

function updateProgramSelect(programs) {
    const select = document.getElementById('program');
    if (!select) return;

    // Очищаем и добавляем placeholder
    select.innerHTML = '<option value="" disabled selected>Выберите программу</option>';

    // Добавляем все программы из JSON
    programs.forEach(program => {
        const option = document.createElement('option');
        option.value = program.form_value;
        option.textContent = program.title + (program.disabled ? ' (мест нет)' : '');
        option.disabled = program.disabled;
        select.appendChild(option);
    });

    // Добавляем лайт-курс вручную (если его нет в JSON)
    if (!programs.some(p => p.form_value === "0")) {
        const lightOption = document.createElement('option');
        lightOption.value = "0";
        lightOption.textContent = "Лайт-курс ОГЭ (новинка)";
        select.appendChild(lightOption);
    }
}

function setupProgramLinks() {
    document.querySelectorAll('.program-card .btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.classList.contains('disabled')) {
                e.preventDefault();
                return;
            }
            
            const programId = this.getAttribute('data-program-id');
            if (programId) {
                const programSelect = document.getElementById('program');
                if (programSelect) {
                    programSelect.value = programId;
                    
                    // Плавная прокрутка к форме
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        });
    });
}

// Тестовые данные (используются если не загрузился JSON)
function getTestPrograms() {
    return [
        {
            id: "8",
            form_value: "8",
            title: "Средняя школа",
            price: "1 750 ₽ / занятие",
            features: [
                "Качественное изучение тем",
                "Решение домашних заданий",
                "Подготовка к вступительным испытаниям",
                "Физические эксперименты",
                "Разбор сложных заданий",
                "Лайт-курс к ОГЭ включен"
            ],
            available: true,
            disabled: false
        },
        {
            id: "9",
            form_value: "9",
            title: "ОГЭ",
            price: "2 000 ₽ / занятие",
            features: [
                "Полный курс школьной программы",
                "Разбор всех типов задач ОГЭ",
                "Домашние задания",
                "Пробные тестирования",
                "Физические эксперименты",
                "Лайт-курс к ОГЭ включен"
            ],
            available: true,
            disabled: false
        },
		{
            id: "10",
            form_value: "10",
            title: "Старшая школа",
            price: "2 250 ₽ / занятие",
            features: [
                "Изучение ключевых тем",
                "Фундаментальные понятия",
                "Систематизация знаний",
                "Пробные тестирования",
                "Начало подготовки к ЕГЭ"
            ],
            available: false,
            disabled: true
        },
        {
            id: "11",
            form_value: "11",
            title: "ЕГЭ",
            price: "2 500 ₽ / занятие",
            features: [
                "Систематизация знаний",
                "Фундаментальные понятия",
                "Решение типовых задач 1 и 2 части",
                "Разбор распространенных ошибок",
                "Олимпиадные методы"
            ],
            available: false,
            disabled: true
        }
    ];
}