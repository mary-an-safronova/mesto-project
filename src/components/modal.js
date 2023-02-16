// Работа модальных окон
export { showProfileInfo, handleProfileFormSubmit, handleAddFormSubmit, handleChangeAvatarFormSubmit };
export { cardTemplate, cardsContainerEl, profileNameEl, profileProfessionEl, cardAddPopupEl, avatarPopupEl, profilePopupEl };

import { closePopup, openPopup } from "./utils";
import { cleanForm } from "./validate";
import Card from "./card";
import { myUserId, profileAvatarEl } from "..";
import { api } from "./api";
//import FormValidator from "./validate";
import Popup from "./Popup";
import { popupAvatar } from "..";
import { profileValidator, profileFormEl, popupWithFormProfile, popupCardAdd } from "..";

const profilePopupEl = document.querySelector('.popup-edit');
const inputName = document.querySelector('#name');
const profileNameEl = document.querySelector('.profile__name');
const inputProfession = document.querySelector('#profession');
const profileProfessionEl = document.querySelector('.profile__profession');
const inputCardName = document.querySelector('#card-name');
const inputCardImg = document.querySelector('#card-image');
const cardAddPopupEl = document.querySelector('.popup-add');
const cardsContainerEl = document.querySelector('.grid-places');
const cardTemplate = document.querySelector('#place-template').content;
let cardCount = cardTemplate.querySelector('.place__like-count');
cardCount = '';
const avatarPopupEl = document.querySelector('.popup-avatar');
const avatarImgInput = document.querySelector('#avatar-image');
const popupProfile = new Popup(profilePopupEl);

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

// // Функция отображения загрузки информации полей формы
// function renderLoading(isLoading, popup) {
//   const popupSubmitBtn = popup.querySelector('.form__submit-button');

//   if (isLoading) {
//     popupSubmitBtn.textContent = 'Сохранение...'
//     popupSubmitBtn.disabled = true;
//   } else {
//     popupSubmitBtn.textContent = 'Сохранить'
//     popupSubmitBtn.disabled = false;
//   }
// };

const setUserInfo = () => {
  profileNameEl.textContent = inputName.value;
  profileProfessionEl.textContent = inputProfession.value;
};

// Обработчик «отправки» формы редактирования профиля
function handleProfileFormSubmit() {
  // evt.preventDefault();
  // renderLoading(true, profilePopupEl);
  popupWithFormProfile.renderLoading(true);

  api.patchUsers(inputName.value, inputProfession.value)
  .then((result) => {
    setUserInfo();
    console.log(result);
  })
  .then(popupProfile.close())
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupWithFormProfile.renderLoading(false);
  })
}

// Добавление новых карточек через форму
// Обработчик «отправки» формы добавления карточек
function handleAddFormSubmit() {
  // evt.preventDefault();
  // renderLoading(true, cardAddPopupEl);
  popupCardAdd.renderLoading(true);

  api.postCards(inputCardName.value, inputCardImg.value)
  .then((result) => {
    let cardElId = result._id;
    let someUserId = result.owner._id;
    const cardElement = new Card(cardTemplate, inputCardName.value, inputCardImg.value, cardCount, someUserId, cardElId, myUserId).getElement();
    cardsContainerEl.prepend(cardElement);
  })
  .then(popupCardAdd.close())
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupCardAdd.renderLoading(false);
  })
}

// Обработчик отправки формы редактирования аватара профиля
function handleChangeAvatarFormSubmit() {
  // evt.preventDefault();
  // renderLoading(true, avatarPopupEl);
  popupAvatar.renderLoading(true);

  api.patchUserAvatar(avatarImgInput.value)
  .then((result) => {
    profileAvatarEl.src = result.avatar;
    console.log(result);
  })
  .then(popupAvatar.close())
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    // renderLoading(false, avatarPopupEl);
    popupAvatar.renderLoading(false);
  })
}
