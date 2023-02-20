// Функциональность валидации форм
export default class FormValidator {
  constructor({ config, form }) {
    this.config = config;
    this.form = form;

    this._inputList = this.form.querySelectorAll(this.config.inputSelector);
    this.submitBtn = this.form.querySelector(this.config.submitButtonSelector);
  }

  _disableSubmitButton() {
    this.submitBtn.disabled = true;
    this.submitBtn.classList.add(this.config.inactiveButtonClass);
  }

  resetFormValidation() {
    this._inputList.forEach(input => {
      this.hideInputError(this.form, input);
    });
    this._disableSubmitButton();
  }

  // Очистка полей и ошибок формы
  cleanForm() {
    this.resetFormValidation();
    this.form.reset();
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
  }
}
