export default class Popup {
  constructor(popup) {
    this.popup = popup;

    this._handleEscClose = this._handleEscClose.bind(this);
    this._overlayElement = this.popup.querySelector('.popup__background');
    this._popupCloseIconElement = this.popup.querySelector('.popup__close-icon');
  }

  // Открытие модального окна
  open() {
    this.popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  // Закрытие модального окна
  close() {
    this.popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // Закрытие модального окна при клике на escape
  _handleEscClose(evt) {
    const escape = 'Escape';
    if (evt.code === escape) {
      this.close();
    }
  }

  // Закрытие модального окна при клике на оверлей
  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup__background')) {
        this.close();
    }
  }

  // Закрытие модального окна при клике на крестик
  _handleIconClose(evt) {
    if (evt.target.classList.contains('popup__close-icon')) {
      this.close();
    }
  }

  // Добавление слушателей
  setEventListeners() {
    this._overlayElement.addEventListener('click', (evt) => {
      this._handleOverlayClose(evt);
    });

    this._popupCloseIconElement.addEventListener('click', (evt) => {
      this._handleIconClose(evt);
    });
  }
}
