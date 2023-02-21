// Функциональность валидации форм
export default class FormValidator {
  constructor({ config, form }) {
    this._form = form;

    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;

    this._inputList = Array.from(this._form.querySelectorAll(config.inputSelector));
    this._submitBtn = this._form.querySelector(config.submitButtonSelector);
  }

  _disableSubmitButton() {
    this._submitBtn.disabled = true;
    this._submitBtn.classList.add(this._inactiveButtonClass);
  }

  resetFormValidation() {
    this._inputList.forEach(inputElement => {
      this.hideInputError(inputElement);
    });
    this._disableSubmitButton();
  }

  // Очистка полей и ошибок формы
  cleanForm() {
    this.resetFormValidation();
  }

  // Добавление класса с ошибкой
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  // Удаление класса с ошибкой
  hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  // Проверка валидности полей
  _isValid(inputElement) {
    if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
    inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError(inputElement);
    }
  };

  _hasInvalidInput () {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  // Изменение переключения кнопки submit при проверке на валидность
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitBtn.disabled = true;
      this._submitBtn.classList.add(this._inactiveButtonClass);
    } else {
      this._submitBtn.disabled = false;
      this._submitBtn.classList.remove(this._inactiveButtonClass);
    }
  };

  // Добавление обработчиков всем инпутам
  setEventListeners () {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  };

  // Добавление обработчиков всем формам
  enableValidation () {
    this.setEventListeners();
  }
}
