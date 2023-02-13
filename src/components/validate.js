// Функциональность валидации форм
// import { validationConfig } from "./constants";

// export { enableValidation, cleanForm, enableSubmitButton };

export default class FormValidator {
  constructor({config}, form) {
    this.config = config;
    this.form = form;
  }

  disableSubmitButton(button) {
    button.disabled = true;
    button.classList.add(this.config.inactiveButtonClass);
  }

  // Очистка полей и ошибок формы
  cleanForm(popup) {
    const form = popup.querySelector(this.config.formSelector);
    const submitBtn = form.querySelector(this.config.submitButtonSelector);
    const inputs = form.querySelectorAll(this.config.inputSelector);
    inputs.forEach((input) => {
      hideInputError(form, input);
    })
    form.reset();
    disableSubmitButton(submitBtn);
  }

  // Добавление класса с ошибкой
  showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.config.errorClass);
  };

  // Удаление класса с ошибкой
  hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.config.inputErrorClass);
    errorElement.classList.remove(this.config.errorClass);
    errorElement.textContent = '';
  };

  // Проверка валидности полей
  isValid(formElement, inputElement) {
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

  hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  // Изменение переключения кнопки submit при проверке на валидность
  toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(this.config.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(this.config.inactiveButtonClass);
    }
  };

  // Добавление обработчиков всем инпутам
  setEventListeners (formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this.config.inputSelector));
    const buttonElement = formElement.querySelector(this.config.submitButtonSelector);

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };

  // Добавление обработчиков всем формам
  enableValidation () {
    const formList = Array.from(document.querySelectorAll(this.config.formSelector));

    formList.forEach((formElement) => {
      setEventListeners(formElement);
    });
  };

  enableSubmitButton(submitButton) {
    submitButton.classList.remove(this.config.inactiveButtonClass);
  }
}

// function disableSubmitButton(button, config) {
//   button.disabled = true;
//   button.classList.add(config.inactiveButtonClass);
// }

// // Очистка полей и ошибок формы
// function cleanForm(popup, config) {
//   const form = popup.querySelector(config.formSelector);
//   const submitBtn = form.querySelector(config.submitButtonSelector);
//   const input = form.querySelector(config.inputSelector);

//   form.reset();

//   hideInputError(form, input, config);
//   disableSubmitButton(submitBtn);
// }

// // Добавление класса с ошибкой
// const showInputError = (formElement, inputElement, errorMessage, config) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(config.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(config.errorClass);
// };

// // Удаление класса с ошибкой
// const hideInputError = (formElement, inputElement, config) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(config.inputErrorClass);
//   errorElement.classList.remove(config.errorClass);
//   errorElement.textContent = '';
// };

// // Проверка валидности полей
// const isValid = (formElement, inputElement, config) => {
//   if (inputElement.validity.patternMismatch) {
//   inputElement.setCustomValidity(inputElement.dataset.errorMessage);
//   } else {
//   inputElement.setCustomValidity("");
//   }

//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage, config);
//   } else {
//     hideInputError(formElement, inputElement, config);
//   }
// };

// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   })
// };

// // Изменение переключения кнопки submit при проверке на валидность
// const toggleButtonState = (inputList, buttonElement, config) => {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.disabled = true;
//     buttonElement.classList.add(config.inactiveButtonClass);
//   } else {
//     buttonElement.disabled = false;
//     buttonElement.classList.remove(config.inactiveButtonClass);
//   }
// };

// // Добавление обработчиков всем инпутам
// const setEventListeners = (formElement, config) => {
//   const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
//   const buttonElement = formElement.querySelector(config.submitButtonSelector);

//   toggleButtonState(inputList, buttonElement, config);

//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', () => {
//       isValid(formElement, inputElement, config);
//       toggleButtonState(inputList, buttonElement, config);
//     });
//   });
// };

// // Добавление обработчиков всем формам
// const enableValidation = (config) => {
//   const formList = Array.from(document.querySelectorAll(config.formSelector));

//   formList.forEach((formElement) => {
//     setEventListeners(formElement, config);
//   });
// };

// const enableSubmitButton = (submitButton, config) => {
//   submitButton.classList.remove(config.inactiveButtonClass);
// }
