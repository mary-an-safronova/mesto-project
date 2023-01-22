// Функции для работы с карточками проекта
import { openPopup, closePopup } from "./utils";
import { cleanForm } from "./validate";
import { enableValidation } from "./validate";

export { openAndCleanForm, handleAddFormSubmit, createCardWithEnter };
export { cardAddFormEl };

const inputCardName = document.querySelector('#card-name');
const inputCardImg = document.querySelector('#card-image');
const cardsContainerEl = document.querySelector('.grid-places');
const cardTemplate = document.querySelector('#place-template').content;
const cardImgPopupEl = document.querySelector('.popup-img');
const imgPopupEl = cardImgPopupEl.querySelector('.popup__image');
const imgPopupCaptionEl = cardImgPopupEl.querySelector('.popup__img-caption');
const cardAddPopupEl = document.querySelector('.popup-add');
const cardAddFormEl = document.querySelector('.add-form');

// Функция открытия формы добавления карточки и очистка полей
function openAndCleanForm() {
  openPopup(cardAddPopupEl);
  cleanForm();
}

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
const cardsArr = initialCards.map(function (item) {
  return {
    name: item.name,
    link: item.link
  };
});

// Функция создания новых карточек
function createCard(template, name, link) {
  const cardElement = template.querySelector('.place').cloneNode(true);
  cardElement.querySelector('.place__name').textContent = name;
  const cardImg = cardElement.querySelector('.place__image');
  cardImg.src = link;
  cardImg.style.aspectRatio = '1 / 1';
  cardImg.alt = name;
  // Лайк
  const likeElement = cardElement.querySelector('.place__like');
  likeElement.addEventListener('click', () => {
    likeElement.classList.toggle('place__like_active');
  });
  // Корзина
  const deleteBtnElement = cardElement.querySelector('.place__delete-button');
  deleteBtnElement.addEventListener('click', () => {
    deleteBtnElement.closest('.place').remove();
  });
  // Открытие попапов изображений карточек (в т.ч. новых)
  cardImg.addEventListener('click', () => {
    openPopup(cardImgPopupEl);
    imgPopupEl.src = link;
    imgPopupCaptionEl.textContent = name;
    imgPopupEl.alt = name;
  });

  return cardElement
}

cardsArr.forEach(
  function ({
    name,
    link
  }) {
    const cardElement = createCard(cardTemplate, name, link);
    cardsContainerEl.prepend(cardElement);
  }
);

// Добавление новых карточек через форму
// Обработчик «отправки» формы добавления карточек
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  closePopup(cardAddPopupEl);
  const cardElement = createCard(cardTemplate, inputCardName.value, inputCardImg.value);
  cardsContainerEl.prepend(cardElement);
}

// Добавление новой карточки при клике на клавишу Enter
function createCardWithEnter(event) {
  if (event.code === 'Enter' && enableValidation() === true) {
    handleAddFormSubmit();
    cardAddFormEl.submit();
  }
}
