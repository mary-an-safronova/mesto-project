import './styles/index.css';

import { pressEscape, showProfileInfo, handleProfileFormSubmit } from './components/modal';
import { enableValidation } from './components/validate';
import { openAndCleanForm, handleAddFormSubmit, createCardWithEnter } from './components/card';
import { cardAddFormEl } from './components/card';

const profileBtnEl = document.querySelector('.profile__edit-button');
const profileFormEl = document.querySelector('.edit-form');
const cardAddBtnEl = document.querySelector('.profile__add-button');

// Добавления слушателя клика на кнопку добавления карточки
cardAddBtnEl.addEventListener('click', openAndCleanForm);

// Добавление слушателя нажатия на клавишу escape
document.addEventListener('keydown', pressEscape);

// Добавления слушателя клика на кнопку редактирования профиля
profileBtnEl.addEventListener('click', showProfileInfo);

// Валидация форм
enableValidation();

// Слушатель submit «отправки» формы редактирования профиля
profileFormEl.addEventListener('submit', handleProfileFormSubmit);

// Слушатель submit «отправки» формы добавления карточек
cardAddFormEl.addEventListener('submit', handleAddFormSubmit);


// Слушатель нажатия на клавишу Enter для добавления карточки
cardAddFormEl.addEventListener('input', createCardWithEnter);
