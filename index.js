const profileBtnEl = document.querySelector('.profile__edit-button');
const profileBtnSubmitEl = document.querySelector('.edit-form__submit-button');
const profilePopupEl = document.querySelector('.popup-edit');

const cardAddBtnEl = document.querySelector('.profile__add-button');
const cardAddBtnSubmitEl = document.querySelector('.add-form__submit-button');
const cardAddPopupEl = document.querySelector('.popup-add');

// Открытие модальных окон
profileBtnEl.addEventListener('click', () => {
  profilePopupEl.classList.add('popup_opened');
});

profileBtnSubmitEl.addEventListener('click', () => {
  profilePopupEl.classList.remove('popup_opened');
});

cardAddBtnEl.addEventListener('click', () => {
  cardAddPopupEl.classList.add('popup_opened');
});

cardAddBtnSubmitEl.addEventListener('click', () => {
  cardAddPopupEl.classList.remove('popup_opened');
});

// Заполнение полей формы редактирования профиля значениями, которые отображаются на странице
let profileNameEl = document.querySelector('.profile__name');
let profileProfessionEl = document.querySelector('.profile__profession');

const inputName = document.getElementById('name');
const inputProfession = document.getElementById('profession');

inputName.value = (inputName !== "") ? profileNameEl.innerHTML : "";
inputProfession.value = (inputProfession !== "") ? profileProfessionEl.innerHTML : "";

// Редактирование имени и информации о пользователе
const profileFormEl = document.querySelector('.edit-form');
// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault();

  profileNameEl.textContent = inputName.value;
  profileProfessionEl.textContent = inputProfession.value;
}
profileFormEl.addEventListener('submit', formSubmitHandler);

// Новый массив карточек
const initialCards = [{
  name: 'Архыз',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
}, {
  name: 'Челябинская область',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
}, {
  name: 'Иваново',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
}, {
  name: 'Камчатка',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
}, {
  name: 'Холмогорский район',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
}, {
  name: 'Байкал',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}];

// Добавление карточек из массива
const cardsContainerEl = document.querySelector('.grid-places');
const cardTemplate = document.querySelector('#place-template').content;

const cardsArr = initialCards.map(function (item) {
  return {
    name: item.name,
    link: item.link
  };
});

function createNewCardFromTemplate(template, name, link) {
  const cardElement = template.querySelector('.place').cloneNode(true);
  cardElement.querySelector('.place__name').textContent = name;
  cardElement.querySelector('.place__image').src = link;
  cardElement.querySelector('.place__image').style.aspectRatio = '1 / 1';

  cardsContainerEl.prepend(cardElement);
}

cardsArr.forEach(
  function ({
    name,
    link
  }) {
    createNewCardFromTemplate(cardTemplate, name, link);
  });

// Добавление новых карточек через форму
const inputCardName = document.getElementById('card-name');
const inputCardImg = document.getElementById('card-image');

const cardAddFormEl = document.querySelector('.add-form');
// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function AddFormSubmitHandler(evt) {
  evt.preventDefault();

  createNewCardFromTemplate(cardTemplate, inputCardName.value, inputCardImg.value);
}

cardAddFormEl.addEventListener('submit', AddFormSubmitHandler);

// Лайк
const likeElements = document.querySelectorAll('.place__like');

likeElements.forEach((likeElement) => {
  likeElement.addEventListener('click', () => {
    likeElement.classList.toggle('place__like_active');
  });
});

// Корзина
const deleteBtnElements = cardsContainerEl.querySelectorAll('.place__delete-button');

deleteBtnElements.forEach((deleteBtnElement) => {
  deleteBtnElement.addEventListener('click', () => {
    deleteBtnElement.parentElement.remove();
  });
});

// Открытие попапа с увеличенным изображением карточки
const cardElement = cardTemplate.querySelector(".place").cloneNode(true);
let cardName = cardElement.querySelector('.place__name');

const cardImgPopupEl = document.querySelector('.popup-img');
const imgPopupCloseIconEl = cardImgPopupEl.querySelector('.popup__close-icon');
const imgPopupEl = cardImgPopupEl.querySelector('.popup__image');
const imgPopupCaptionEl = cardImgPopupEl.querySelector('.popup__img-caption');

const cardElements = document.querySelectorAll('.place');

for (let i = 0; i <= cardElements.length; i++) {
  let cardElement = cardElements[i];
  if (cardElement) {
    let cardImg = cardElement.querySelector('.place__image');

    cardImg.addEventListener('click', () => {
      cardImg = cardElement.querySelector('.place__image');
      cardName = cardElement.querySelector('.place__name');

      imgPopupEl.src = cardImg.src;
      imgPopupCaptionEl.textContent = cardName.textContent;

      cardImgPopupEl.classList.add('popup_opened');
    });
  }
}

// Плавное открытие и закрытие попапов
function toggleTwoClasses(el, classOpened, classClosed, timeOfAnimation) {
  if (!el.classList.contains(classOpened)) {
    el.classList.add(classOpened);
    el.classList.remove(classClosed);
  } else {
    el.classList.add(classClosed);
    window.setTimeout(function () {
      el.classList.remove(classOpened);
    }, timeOfAnimation);
  }
}

const profilePopupCloseIconEl = document.querySelector('.popup__close-icon-edit');
const cardAddPopupCloseIconEl = document.querySelector('.popup__close-icon-add');

document.addEventListener("DOMContentLoaded", () => {
  profilePopupCloseIconEl.addEventListener("click", () => {
    toggleTwoClasses(profilePopupEl, "popup_opened", "popup_closed", 500);
  });

  cardAddPopupCloseIconEl.addEventListener("click", () => {
    toggleTwoClasses(cardAddPopupEl, "popup_opened", "popup_closed", 500);
  });

  imgPopupCloseIconEl.addEventListener("click", () => {
    toggleTwoClasses(cardImgPopupEl, "popup_opened", "popup_closed", 500);
  });
});
