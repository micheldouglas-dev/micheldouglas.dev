// ==========================================
// CONTATO.JS - Validação de Formulário
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formContact');

  if (!form) return;

  // ========== CAPTCHA DINÂMICO ==========
  let captchaAnswer = null;

  function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const operations = [
      { symbol: '+', calc: (a, b) => a + b },
      { symbol: '-', calc: (a, b) => Math.abs(a - b) }
    ];

    const operation = operations[Math.floor(Math.random() * operations.length)];
    captchaAnswer = operation.calc(num1, num2);

    const questionElement = document.querySelector('.form-captcha-question');
    const inputElement = document.getElementById('inputCaptcha');

    if (questionElement && inputElement) {
      questionElement.textContent = `${num1} ${operation.symbol} ${num2}`;
      inputElement.value = '';
    }
  }

  // Gera CAPTCHA ao carregar
  generateCaptcha();
  // ========================================

  // Mensagens de erro personalizadas
  const errorMessages = {
    valueMissing: 'Campo de preenchimento obrigatório.',
    typeMismatch: 'Por favor, insira um valor válido.',
    tooShort: 'O texto é muito curto.',
    patternMismatch: 'Por favor, siga o formato solicitado.'
  };

  // Validação em tempo real (ao sair do campo)
  form.querySelectorAll('.form-input, .form-textarea, .form-select').forEach(input => {
    input.addEventListener('blur', () => {
      validateField(input);
    });

    // Remove erro ao começar a digitar
    input.addEventListener('input', () => {
      clearFieldError(input);
    });
  });

  // Validação ao submeter
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    let firstInvalidField = null;

    // Remove todos os erros anteriores primeiro
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    form.querySelectorAll('.has-error').forEach(el => el.classList.remove('has-error'));

    // Valida campos de texto
    form.querySelectorAll('.form-input, .form-textarea, .form-select').forEach(input => {
      if (!input.checkValidity() || (input.hasAttribute('required') && !input.value.trim())) {
        const errorMsg = getErrorMessage(input);
        showFieldError(input, errorMsg);
        isValid = false;

        if (!firstInvalidField) {
          firstInvalidField = input;
        }
      }
    });

    // Valida checkboxes de serviços
    const servicesChecked = form.querySelectorAll('input[name="servicos[]"]:checked').length;
    const servicesError = document.getElementById('servicesError');

    if (servicesChecked === 0) {
      servicesError.classList.add('active');
      isValid = false;

      if (!firstInvalidField) {
        firstInvalidField = servicesError;
      }
    } else {
      servicesError.classList.remove('active');
    }

    // Valida CAPTCHA
    const captchaInput = document.getElementById('inputCaptcha');

    if (captchaInput && parseInt(captchaInput.value, 10) !== captchaAnswer) {
      showFieldError(captchaInput, 'Resposta incorreta. Tente novamente.');
      isValid = false;

      if (!firstInvalidField) {
        firstInvalidField = captchaInput;
      }
    }

    // Se tudo válido, envia
    if (isValid) {
      submitForm();
    } else {
      // Regenera CAPTCHA após erro
      setTimeout(() => {
        generateCaptcha();
      }, 1500);

      // Scroll até primeiro erro
      if (firstInvalidField) {
        setTimeout(() => {
          firstInvalidField.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }, 100);
      }
    }
  });

  // Remove erro de checkboxes ao selecionar
  form.querySelectorAll('input[name="servicos[]"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const servicesError = document.getElementById('servicesError');
      servicesError.classList.remove('active');
    });
  });

  // Função de validação de campo
  function validateField(input) {
    const field = input.closest('.form-field');

    if (!input.checkValidity()) {
      const errorMsg = getErrorMessage(input);
      showFieldError(input, errorMsg);
      return false;
    } else {
      clearFieldError(input);
      return true;
    }
  }

  // Mostra erro no campo
  function showFieldError(input, message) {
    const field = input.closest('.form-field');

    input.classList.add('error');

    if (field) {
      field.classList.add('has-error');

      let errorElement = field.querySelector('.form-error-message');
      if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'form-error-message';
        input.after(errorElement);
      }
      errorElement.textContent = message;
    }
  }

  // Remove erro do campo
  function clearFieldError(input) {
    const field = input.closest('.form-field');

    input.classList.remove('error');

    if (field) {
      field.classList.remove('has-error');
    }
  }

  // Pega mensagem de erro apropriada
  function getErrorMessage(input) {
    if (input.validity.valueMissing) {
      return errorMessages.valueMissing;
    }
    if (input.validity.typeMismatch) {
      return errorMessages.typeMismatch;
    }
    if (input.validity.tooShort) {
      return errorMessages.tooShort;
    }
    if (input.validity.patternMismatch) {
      return errorMessages.patternMismatch;
    }
    return 'Por favor, verifique este campo.';
  }

  // Envio do formulário
  // Envio do formulário
  async function submitForm() {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('.form-btn-submit');
    const iconWrapper = submitBtn.querySelector('.btn-icon');
    const btnText = submitBtn.querySelector('.btn-text');

    // Fase Loading
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    iconWrapper.classList.add('spinning');
    iconWrapper.innerHTML = '<i class="ri-loader-line"></i>';
    btnText.textContent = 'Enviando...';

    try {
      // Chama a API PHP
      const response = await fetch('/api/enviar-email.php', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        // Fase Success
        submitBtn.classList.remove('loading');
        submitBtn.classList.add('success');
        iconWrapper.classList.remove('spinning');
        iconWrapper.innerHTML = '<i class="ri-checkbox-circle-line"></i>';
        btnText.textContent = 'Mensagem enviada!';

        // Redireciona para página de sucesso
        setTimeout(() => {
          window.location.href = '/sucesso.html';
        }, 1500);

      } else {
        // Erro retornado pela API
        throw new Error(result.message || 'Erro ao enviar mensagem.');
      }

    } catch (error) {
      console.error('Erro:', error);

      // Fase Error
      submitBtn.classList.remove('loading');
      submitBtn.classList.add('error');
      iconWrapper.classList.remove('spinning');
      iconWrapper.innerHTML = '<i class="ri-close-circle-line"></i>';
      btnText.textContent = 'Erro ao enviar';

      // Mostra notificação de erro
      showNotification(error.message || 'Erro ao enviar mensagem. Tente novamente.', 'error');

      // Reabilita botão após 3 segundos
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.classList.remove('error');
        iconWrapper.innerHTML = '<i class="ri-send-plane-line"></i>';
        btnText.textContent = 'Enviar mensagem';
      }, 3000);

      // Regenera CAPTCHA
      generateCaptcha();
    }
  }

  // ========== NOTIFICATION SYSTEM ==========
  function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    Object.assign(notification.style, {
      position: 'fixed',
      top: '100px',
      right: '20px',
      padding: '16px 24px',
      background: type === 'success' ? '#10B981' : '#EF4444',
      color: 'white',
      borderRadius: '8px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
      zIndex: '10000',
      animation: 'slideInRight 0.3s ease',
      fontWeight: '500'
    });

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideInRight 0.3s ease reverse';
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }

});
