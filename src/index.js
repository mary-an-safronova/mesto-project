import './styles/index.css';

import { openAndCleanForm, showProfileInfo, handleProfileFormSubmit, handleAddFormSubmit } from './components/modal';
import { cardTemplate, cardsContainerEl, profileNameEl, profileProfessionEl } from './components/modal';
import { enableValidation } from './components/validate';
import { createCard } from './components/card';
import { cardAddFormEl } from './components/card';
import { validationConfig } from './components/constants';
import { getInitialCards, getUserInfo } from './components/api';

export { myUserId, cardElId, someUserId, profileAvatarEl };

const profileBtnEl = document.querySelector('.profile__edit-button');
const profileFormEl = document.querySelector('.edit-form');
const cardAddBtnEl = document.querySelector('.profile__add-button');
const profileAvatarEl = document.querySelector('.profile__avatar');

let myUserId = '';
let cardElId = '';
let someUserId = '';

// Загрузка информации о пользователе с сервера
// Отображение предзагруженных карточек с сервера
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userInfo, cards]) => {
    myUserId = userInfo._id;
    profileNameEl.textContent = userInfo.name;
    profileProfessionEl.textContent = userInfo.about;
    profileAvatarEl.src = userInfo.avatar;

    cards.forEach(({ name, link, likes, owner, _id }) => {
      const cardElement = createCard(cardTemplate, name, link, likes, owner._id, _id, userInfo._id);
      cardsContainerEl.append(cardElement);
      cardElId = _id;
      someUserId = owner._id;
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Добавления слушателя клика на кнопку добавления карточки
cardAddBtnEl.addEventListener('click', openAndCleanForm);

// Добавления слушателя клика на кнопку редактирования профиля
profileBtnEl.addEventListener('click', showProfileInfo);

// Валидация форм
enableValidation(validationConfig);

// Слушатель submit «отправки» формы редактирования профиля
profileFormEl.addEventListener('submit', handleProfileFormSubmit);

// Слушатель submit «отправки» формы добавления карточек
cardAddFormEl.addEventListener('submit', handleAddFormSubmit);
