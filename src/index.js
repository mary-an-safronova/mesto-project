import './styles/index.css';

import { showProfileInfo, handleProfileFormSubmit, handleAddFormSubmit, handleChangeAvatarFormSubmit } from './components/modal';
import { cardTemplate, cardsContainerEl, profileNameEl, profileProfessionEl, cardAddPopupEl, avatarPopupEl } from './components/modal';
import { enableValidation } from './components/validate';

import Card, { cardAddFormEl } from './components/card';
import { validationConfig } from './components/constants';
import FormValidator from './components/validate';
import { api } from './components/api';

import Popup from './components/Popup';
import { popupCardAdd } from './components/modal';
import UserInfo from "./components/UserInfo";

export { myUserId, cardElId, someUserId, profileAvatarEl };

const profileBtnEl = document.querySelector('.profile__edit-button');
const profileFormEl = document.querySelector('.edit-form');
const cardAddBtnEl = document.querySelector('.profile__add-button');
const profileAvatarEl = document.querySelector('.profile__avatar');
const profileAvatarWrapEl = document.querySelector('.profile__avatar-wrap');
const profileAvatarBtnEl = document.querySelector('.profile__avatar-cover');
export const popupAvatar = new Popup(avatarPopupEl);

let myUserId = '';
let cardElId = '';
let someUserId = '';

const user = new UserInfo({
  nameSelector: profileNameEl,
  professionSelector: profileProfessionEl,
  avatarSelector: profileAvatarEl
});

// Загрузка информации о пользователе с сервера
// Отображение предзагруженных карточек с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userInfo, cards]) => {
    myUserId = userInfo._id;
    user.setUserInfo(userInfo);
    // profileNameEl.textContent = userInfo.name;
    // profileProfessionEl.textContent = userInfo.about;
    // profileAvatarEl.src = userInfo.avatar;

    cards.forEach(({ name, link, likes, owner, _id }) => {
      const cardElement = new Card(cardTemplate, name, link, likes, owner._id, _id, userInfo._id).getElement();
      cardsContainerEl.append(cardElement);
      cardElId = _id;
      someUserId = owner._id;
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Добавления слушателя клика на кнопку добавления карточки
cardAddBtnEl.addEventListener('click', () => {
  popupCardAdd.open();
  cardAddValidator.cleanForm(cardAddPopupEl);
});

// Добавления слушателя клика на кнопку редактирования профиля
profileBtnEl.addEventListener('click', showProfileInfo);

// Слушатель наведения мыши на аватар
profileAvatarWrapEl.addEventListener('mouseover', () => {
  profileAvatarBtnEl.classList.add('profile__avatar-cover_opened');
});

profileAvatarWrapEl.addEventListener('mouseout', () => {
  profileAvatarBtnEl.classList.remove('profile__avatar-cover_opened');
});

// Слушатель кнопки редактирования аватара профиля
profileAvatarBtnEl.addEventListener('click', () => {
  //openAndCleanForm(avatarPopupEl);
  popupAvatar.open();
  profileValidator.cleanForm(avatarPopupEl);
});

// Валидация форм
// enableValidation(validationConfig);
const profileValidator = new FormValidator(
  { config: validationConfig, form: profileFormEl },
);

profileValidator.enableValidation();

export const cardAddValidator = new FormValidator(
  { config: validationConfig, form: cardAddFormEl },
);

cardAddValidator.enableValidation();

const avatarValidator = new FormValidator(
  { config: validationConfig, form: avatarPopupEl },
);

avatarValidator.enableValidation();

// Слушатель submit «отправки» формы редактирования профиля
profileFormEl.addEventListener('submit', handleProfileFormSubmit);

// Слушатель submit «отправки» формы добавления карточек
cardAddFormEl.addEventListener('submit', handleAddFormSubmit);

// Слушатель submit «отправки» формы редактирования аватара профиля
avatarPopupEl.addEventListener('submit', handleChangeAvatarFormSubmit);
