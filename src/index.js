import './styles/index.css';

import Card from './components/Card';
import FormValidator from './components/FormValidator';
import PopupWithForm from './components/PopupWithForm';
import UserInfo from "./components/UserInfo";
import Section from './components/Section';
import Api from './components/Api';

import {
  validationConfig,
  profileBtnEl,
  profileFormEl,
  cardAddBtnEl,
  profilePopupEl,
  profileNameEl,
  profileProfessionEl,
  profileAvatarEl,
  profileAvatarWrapEl,
  profileAvatarBtnEl,
  avatarPopupEl,
  cardAddPopupEl,
  cardsContainerEl,
  cardTemplate,
  cardAddFormEl,
  popupProfile,
  cardCount,
  myUserId } from './components/constants';

export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-19',
  headers: {
    authorization: 'f92b5f7d-6bec-4339-b0cf-17fe28ece879',
    'Content-Type': 'application/json'
  }
});

cardCount = '';

export const user = new UserInfo({
  nameSelector: profileNameEl,
  professionSelector: profileProfessionEl,
  avatarSelector: profileAvatarEl
});

let sectionCards;

// Загрузка информации о пользователе с сервера
// Отображение предзагруженных карточек с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userInfo, cards]) => {
    myUserId = userInfo._id;
    user.setUserInfo(userInfo);
    //Создание секции
    sectionCards = new Section(
      {
        items : cards,
        renderer: ({ name, link, likes, owner, _id }) => {
          return new Card(cardTemplate, name, link, likes, owner._id, _id, userInfo._id).getElement();
        },
      },
      cardsContainerEl
    );
  })
  .catch((err) => {
    console.log(err);
  });

// Функция отображения информации профиля в полях формы редактирования при открытии попапа
function showProfileInfo() {
  popupProfile.open();
  const inputs = profileFormEl.querySelectorAll('.form__textfield');
    inputs.forEach((input) => {
      profileValidator.hideInputError(profileFormEl, input);
    });
  user.getUserInfo();
}

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
export const profileValidator = new FormValidator(
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
      user.setUserInfo(result);
      popupWithFormAvatar.close()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithFormAvatar.renderLoading(false);
    })
  }
});

// Слушатель submit отправки формы редактирования аватара профиля
popupWithFormAvatar.setEventListeners();

// Обработчик «отправки» формы редактирования профиля
export const popupWithFormProfile = new PopupWithForm( profilePopupEl, {
  handleFormSubmit: (data) => {
    popupWithFormProfile.renderLoading(true);

    api.patchUsers(data['user-name'], data['user-profession'])
    .then((result) => {
      user.setUserInfo(result);
      popupProfile.close();
      console.log(result);
    })
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

// Обработчик отправки формы добавления карточек
export const popupCardAdd = new PopupWithForm( cardAddPopupEl, {
  handleFormSubmit: (data) => {
    popupCardAdd.renderLoading(true);

    api.postCards(data['card-name'], data['card-image'])
    .then((result) => {
      let cardElId = result._id;
      let someUserId = result.owner._id;
      const cardElement = new Card(cardTemplate, data['card-name'], data['card-image'], cardCount, someUserId, cardElId, myUserId).getElement();
      sectionCards.addItem(cardElement);
      popupCardAdd.close()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupCardAdd.renderLoading(false);
    })
  }
});

// Слушатель submit отправки формы добавления карточек
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
