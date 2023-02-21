import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popup, { handleFormSubmit }) {
    super(popup);

    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this.form.querySelectorAll('.form__textfield');
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

  close() {
    super.close();
    this.form.reset();
  }
}
