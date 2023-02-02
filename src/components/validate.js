// Функциональность валидации форм
import { validationConfig } from "./constants";

export { enableValidation, cleanForm, enableSubmitButton };

function disableSubmitButton(button) {
  button.disabled = true;
  button.classList.add('form__submit-button_inactive');
}

// Очистка полей и ошибок формы
function cleanForm(popup) {
  const form = popup.querySelector('.form');
  const submitBtn = form.querySelector('.form__submit-button');
  const input = form.querySelector('.form__textfield');

  form.reset();

  hideInputError(form, input, validationConfig);
  disableSubmitButton(submitBtn);
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

const enableSubmitButton = (submitButton) => {
  submitButton.classList.remove('form__submit-button_inactive');
}
