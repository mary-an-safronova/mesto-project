// Работа модальных окон
export { openAndCleanForm, pressEscape, showProfileInfo, handleProfileFormSubmit, handleAddFormSubmit };
export { cardTemplate, cardsContainerEl, profileNameEl, profileProfessionEl };

import { closePopup, openPopup } from "./utils";
import { cleanForm } from "./validate";
import { createCard } from "./card";
import { cardElId, myUserId, profileAvatarEl, someUserId } from "..";
import { patchUsers, postCards, patchUserAvatar } from "./api";

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
const profileAvatarWrapEl = document.querySelector('.profile__avatar-wrap');
const profileAvatarBtnEl = document.querySelector('.profile__avatar-cover');
const avatarPopupEl = document.querySelector('.popup-avatar');
const avatarImgInput = document.querySelector('#avatar-image');

// Функция открытия формы добавления карточки и очистка полей
function openAndCleanForm() {
  openPopup(cardAddPopupEl);
  cleanForm();
}

// Закрытие модального окна при клике на крестик
popupCloseIconElements.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => {
    closePopup(popup);
    cleanForm();
  });
});

// Закрытие модального окна при клике на оверлей
overlayElements.forEach((overlayElement) => {
  const popup = overlayElement.closest('.popup');
  overlayElement.addEventListener('click', () => {
    closePopup(popup);
    cleanForm();
  });
});

// Закрытие модального окна при клике на escape, удаление слушателя при закрытии окна
function pressEscape (event) {
  if (event.code === escape) {
    const popupActive = document.querySelector('.popup_opened');
    closePopup(popupActive);
    cleanForm();
  }
}

// Функция отображения информации профиля в полях формы редактирования при открытии попапа
function showProfileInfo() {
  openPopup(profilePopupEl);
  inputName.value = profileNameEl.textContent;
  inputProfession.value = profileProfessionEl.textContent;
}

// Функция отображения загрузки информации полей формы
function loadingPopup(isLoading, popup) {
  const popupSubmitBtn = popup.querySelector('.form__submit-button');

  if (isLoading) {
    popupSubmitBtn.textContent = 'Сохранение...'
    popupSubmitBtn.disabled = true;
  } else {
    popupSubmitBtn.textContent = 'Сохранить'
    popupSubmitBtn.disabled = false;
  }
};

// Обработчик «отправки» формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  loadingPopup(true, profilePopupEl);

  patchUsers(inputName.value, inputProfession.value)
  .then((result) => {
    if (result.ok) {
      profileNameEl.textContent = inputName.value;
      profileProfessionEl.textContent = inputProfession.value;
    }
  })
  .catch((err) => {
    console.log(err);
  })
  .then(closePopup(profilePopupEl))
  .finally(() => {
      loadingPopup(false, profilePopupEl);
      profileNameEl.textContent = inputName.value;
      profileProfessionEl.textContent = inputProfession.value;
  })
}

// Добавление новых карточек через форму
// Обработчик «отправки» формы добавления карточек
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  loadingPopup(true, cardAddPopupEl);

  postCards(inputCardName.value, inputCardImg.value)
  .then((result) => {
    if (result.ok) {
      const cardElement = createCard(cardTemplate, inputCardName.value, inputCardImg.value, cardCount, someUserId, cardElId, myUserId);
      cardsContainerEl.prepend(cardElement);
    }
  })
  .catch((err) => {
    console.log(err);
  })
  .then(closePopup(cardAddPopupEl))
  .finally(() => {
      loadingPopup(false, cardAddPopupEl);
      const cardElement = createCard(cardTemplate, inputCardName.value, inputCardImg.value, cardCount, someUserId, cardElId, myUserId);
      cardsContainerEl.prepend(cardElement);
  })
}

// Слушатель наведения мыши на аватар
profileAvatarWrapEl.addEventListener('mouseover', () => {
  profileAvatarBtnEl.classList.add('profile__avatar-cover_opened');
});

profileAvatarWrapEl.addEventListener('mouseout', () => {
  profileAvatarBtnEl.classList.remove('profile__avatar-cover_opened');
});

// Слушатель кнопки редактирования аватара профиля
profileAvatarBtnEl.addEventListener('click', () => {
  avatarPopupEl.classList.add('popup_opened');
});

// Обработчик отправки формы редактирования аватара профиля
function handleChangeAvatarFormSubmit(evt) {
  evt.preventDefault();
  loadingPopup(true, avatarPopupEl);

  patchUserAvatar(avatarImgInput.value)
  .then((result) => {
    if (result.ok) {
      profileAvatarEl.src = result.avatar;
    }
  })
  .catch((err) => {
    console.log(err);
  })
  .then(closePopup(avatarPopupEl))
  .finally(() => {
      loadingPopup(false, avatarPopupEl);
      profileAvatarEl.src = avatarImgInput.value;
  })
}

// Слушатель submit «отправки» формы редактирования аватара профиля
avatarPopupEl.addEventListener('submit', handleChangeAvatarFormSubmit);
