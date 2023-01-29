// Работа модальных окон
export { openAndCleanForm, pressEscape, showProfileInfo, handleProfileFormSubmit, handleAddFormSubmit };
export { cardTemplate, cardsContainerEl, profileNameEl, profileProfessionEl };

import { closePopup, openPopup } from "./utils";
import { cleanForm } from "./validate";
import { createCard } from "./card";
import { cardElId, myUserId } from "..";
import { patchUsers, postCards } from "./api";

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
const profileAvatarEl = document.querySelector('.profile__avatar-wrap');
const profileAvatarBtnEl = document.querySelector('.profile__avatar-cover');
const avatarPopupEl = document.querySelector('.popup-avatar');
// const avatarSubmitBtnEl = document.querySelector('.avatar-form__submit-button');

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

// Обработчик «отправки» формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  closePopup(profilePopupEl);

  patchUsers(inputName.value, inputProfession.value)
  .then((result) => {
    if (result.ok) {
      profileNameEl.textContent = inputName.value;
      profileProfessionEl.textContent = inputProfession.value;
    }
  })
  .catch((err) => {
    console.log(err);
  });
}

// Добавление новых карточек через форму
// Обработчик «отправки» формы добавления карточек
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  closePopup(cardAddPopupEl);

  postCards(inputCardName.value, inputCardImg.value)
  .then((result) => {
    if (result.ok) {
      const cardElement = createCard(cardTemplate, inputCardName.value, inputCardImg.value, 0, myUserId, cardElId);
      cardsContainerEl.prepend(cardElement);
    }
  })
  .catch((err) => {
    console.log(err);
  });
}

// Слушатель наведения мыши на аватар
profileAvatarEl.addEventListener('mouseover', () => {
  profileAvatarBtnEl.classList.add('profile__avatar-cover_opened');
});

profileAvatarEl.addEventListener('mouseout', () => {
  profileAvatarBtnEl.classList.remove('profile__avatar-cover_opened');
});

// Слушатель кнопки редактирования аватара профиля
profileAvatarBtnEl.addEventListener('click', () => {
  avatarPopupEl.classList.add('popup_opened');
});

// Слушатель submit «отправки» формы редактирования аватара профиля
