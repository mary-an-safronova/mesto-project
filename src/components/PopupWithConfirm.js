import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor(popup, {handleFormSubmit}) {
    super(popup);

    this._handleFormSubmit = handleFormSubmit;
  }

  open(cardElement, cardId) {
    super.open()
    this._cardElement = cardElement;
    this.cardId = cardId;
  }

  setEventListeners() {
    super.setEventListeners()
    this.form.addEventListener('submit', (evt) => {

        evt.preventDefault();
        evt.stopImmediatePropagation();

        this._handleFormSubmit(this._cardElement, this.cardId);
    });
  }
}
