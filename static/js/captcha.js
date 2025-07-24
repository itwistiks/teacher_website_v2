class SimpleCaptcha {
  constructor(options = {}) {
    this.options = {
      questionElementId: 'captchaQuestion',
      inputElementId: 'captcha',
      refreshButtonId: 'refreshCaptcha',
      ...options
    };
    
    this.currentCaptcha = null;
    this.init();
  }

  init() {
    this.generateCaptcha();
    
    if (this.options.refreshButtonId) {
      document.getElementById(this.options.refreshButtonId)
        ?.addEventListener('click', () => this.generateCaptcha());
    }
  }

  generateCaptcha() {
    const num1 = Math.floor(Math.random() * 5) + 1;
    const num2 = Math.floor(Math.random() * 5) + 1;
    const operators = ['+', '-', '*'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    
    let answer;
    switch(operator) {
      case '+': answer = num1 + num2; break;
      case '-': answer = num1 - num2; break;
      case '*': answer = num1 * num2; break;
    }
    
    this.currentCaptcha = {
      question: `${num1} ${operator} ${num2} = ?`,
      answer: answer.toString()
    };
    
    document.getElementById(this.options.questionElementId).textContent = 
      this.currentCaptcha.question;
  }

  validate() {
    const input = document.getElementById(this.options.inputElementId);
    const userAnswer = input?.value.trim();
    
    if (!userAnswer || userAnswer !== this.currentCaptcha?.answer) {
      this.generateCaptcha();
      input && (input.value = '');
      return false;
    }
    return true;
  }
}

// Инициализация капчи при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  window.simpleCaptcha = new SimpleCaptcha();
});