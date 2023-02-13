// Работа модальных окон
export { openAndCleanForm, pressEscape, showProfileInfo, handleProfileFormSubmit, handleAddFormSubmit, handleChangeAvatarFormSubmit };
export { cardTemplate, cardsContainerEl, profileNameEl, profileProfessionEl, cardAddPopupEl, avatarPopupEl };

import { closePopup, openPopup } from "./utils";
import { cleanForm } from "./validate";
import { createCard } from "./card";
import { myUserId, profileAvatarEl } from "..";
import { api } from "./api";

const popupCloseIconElements = document.querySelectorAll('.popup__close-icon');
const overlayElements = document.querySelectorAll('.popup__background');
const profilePopupEl = document.querySelector('.popup-edit');
const inputName = document.querySelector('#name');
const profileNameEl = document.querySelector('.profile__name');
const inputProfession = document.querySelector('#profession');
const profileProfessionEl = document.querySelector('.profile__profession');
const escape = 'Escape';
const inputCardName = document.querySelector('#card-name');
const inputCardImg = document.querySelector('#card-image');
const cardAddPopupEl = document.querySelector('.popup-add');
const cardsContainerEl = document.querySelector('.grid-places');
const cardTemplate = document.querySelector('#place-template').content;
let cardCount = cardTemplate.querySelector('.place__like-count');
cardCount = '';
const avatarPopupEl = document.querySelector('.popup-avatar');
const avatarImgInput = document.querySelector('#avatar-image');

// Функция открытия формы добавления карточки и очистка полей
function openAndCleanForm(popup) {
  openPopup(popup);
  cleanForm(popup);
}

// Закрытие модального окна при клике на крестик
popupCloseIconElements.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => {
    closePopup(popup);
  });
});

// Закрытие модального окна при клике на оверлей
overlayElements.forEach((overlayElement) => {
  const popup = overlayElement.closest('.popup');
  overlayElement.addEventListener('click', () => {
    closePopup(popup);
  });
});

// Закрытие модального окна при клике на escape, удаление слушателя при закрытии окна
function pressEscape (event) {
  if (event.code === escape) {
    const popupActive = document.querySelector('.popup_opened');
    closePopup(popupActive);
  }
}

// Функция отображения информации профиля в полях формы редактирования при открытии попапа
function showProfileInfo() {
  openPopup(profilePopupEl);
  inputName.value = profileNameEl.textContent;
  inputProfession.value = profileProfessionEl.textContent;
}

// Функция отображения загрузки информации полей формы
function renderLoading(isLoading, popup) {
  const popupSubmitBtn = popup.querySelector('.form__submit-button');

  if (isLoading) {
    popupSubmitBtn.textContent = 'Сохранение...'
    popupSubmitBtn.disabled = true;
  } else {
    popupSubmitBtn.textContent = 'Сохранить'
    popupSubmitBtn.disabled = false;
  }
};

const setUserInfo = () => {
  profileNameEl.textContent = inputName.value;
  profileProfessionEl.textContent = inputProfession.value;
};

// Обработчик «отправки» формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, profilePopupEl);

  api.patchUsers(inputName.value, inputProfession.value)
  .then((result) => {
    setUserInfo();
    console.log(result);
  })
  .then(closePopup(profilePopupEl))
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(false, profilePopupEl);
  })
}

// Добавление новых карточек через форму
// Обработчик «отправки» формы добавления карточек
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, cardAddPopupEl);

  api.postCards(inputCardName.value, inputCardImg.value)
  .then((result) => {
    let cardElId = result._id;
    let someUserId = result.owner._id;
    const cardElement = createCard(cardTemplate, inputCardName.value, inputCardImg.value, cardCount, someUserId, cardElId, myUserId);
    cardsContainerEl.prepend(cardElement);
    console.log(cardElId);
  })
  .then(closePopup(cardAddPopupEl))
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(false, cardAddPopupEl);
  })
}

// Обработчик отправки формы редактирования аватара профиля
function handleChangeAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, avatarPopupEl);

  api.patchUserAvatar(avatarImgInput.value)
  .then((result) => {
    profileAvatarEl.src = result.avatar;
    console.log(result);
  })
  .then(closePopup(avatarPopupEl))
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(false, avatarPopupEl);
  })
}
