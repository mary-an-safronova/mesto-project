import './styles/index.css';

import { openAndCleanForm, showProfileInfo, handleProfileFormSubmit, handleAddFormSubmit } from './components/modal';
import { cardTemplate, cardsContainerEl } from './components/modal';
import { enableValidation } from './components/validate';
import { createCard } from './components/card';
import { cardAddFormEl } from './components/card';
import { validationConfig } from './components/constants';

import { getInitialCards } from './components/api';

const profileBtnEl = document.querySelector('.profile__edit-button');
const profileFormEl = document.querySelector('.edit-form');
const cardAddBtnEl = document.querySelector('.profile__add-button');

getInitialCards()
  .then((result) => {
    console.log(result);
    result.forEach(({ name, link }) => {
      const cardElement = createCard(cardTemplate, name, link);
      cardsContainerEl.prepend(cardElement);
    }
    );
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
