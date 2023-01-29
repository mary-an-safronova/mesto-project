import './styles/index.css';

import { openAndCleanForm, showProfileInfo, handleProfileFormSubmit, handleAddFormSubmit } from './components/modal';
import { cardTemplate, cardsContainerEl, profileNameEl, profileProfessionEl } from './components/modal';
import { enableValidation } from './components/validate';
import { createCard } from './components/card';
import { cardAddFormEl } from './components/card';
import { validationConfig } from './components/constants';
import { getInitialCards, getUsers } from './components/api';

export { myUserId, cardElId, someUserId };

const profileBtnEl = document.querySelector('.profile__edit-button');
const profileFormEl = document.querySelector('.edit-form');
const cardAddBtnEl = document.querySelector('.profile__add-button');
const profileAvatarEl = document.querySelector('.profile__avatar');
const cardDeleteBtnElements = document.querySelectorAll('.place__delete-button');

let myUserId = '';
let cardElId = '';
let someUserId = '';

// Загрузка информации о пользователе с сервера
getUsers()
  .then((result) => {
    myUserId = result._id;
    profileNameEl.textContent = result.name;
    profileProfessionEl.textContent = result.about;
    profileAvatarEl.src = result.avatar;
  })
  .catch((err) => {
    console.log(err);
  });

// Отображение предзагруженных карточек с сервера
getInitialCards()
  .then((result) => {
    result.forEach(({ name, link, likes, owner, _id }) => {
      const cardElement = createCard(cardTemplate, name, link, likes, owner['_id'], _id);
      cardsContainerEl.append(cardElement);
      cardElId = _id;
      someUserId = owner['_id'];
    });
    cardDeleteBtnElements.forEach((cardDeleteBtnEl) => {
      let studentId = cardDeleteBtnEl.closest('.place').owner['_id'];
      if (studentId !== myUserId) {
        cardDeleteBtnEl.classList.add('place__delete-button_hidden');
      }
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
