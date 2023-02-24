import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor(popup, {handleFormSubmit}) {
    super(popup);

    this._handleFormSubmit = handleFormSubmit;
    this.form = this.popup.querySelector('.form');
    this._button = this.popup.querySelector('.form__submit-button');
    this._submitBtnText = this._button.textContent
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

  // Отображение загрузки информации в кнопке submit
  renderLoading(isLoading, loadingText='Удаление...') {
    if (isLoading) {
      this._button.textContent = loadingText;
    } else {
      this._button.textContent = this._submitBtnText;
    }
  }
}
