import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popup, { handleFormSubmit }) {
    super(popup);

    this.handleFormSubmit = handleFormSubmit;
    this.inputList = this.form.querySelectorAll('.form__textfield');
  }

  _getInputValues() {
    this.values = {};

    this.inputList.forEach((input) => {
      this.values[input.name] = input.value;
    })

    return this.values;
  }

  setEventListeners() {
    super.setEventListeners()

    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      evt.stopImmediatePropagation();

      this.handleFormSubmit(this._getInputValues())
    });
  }

  close() {
    super.close();
    this.form.reset();
  }
}
