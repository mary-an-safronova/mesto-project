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
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

// Удаление класса с ошибкой
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

// Проверка валидности полей
const isValid = (formElement, inputElement, config) => {
  if (inputElement.validity.patternMismatch) {
  inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
  inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

// Изменение переключения кнопки submit при проверке на валидность
const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

// Добавление обработчиков всем инпутам
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

// Добавление обработчиков всем формам
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};
