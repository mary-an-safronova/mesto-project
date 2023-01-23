// Функции для работы с карточками проекта
import { openPopup } from "./utils";

export { createCard };
export { cardAddFormEl };

const cardImgPopupEl = document.querySelector('.popup-img');
const imgPopupEl = cardImgPopupEl.querySelector('.popup__image');
const imgPopupCaptionEl = cardImgPopupEl.querySelector('.popup__img-caption');

const cardAddFormEl = document.querySelector('.add-form');

// Функция создания новых карточек
function createCard(template, name, link) {
  const cardElement = template.querySelector('.place').cloneNode(true);
  cardElement.querySelector('.place__name').textContent = name;
  const cardImg = cardElement.querySelector('.place__image');
  cardImg.src = link;
  cardImg.classList.add('place__image_size');
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




