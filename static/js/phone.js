document.getElementById('phone').addEventListener('input', function (e) {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
    e.target.value = '+7' + (x[2] ? ' (' + x[2] : '') + (x[3] ? ') ' + x[3] : '') +
        (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
    
    // Проверка на полный номер (11 цифр без учёта +7)
    const isValid = e.target.value.replace(/\D/g, '').length === 11;
    e.target.setCustomValidity(isValid ? '' : 'Введите полный номер телефона');
});