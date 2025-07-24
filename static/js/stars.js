        // Создание звездного неба
        document.addEventListener('DOMContentLoaded', function() {
            const starsContainer = document.getElementById('stars-container');
            
            // Создание обычных звезд
            for (let i = 0; i < 200; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                
                // Случайные координаты и размер
                const x = Math.random() * 100;
                const y = Math.random() * 100;
                const size = Math.random() * 2 + 1;
                
                star.style.left = `${x}%`;
                star.style.top = `${y}%`;
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;
                
                // Случайная задержка анимации
                star.style.animationDelay = `${Math.random() * 3}s`;
                
                starsContainer.appendChild(star);
            }
            
            // Создание падающих звезд
            function createShootingStar() {
                const shootingStar = document.createElement('div');
                shootingStar.className = 'shooting-star';
                
                const x = Math.random() * 20;
                const y = Math.random() * 20;
                const duration = Math.random() * 5 + 5;
                
                shootingStar.style.left = `${x}%`;
                shootingStar.style.top = `${y}%`;
                shootingStar.style.animationDuration = `${duration}s`;
                
                starsContainer.appendChild(shootingStar);
                
                // Удаление после завершения анимации
                setTimeout(() => {
                    shootingStar.remove();
                }, duration * 1000);
            }
            
            // Регулярное создание падающих звезд
            setInterval(createShootingStar, 3000);
            
            // Первое создание с задержкой
            setTimeout(() => {
                createShootingStar();
            }, 1000);
        });

        // Анимация звезд при прокрутке
window.addEventListener('scroll', function() {
    const stars = document.querySelectorAll('.star');
    const scrollPosition = window.scrollY;
    
    stars.forEach(star => {
        // Скорость движения для каждой звезды (параллакс-эффект)
        const speed = parseFloat(star.style.width) * 2;
        
        // Движение звезд вверх при прокрутке вниз
        const yPos = scrollPosition * speed * 0.1;
        star.style.transform = `translateY(${yPos}px)`;
        
        // Легкое мерцание
        if (Math.random() > 0.9) {
            star.style.opacity = Math.random();
        }
    });
});
