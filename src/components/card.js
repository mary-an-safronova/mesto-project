// Функции для работы с карточками проекта
import { openPopup, closePopup } from "./utils";
import { deleteCards, putLikes, deleteLikes } from "./api";
import { enableSubmitButton } from "./validate";

export { createCard };
export { cardAddFormEl, deletePopupEl, deleteFormSubmitBtnEl };

const cardImgPopupEl = document.querySelector('.popup-img');
const imgPopupEl = cardImgPopupEl.querySelector('.popup__image');
const imgPopupCaptionEl = cardImgPopupEl.querySelector('.popup__img-caption');
const cardAddFormEl = document.querySelector('.add-form');
const deletePopupEl = document.querySelector('.popup-delete');
const deleteFormSubmitBtnEl = document.querySelector('.delete-form__submit-button');

// Функция удаления ближайшей к корзине карточки
const removeClosestCard = (button) => {
  let card = button.closest('.place');

  deleteCards(card.id)
  .then((result) => {
    card.remove();
    console.log(result);
  })
  .then(closePopup(deletePopupEl))
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    deleteFormSubmitBtnEl.removeEventListener('click', () => {
      removeClosestCard(button)
    });
  })
}

// Функция открытия попапа подтверждения удаления карточки
const openDeletePopup = (button) => {
  openPopup(deletePopupEl);
  enableSubmitButton(deleteFormSubmitBtnEl);
  deleteFormSubmitBtnEl.addEventListener('click', () => {
    removeClosestCard(button)
  });
  button.removeEventListener('click', openDeletePopup);
}

// Добавление лайка карточки на сервер
const handlePutLike = (like, counter, card) => {
  return putLikes(card.id)
    .then((result) => {
      like.classList.add('place__like_active');
      counter.textContent = result.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
  };

// Удаление лайка карточки с сервера
const handleDeleteLike = (like, counter, card) => {
  return deleteLikes(card.id)
    .then((result) => {
      like.classList.remove('place__like_active');
      counter.textContent = result.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
  };

// Функция создания новых карточек
function createCard(template, name, link, likes, id, cardId, myId) {
  const cardElement = template.querySelector('.place').cloneNode(true);
  const cardImg = cardElement.querySelector('.place__image');
  const likeElement = cardElement.querySelector('.place__like');
  let likeCounterEl = cardElement.querySelector('.place__like-count');
  const deleteBtnElement = cardElement.querySelector('.place__delete-button');
  cardElement.querySelector('.place__name').textContent = name;
  cardImg.src = link;
  cardImg.classList.add('place__image_size');
  cardImg.alt = name;
  likeCounterEl.textContent = likes.length;
  cardElement.id = cardId;
  const cardLikes = Array.from(likes);

  // Корзина
  // Функция проверки id пользователя для определения принадлежности карточки
  const checkOwnerId = (button) => {
    if (id !== myId) {
      button.classList.add('place__delete-button_hidden');
    } else {
      button.classList.remove('place__delete-button_hidden');
      button.addEventListener('click', () => {
        openDeletePopup(button);
      });
    }
  }

  checkOwnerId(deleteBtnElement);

  // Лайк
  // Проверка id пользователя у лайка карточки
  const checkLikeOwnerId = () => {
    cardLikes.forEach((element) => {
      if (element._id === myId) {
        likeElement.classList.add('place__like_active');
      }
    })
  }

  checkLikeOwnerId();

  // Слушатель кнопки лайка карточки
  likeElement.addEventListener('click', () => {
    if (likeElement.classList.contains('place__like_active')) {
      handleDeleteLike(likeElement, likeCounterEl, cardElement);
    } else {
      handlePutLike(likeElement, likeCounterEl, cardElement);
    }
  });

  // Открытие попапов изображений карточек (в т.ч. новых)
  const openCardImage = () => {
    openPopup(cardImgPopupEl);
    imgPopupEl.src = link;
    imgPopupCaptionEl.textContent = name;
    imgPopupEl.alt = name;
    cardImg.removeEventListener('click', openCardImage);
  }

  cardImg.addEventListener('click', openCardImage);

  return cardElement
}

// Обработчик удаления карточки
function handleDeleteFormSubmit(evt) {
  evt.preventDefault();
}

// Слушатель submit удаления карточек
deletePopupEl.addEventListener('submit', handleDeleteFormSubmit);
