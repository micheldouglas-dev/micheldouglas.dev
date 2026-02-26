// ==========================================
// CONTATO.JS - Validação de Formulário
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formContact');

  if (!form) return;

  // ========== CAPTCHA + CSRF (server-side) ==========
  let csrfToken = null;

  async function fetchCaptcha() {
    try {
      const res = await fetch('/api/captcha.php');
      const data = await res.json();

      csrfToken = data.csrf_token;

      const questionElement = document.querySelector('.form-captcha-question');
      const inputElement    = document.getElementById('inputCaptcha');

      if (questionElement) questionElement.textContent = data.question;
      if (inputElement)    inputElement.value = '';
    } catch (_) {
      const questionElement = document.querySelector('.form-captcha-question');
      if (questionElement) questionElement.textContent = 'Erro ao carregar. Recarregue a página.';
    }
  }

  // Carrega CAPTCHA ao abrir a página
  fetchCaptcha();
  // ================================================

  // ========== MÁSCARA DE WHATSAPP ==========
  const whatsappInput = document.getElementById('inputWhatsapp');

  function maskWhatsapp(value) {
    const d = value.replace(/\D/g, '').slice(0, 11);
    if (!d) return '';
    let masked = '(' + d.slice(0, 2);
    if (d.length > 2) masked += ') ' + d.slice(2, 3);
    if (d.length > 3) masked += ' ' + d.slice(3, 7);
    if (d.length > 7) masked += '-' + d.slice(7, 11);
    return masked;
  }

  function isValidWhatsapp(value) {
    return /^\(\d{2}\) \d \d{4}-\d{4}$/.test(value);
  }

  if (whatsappInput) {
    // Aplica máscara ao digitar
    whatsappInput.addEventListener('input', () => {
      whatsappInput.value = maskWhatsapp(whatsappInput.value);
    });

    // Aplica máscara ao colar (paste)
    whatsappInput.addEventListener('paste', (e) => {
      e.preventDefault();
      const pasted = (e.clipboardData || window.clipboardData).getData('text');
      whatsappInput.value = maskWhatsapp(pasted);
    });

    // Bloqueia teclas não numéricas (exceto controles de navegação/edição)
    whatsappInput.addEventListener('keydown', (e) => {
      const navKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
                       'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
      if (navKeys.includes(e.key)) return;
      if ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase())) return;
      if (!/^\d$/.test(e.key)) e.preventDefault();
    });
  }
  // ==========================================

  // Mensagens de erro personalizadas
  const errorMessages = {
    valueMissing:    'Campo de preenchimento obrigatório.',
    typeMismatch:    'Por favor, insira um valor válido.',
    tooShort:        'O texto é muito curto.',
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
      // WhatsApp tem validação customizada (sem pattern HTML)
      if (input.id === 'inputWhatsapp') {
        if (!input.value.trim()) {
          showFieldError(input, errorMessages.valueMissing);
          isValid = false;
          if (!firstInvalidField) firstInvalidField = input;
        } else if (!isValidWhatsapp(input.value)) {
          showFieldError(input, 'Informe um número válido: (DDD) 9 9999-9999');
          isValid = false;
          if (!firstInvalidField) firstInvalidField = input;
        }
        return;
      }

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
    const servicesError   = document.getElementById('servicesError');

    if (servicesChecked === 0) {
      servicesError.classList.add('active');
      isValid = false;

      if (!firstInvalidField) {
        firstInvalidField = servicesError;
      }
    } else {
      servicesError.classList.remove('active');
    }

    // Valida aceite dos Termos de Uso
    const checkTermos = document.getElementById('checkTermos');
    if (checkTermos && !checkTermos.checked) {
      showFieldError(checkTermos, 'Você precisa aceitar os Termos de Uso para continuar.');
      isValid = false;
      if (!firstInvalidField) firstInvalidField = checkTermos;
    }

    // Valida CAPTCHA (só verifica se foi preenchido; validação real é server-side)
    const captchaInput = document.getElementById('inputCaptcha');
    if (captchaInput && !captchaInput.value.trim()) {
      showFieldError(captchaInput, 'Por favor, resolva o CAPTCHA.');
      isValid = false;

      if (!firstInvalidField) {
        firstInvalidField = captchaInput;
      }
    }

    // Se tudo válido, envia
    if (isValid) {
      submitForm();
    } else {
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

  // Remove erro de checkboxes de serviços ao selecionar
  form.querySelectorAll('input[name="servicos[]"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const servicesError = document.getElementById('servicesError');
      servicesError.classList.remove('active');
    });
  });

  // Remove erro dos termos ao marcar
  const checkTermos = document.getElementById('checkTermos');
  if (checkTermos) {
    checkTermos.addEventListener('change', () => {
      clearFieldError(checkTermos);
    });
  }

  // Função de validação de campo
  function validateField(input) {
    // Validação customizada para WhatsApp (sem depender do pattern HTML)
    if (input.id === 'inputWhatsapp') {
      if (!input.value.trim()) {
        showFieldError(input, errorMessages.valueMissing);
        return false;
      }
      if (!isValidWhatsapp(input.value)) {
        showFieldError(input, 'Informe um número válido: (DDD) 9 9999-9999');
        return false;
      }
      clearFieldError(input);
      return true;
    }

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
    if (input.validity.valueMissing)    return errorMessages.valueMissing;
    if (input.validity.typeMismatch)    return errorMessages.typeMismatch;
    if (input.validity.tooShort)        return errorMessages.tooShort;
    if (input.validity.patternMismatch) {
      if (input.id === 'inputWhatsapp') return 'Informe um número válido: (DDD) 9 9999-9999';
      return errorMessages.patternMismatch;
    }
    return 'Por favor, verifique este campo.';
  }

  // Envio do formulário
  async function submitForm() {
    const formData  = new FormData(form);
    const submitBtn = form.querySelector('.form-btn-submit');
    const iconWrapper = submitBtn.querySelector('.btn-icon');
    const btnText   = submitBtn.querySelector('.btn-text');

    // Inclui o CSRF token no envio
    if (csrfToken) {
      formData.append('csrf_token', csrfToken);
    }

    // Fase Loading
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    iconWrapper.classList.add('spinning');
    iconWrapper.innerHTML = '<i class="ri-loader-line"></i>';
    btnText.textContent   = 'Enviando...';

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
        btnText.textContent   = 'Mensagem enviada!';

        // Redireciona para página de sucesso
        setTimeout(() => {
          window.location.href = '/sucesso.html';
        }, 1500);

      } else {
        throw new Error(result.message || 'Erro ao enviar mensagem.');
      }

    } catch (error) {
      // Fase Error
      submitBtn.classList.remove('loading');
      submitBtn.classList.add('error');
      iconWrapper.classList.remove('spinning');
      iconWrapper.innerHTML = '<i class="ri-close-circle-line"></i>';
      btnText.textContent   = 'Erro ao enviar';

      showNotification(error.message || 'Erro ao enviar mensagem. Tente novamente.', 'error');

      // Reabilita botão após 3 segundos
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.classList.remove('error');
        iconWrapper.innerHTML = '<i class="ri-send-plane-line"></i>';
        btnText.textContent   = 'Enviar mensagem';
      }, 3000);

      // Rebusca CAPTCHA (token pode ter expirado)
      fetchCaptcha();
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
      position:     'fixed',
      top:          '100px',
      right:        '20px',
      padding:      '16px 24px',
      background:   type === 'success' ? '#10B981' : '#EF4444',
      color:        'white',
      borderRadius: '8px',
      boxShadow:    '0 10px 30px rgba(0,0,0,0.2)',
      zIndex:       '10000',
      animation:    'slideInRight 0.3s ease',
      fontWeight:   '500'
    });

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideInRight 0.3s ease reverse';
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }

});
