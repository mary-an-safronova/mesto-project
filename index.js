let addButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseIcon = document.querySelector('.popup__close-icon');

function popupOpend() {
  popup.classList.add('popup_opened');
}

function popupClosed() {
  popup.classList.remove('popup_opened');
}

addButton.addEventListener('click', popupOpend);
popupCloseIcon.addEventListener('click', popupClosed);
