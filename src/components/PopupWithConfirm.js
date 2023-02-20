import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor(popup) {
    super(popup);
  }

  setEventListeners() {
    super.setEventListeners()

    this.form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        evt.stopImmediatePropagation();
    });
  }
}
