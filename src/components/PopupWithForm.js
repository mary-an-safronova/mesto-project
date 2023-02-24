import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popup, { handleFormSubmit }) {
    super(popup);

    this._handleFormSubmit = handleFormSubmit;
    this.form = this.popup.querySelector('.form');
    this._inputList = this.form.querySelectorAll('.form__textfield');
    this._button = this.popup.querySelector('.form__submit-button');
    this._submitBtnText = this._button.textContent
  }

  _getInputValues() {
    this._values = {};

    this._inputList.forEach((input) => {
      this._values[input.name] = input.value;
    })

    return this._values;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners()

    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      evt.stopImmediatePropagation();

      this._handleFormSubmit(this._getInputValues())
    });
  }

  // Отображение загрузки информации полей формы
  renderLoading(isLoading, loadingText='Сохранение...') {
    if (isLoading) {
      this._button.textContent = loadingText;
    } else {
      this._button.textContent = this._submitBtnText;
    }
  }

  close() {
    super.close();
    this.form.reset();
  }
}
