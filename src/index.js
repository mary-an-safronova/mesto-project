import './styles/index.css';

import { openAndCleanForm, showProfileInfo, handleProfileFormSubmit, handleAddFormSubmit } from './components/modal';
import { cardTemplate, cardsContainerEl } from './components/modal';
import { enableValidation } from './components/validate';
import { createCard } from './components/card';
import { cardAddFormEl } from './components/card';
import { validationConfig } from './components/constants';

import { getInitialCards } from './components/api';

import { profileNameEl, profileProfessionEl } from './components/modal';
import { getUsers } from './components/api';

const profileBtnEl = document.querySelector('.profile__edit-button');
const profileFormEl = document.querySelector('.edit-form');
const cardAddBtnEl = document.querySelector('.profile__add-button');

const profileAvatarEl = document.querySelector('.profile__avatar');

// Отображение предзагруженных карточек с сервера
getInitialCards()
  .then((result) => {
    result.forEach(({ name, link }) => {
      const cardElement = createCard(cardTemplate, name, link);
      cardsContainerEl.prepend(cardElement);
    }
    );
  })
  .catch((err) => {
    console.log(err);
  });

// Загрузка информации о пользователе с сервера
getUsers()
  .then((result) => {
    console.log(result);
    profileNameEl.textContent = result.name;
    profileProfessionEl.textContent = result.about;
    profileAvatarEl.src = result.avatar;
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
