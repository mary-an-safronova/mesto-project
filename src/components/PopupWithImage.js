import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);

    this._img = this.popup.querySelector('.popup__image');
    this._imgCaption = this.popup.querySelector('.popup__img-caption');
  }

  open(link, name) {
    super.open();

    this._img.src = link;
    this._imgCaption.textContent = name;
    this._img.alt = name;
  }
}
