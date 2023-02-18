import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popup, { handleFormSubmit }) {
    super(popup);

    this.handleFormSubmit = handleFormSubmit;
    this.form = this.popup.querySelector('.form');
    this.inputList = this.form.querySelectorAll('.form__textfield');
    this.button = this.form.querySelector('.form__submit-button');
  }

  _getInputValues() {
    const values = {};

    this.inputList.forEach((input) => {
    values[input.name] = input.value;
    })

    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this.handleFormSubmit(this._getInputValues())
    });
  }

  // Отображение загрузки информации полей формы
  renderLoading(isLoading) {
    if (isLoading) {
      this.button.textContent = 'Сохранение...'
      this.button.disabled = true;
    } else {
      this.button.textContent = 'Сохранить'
      this.button.disabled = false;
    }
  };

  close() {
    super.close();
    this.form.reset();
  }
}
