// Функциональность валидации форм
// import { validationConfig } from "./constants";

// export { enableValidation, cleanForm, enableSubmitButton };

export default class FormValidator {
  constructor({ config, form }) {
    this.config = config;
    this.form = form;
  }

  _disableSubmitButton(button) {
    button.disabled = true;
    button.classList.add(this.config.inactiveButtonClass);
  }

  // Очистка полей и ошибок формы
  cleanForm(popup) {
    const form = popup.querySelector(this.config.formSelector);
    const submitBtn = form.querySelector(this.config.submitButtonSelector);
    const inputs = form.querySelectorAll(this.config.inputSelector);
    inputs.forEach((input) => {
      this.hideInputError(form, input);
    })
    form.reset();
    this._disableSubmitButton(submitBtn);
  }

  // Добавление класса с ошибкой
  _showInputError(formElement, inputElement, errorMessage) {
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
  _isValid(formElement, inputElement) {
    if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
    inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError(formElement, inputElement);
    }
  };

  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  // Изменение переключения кнопки submit при проверке на валидность
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
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

    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  // Добавление обработчиков всем формам
  enableValidation () {
    const formList = Array.from(document.querySelectorAll(this.config.formSelector));
    formList.forEach((formElement) => {
      this.setEventListeners(formElement);
    });
  };

  // enableSubmitButton(submitButton) {
  //   submitButton.classList.remove(this.config.inactiveButtonClass);
  // }
}
