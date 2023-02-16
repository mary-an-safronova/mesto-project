import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);

    this.img = this.popup.querySelector('.popup__image');
    this.imgCaption = this.popup.querySelector('.popup__img-caption');
  }

  open(link, name) {
    super.open();

    this.img.src = link;
    this.imgCaption.textContent = name;
    this.img.alt = name;
  }
}
