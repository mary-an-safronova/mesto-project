// Функции для работы с карточками проекта
import { openPopup, closePopup } from "./utils";
import { myUserId } from "..";
import { deleteCards, putLikes, deleteLikes } from "./api";

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
    if (result.ok) {
      card.remove();
      closePopup(deletePopupEl);
    }
  })
  .catch((err) => {
    console.log(err);
  });

  deleteFormSubmitBtnEl.removeEventListener('click', () => {
    removeClosestCard(button)
  });
}

// Функция открытия попапа подтверждения удаления карточки
const openDeletePopup = (button) => {
  openPopup(deletePopupEl);
  deleteFormSubmitBtnEl.classList.remove('form__submit-button_inactive');
  deleteFormSubmitBtnEl.addEventListener('click', () => {
    removeClosestCard(button)
  });
  button.removeEventListener('click', openDeletePopup);
}

// Функция проверки id пользователя для определения принадлежности карточки
const checkOwnerId = (button, id) => {
  if (id !== myUserId) {
    button.classList.add('place__delete-button_hidden');
  } else {
    button.classList.remove('place__delete-button_hidden');
    button.addEventListener('click', () => {
      openDeletePopup(button);
    });
  }
}

// Функция создания новых карточек
function createCard(template, name, link, likes, id, cardId) {
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

  // Лайк
  // Проверка id пользователя у лайка карточки
  cardLikes.forEach(function (element) {
    if (element._id === myUserId) {
      likeElement.classList.add('place__like_active');
    }
  })

  // Переключатель счетчика лайка
  const toggleLikeCounter = () => {
    if (!(likeElement.classList.contains('place__like_active'))) {
      likeCounterEl.textContent =  likes.length + 1;
    } else if (likeElement.classList.contains('place__like_active') && (likeCounterEl.textContent >= 1)) {
      likeCounterEl.textContent =  (likes.length + 1) - 1;
    }
  }

  // Добавление лайка карточки на сервер
  const handlePutLike = () => {
    return putLikes(cardElement.id)
      .then((result) => {
        if (result.ok) {
          if (!(likeElement.classList.contains('place__like_active'))) {
            likeCounterEl.textContent =  likes.length + 1;
          }
          likeElement.classList.add('place__like_active');
          likeCounterEl.textContent = result.likes.length;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    };

  // Добавление лайка карточки на сервер
  const handleDeleteLike = () => {
    return deleteLikes(cardElement.id)
      .then((result) => {
        if (result.ok) {
          if ((likeElement.classList.contains('place__like_active')) && (likeCounterEl.textContent > 0)) {
            likeCounterEl.textContent =  likes.length - 1;
          }
          likeElement.classList.remove('place__like_active');
          likeCounterEl.textContent = result.likes.length;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    };

  // Слушатель кнопки лайка карточки
  likeElement.addEventListener('click', function () {
    toggleLikeCounter();
    if (likeElement.classList.contains('place__like_active')) {
      handleDeleteLike();
    } else {
      handlePutLike();
    }
  });

  // Корзина
  checkOwnerId(deleteBtnElement, id, cardId);

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
