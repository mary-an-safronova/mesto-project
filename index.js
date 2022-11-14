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

const inputName = document.getElementById('name');
const inputProfession = document.getElementById('profession');

inputName.value = (inputName !== "") ? profileName.innerHTML : "";
inputProfession.value = (inputProfession !== "") ? profileProfession.innerHTML : "";


const EditFormElement = document.querySelector('.edit-form');

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault();
// Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки.

  console.log(inputName.value);
  console.log(inputProfession.value);

  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
EditFormElement.addEventListener('submit', formSubmitHandler);
