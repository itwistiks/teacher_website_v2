document.querySelector('.details-btn').addEventListener('click', function() {
    const fullDesc = document.querySelector('.full-description');
    const btn = this;
    
    fullDesc.classList.toggle('show');
    
    if (fullDesc.classList.contains('show')) {
        btn.textContent = 'Вернуть назад ▲';
    } else {
        btn.textContent = 'Узнать больше ▼';
    }
});