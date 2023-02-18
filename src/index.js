import './styles/index.css';

import { showProfileInfo } from './components/modal';
import { cardTemplate, cardsContainerEl, cardAddPopupEl, avatarPopupEl, profilePopupEl } from './components/modal';

import Card, { cardAddFormEl } from './components/card';
import { validationConfig } from './components/constants';
import FormValidator from './components/validate';
import { api } from './components/api';
import PopupWithForm from './components/PopupWithForm';
import Popup from './components/Popup';

import UserInfo from "./components/UserInfo";

export { myUserId, cardElId, someUserId, profileAvatarEl };
export { profileValidator, profileFormEl, popupWithFormProfile, popupCardAdd };
export { inputName, inputProfession, profileNameEl, profileProfessionEl };

const profileBtnEl = document.querySelector('.profile__edit-button');
const profileFormEl = document.querySelector('.edit-form');
const cardAddBtnEl = document.querySelector('.profile__add-button');
const profileAvatarEl = document.querySelector('.profile__avatar');
const profileAvatarWrapEl = document.querySelector('.profile__avatar-wrap');
const profileAvatarBtnEl = document.querySelector('.profile__avatar-cover');

const inputName = document.querySelector('#name');
const profileNameEl = document.querySelector('.profile__name');
const inputProfession = document.querySelector('#profession');
const profileProfessionEl = document.querySelector('.profile__profession');
let cardCount = cardTemplate.querySelector('.place__like-count');
cardCount = '';
export const popupProfile = new Popup(profilePopupEl);

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

// Добавления слушателя клика на кнопку редактирования профиля
profileBtnEl.addEventListener('click', showProfileInfo);

// Слушатель наведения мыши на аватар
profileAvatarWrapEl.addEventListener('mouseover', () => {
  profileAvatarBtnEl.classList.add('profile__avatar-cover_opened');
});

profileAvatarWrapEl.addEventListener('mouseout', () => {
  profileAvatarBtnEl.classList.remove('profile__avatar-cover_opened');
});

// Валидация форм
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

// Обработчик отправки формы редактирования аватара профиля
const popupWithFormAvatar = new PopupWithForm(avatarPopupEl, {
  handleFormSubmit: (data) => {
    popupWithFormAvatar.renderLoading(true);

    return api.patchUserAvatar(data['avatar-image'])
    .then((result) => {
      profileAvatarEl.src = result.avatar;
      popupWithFormAvatar.close()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithFormAvatar.renderLoading(false);
    })
  },
});

// Слушатель submit «отправки» формы редактирования аватара профиля
popupWithFormAvatar.setEventListeners();

const setUserInfo = () => {
  profileNameEl.textContent = inputName.value;
  profileProfessionEl.textContent = inputProfession.value;
};

// Обработчик «отправки» формы редактирования профиля
const popupWithFormProfile = new PopupWithForm( profilePopupEl, {
  handleFormSubmit: (data) => {
    popupWithFormProfile.renderLoading(true);

    api.patchUsers(data['user-name'], data['user-profession'])
    .then((result) => {
      setUserInfo();
      popupProfile.close()
      console.log(result);
    })
    // .then(popupProfile.close())
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithFormProfile.renderLoading(false);
    })
  },
});

// Слушатель submit «отправки» формы редактирования профиля
popupWithFormProfile.setEventListeners();

// Обработчик «отправки» формы добавления карточек
const popupCardAdd = new PopupWithForm( cardAddPopupEl, {
  handleFormSubmit: (data) => {
    console.log(data);
    popupCardAdd.renderLoading(true);

    api.postCards(data['card-name'], data['card-image'])
    .then((result) => {
      let cardElId = result._id;
      let someUserId = result.owner._id;
      const cardElement = new Card(cardTemplate, data['card-name'], data['card-image'], cardCount, someUserId, cardElId, myUserId).getElement();
      cardsContainerEl.prepend(cardElement);
      popupCardAdd.close()
    })
    // .then(popupCardAdd.close())
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupCardAdd.renderLoading(false);
    })
  }
});

// Слушатель submit «отправки» формы добавления карточек
popupCardAdd.setEventListeners();

// Слушатель кнопки редактирования аватара профиля
profileAvatarBtnEl.addEventListener('click', () => {
  popupWithFormAvatar.open();
  profileValidator.cleanForm(avatarPopupEl);
});

// Добавления слушателя клика на кнопку добавления карточки
cardAddBtnEl.addEventListener('click', () => {
  popupCardAdd.open();
  cardAddValidator.cleanForm(cardAddPopupEl);
});
