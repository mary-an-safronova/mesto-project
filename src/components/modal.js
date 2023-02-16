// Работа модальных окон
export { showProfileInfo };
export { cardTemplate, cardsContainerEl, cardAddPopupEl, avatarPopupEl, profilePopupEl };

import { profileValidator, profileFormEl } from "..";
import { inputName, inputProfession, profileNameEl, profileProfessionEl } from "..";
import { popupProfile } from "..";

const profilePopupEl = document.querySelector('.popup-edit');
const cardAddPopupEl = document.querySelector('.popup-add');
const cardsContainerEl = document.querySelector('.grid-places');
const cardTemplate = document.querySelector('#place-template').content;
const avatarPopupEl = document.querySelector('.popup-avatar');

// Функция отображения информации профиля в полях формы редактирования при открытии попапа
function showProfileInfo() {
  popupProfile.open();
  const inputs = profileFormEl.querySelectorAll('.form__textfield');
    inputs.forEach((input) => {
      profileValidator.hideInputError(profileFormEl, input);
    })
  inputName.value = profileNameEl.textContent;
  inputProfession.value = profileProfessionEl.textContent;
}
