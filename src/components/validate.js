// Функциональность валидации форм
export { enableValidation, cleanForm };

// Очистка полей и ошибок при закрытии модального окна
function cleanForm() {
  const forms = document.querySelectorAll('.form');
  const errorElements = document.querySelectorAll('.form__input-error');
  const inputElements = document.querySelectorAll('.form__textfield');
  const submitBtns = document.querySelectorAll('.form__submit-button');

  forms.forEach((form) => {
    errorElements.forEach((errorElement) => {
      inputElements.forEach((inputElement) => {
        submitBtns.forEach((submitBtn) => {
          form.reset();
          errorElement.textContent = '';
          inputElement.classList.remove('form__textfield_type_error');
          submitBtn.disabled = true;
          submitBtn.classList.add('form__submit-button_inactive');
        });
      });
    })
  })
}

// Добавление класса с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__textfield_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

// Удаление класса с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__textfield_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

// Проверка валидности полей
const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
  inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
  inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

// Изменение переключения кнопки submit при проверке на валидность
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('form__submit-button_inactive');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('form__submit-button_inactive');
  }
};

// Добавление обработчиков всем инпутам
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__textfield'));
  const buttonElement = formElement.querySelector('.form__submit-button');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// Добавление обработчиков всем формам
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));

  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};
