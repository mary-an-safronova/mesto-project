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


let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');

let inputName = document.getElementById('name');
let inputProfession = document.getElementById('profession');

inputName.value = (inputName !== "") ? profileName.innerHTML : "";
inputProfession.value = (inputProfession !== "") ? profileProfession.innerHTML : "";
