// Функции для работы с карточками проекта
import { api } from "./api";
import { cardAddValidator } from "..";
import Popup from "./Popup";

export { createCard };
export { cardAddFormEl, deletePopupEl, deleteFormSubmitBtnEl };

const cardImgPopupEl = document.querySelector('.popup-img');
const imgPopupEl = cardImgPopupEl.querySelector('.popup__image');
const imgPopupCaptionEl = cardImgPopupEl.querySelector('.popup__img-caption');
const cardAddFormEl = document.querySelector('.add-form');
const deletePopupEl = document.querySelector('.popup-delete');
const deleteFormSubmitBtnEl = document.querySelector('.delete-form__submit-button');
const popupDelete = new Popup(deletePopupEl);

// Функция удаления ближайшей к корзине карточки
const removeClosestCard = (button) => {
  const card = button.closest('.place');

  api.deleteCards(card.id)
  .then((result) => {
    card.remove();
    console.log(result);
  })
  .then(popupDelete.close())
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
  popupDelete.open();
  cardAddValidator.enableSubmitButton(deleteFormSubmitBtnEl);
  deleteFormSubmitBtnEl.addEventListener('click', () => {
    removeClosestCard(button)
  });
  button.removeEventListener('click', openDeletePopup);
}

// Добавление лайка карточки на сервер
const handlePutLike = (like, counter) => {
  const card = like.closest('.place');

  return api.putLikes(card.id)
    .then((result) => {
      like.classList.add('place__like_active');
      counter.textContent = result.likes.length;

      console.log(result.likes.length);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      like.removeEventListener('click', () => {
        removeClosestCard(button)
      });
    })
  };

// Удаление лайка карточки с сервера
const handleDeleteLike = (like, counter) => {
  const card = like.closest('.place');

  return api.deleteLikes(card.id)
    .then((result) => {
      like.classList.remove('place__like_active');
      counter.textContent = result.likes.length;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      like.removeEventListener('click', () => {
        removeClosestCard(button)
      });
    })
  };

// Функция создания новых карточек
function createCard(template, name, link, likes, id, cardId, myId) {
  const cardElement = template.querySelector('.place').cloneNode(true);
  const cardImg = cardElement.querySelector('.place__image');
  const likeElement = cardElement.querySelector('.place__like');
  const likeCounterEl = cardElement.querySelector('.place__like-count');
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
      handleDeleteLike(likeElement, likeCounterEl);
    } else {
      handlePutLike(likeElement, likeCounterEl);
    }
  });

  // Открытие попапов изображений карточек (в т.ч. новых)
  const openCardImage = () => {
    const popupImg = new Popup(cardImgPopupEl);
    popupImg.open();
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
