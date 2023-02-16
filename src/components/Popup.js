export default class Popup {
  constructor(popup) {
    this.popup = popup;

    this._handleEscClose = this._handleEscClose.bind(this);
    this.overlayElement = this.popup.querySelector('.popup__background');
    this.popupCloseIconElement = this.popup.querySelector('.popup__close-icon');
  }

  // Открытие модального окна
  open() {
    this.popup.classList.add('popup_opened');
    this.setEventListeners();
  }

  // Закрытие модального окна
  close() {
    this.popup.classList.remove('popup_opened');
    this._removeEventListeners();
  }

  // Закрытие модального окна при клике на escape
  _handleEscClose(event) {
    const escape = 'Escape';
    if (event.code === escape) {
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
    document.addEventListener('keydown', this._handleEscClose);

    this.overlayElement.addEventListener('click', (evt) => {
      this._handleOverlayClose(evt);
    });

    this.popupCloseIconElement.addEventListener('click', (evt) => {
      this._handleIconClose(evt);
    });
  }

  // Удаление слушателей
  _removeEventListeners() {
    document.removeEventListener('keydown', this._handleEscClose);

    this.overlayElement.removeEventListener('click', (evt) => {
      this._handleOverlayClose(evt);
    });

    this.popupCloseIconElement.removeEventListener('click', (evt) => {
      this._handleIconClose(evt);
    });
  }
}
