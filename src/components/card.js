// Функции для работы с карточками проекта
import { openPopup, closePopup } from "./utils";
import { enableSubmitButton } from "./validate";
import { api } from "./api";

export { cardAddFormEl, deletePopupEl, Card};

const cardImgPopupEl = document.querySelector('.popup-img');
const imgPopupEl = cardImgPopupEl.querySelector('.popup__image');
const imgPopupCaptionEl = cardImgPopupEl.querySelector('.popup__img-caption');
const cardAddFormEl = document.querySelector('.add-form');
const deletePopupEl = document.querySelector('.popup-delete');
const deleteFormSubmitBtnEl = document.querySelector('.delete-form__submit-button');


export default class Card {
  constructor(template, name, link, likes, id, cardId, myId) {
    this.template = template;
    this.name = name;
    this.link = link;
    this.likes = likes;
    this.ownerId = id;
    this.cardId = cardId;
    this.myId = myId;
  }

  getElement() {
    const cardElement = this.template.querySelector('.place').cloneNode(true);
    const cardImg = cardElement.querySelector('.place__image');
    const likeElement = cardElement.querySelector('.place__like');
    const likeCounterEl = cardElement.querySelector('.place__like-count');
    const deleteBtnElement = cardElement.querySelector('.place__delete-button');
    cardElement.querySelector('.place__name').textContent = this.name;
    cardImg.src = this.link;
    cardImg.classList.add('place__image_size');
    cardImg.alt = this.name;
    likeCounterEl.textContent = this.likes.length;
    cardElement.id = this.cardId;
    const cardLikes = Array.from(this.likes);

    cardImg.addEventListener('click', this._openCardElementPopup.bind(this));
    likeElement.addEventListener('click', this._handleLike.bind(this, likeElement, likeCounterEl));
    deleteBtnElement.addEventListener('click', this._openDeletePopup.bind(this, deletePopupEl, cardElement));
    this._checkOwnerId(deleteBtnElement);
    this._checkLikeOwnerId(cardLikes, likeElement);

    return cardElement;
  }
  // Функция удаления ближайшей к корзине карточки
  _removeCard(cardElement, deleteCard) {
    console.log(cardElement, this.cardId)
    api.deleteCards(this.cardId)
      .then((result) => {
        cardElement.remove();
        console.log(result);
      })
      .then(closePopup(deletePopupEl))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        deleteFormSubmitBtnEl.removeEventListener('click', deleteCard);
      })
  }

  // Функция открытия попапа подтверждения удаления карточки
  _openDeletePopup(deletePopupEl, cardElement) {
    openPopup(deletePopupEl);
    this.setEventListeners();
    const deleteCard = () => {
      this._removeCard.call(this, cardElement, deleteCard);
    }
    deleteFormSubmitBtnEl.addEventListener('click', deleteCard);
  }

  _handleLike(likeElement, likeCounterEl) {
      if (likeElement.classList.contains('place__like_active')) {
        this._handleDeleteLike(likeElement, likeCounterEl);
      } else {
        this._handlePutLike(likeElement, likeCounterEl);
      }
  }

  // Добавление лайка карточки на сервер
  _handlePutLike(like, counter) {
    const card = like.closest('.place');

    return api.putLikes(card.id)
      .then((result) => {
        like.classList.add('place__like_active');
        counter.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        like.removeEventListener('click', function () {
          this.removeClosestCard()
        });
      })
  };

  // Удаление лайка карточки с сервера
  _handleDeleteLike(like, counter) {
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
        like.removeEventListener('click', function () {
          this.removeClosestCard()
        });
      })
    };

  // Корзина
  // Функция проверки id пользователя для определения принадлежности карточки
  _checkOwnerId (deleteBtnElement) {
    if (this.ownerId !== this.myId) {
      deleteBtnElement.classList.add('place__delete-button_hidden');
    } else {
      deleteBtnElement.classList.remove('place__delete-button_hidden');
    }
  }

  // Лайк
  // Проверка id пользователя у лайка карточки
  _checkLikeOwnerId(cardLikes, likeElement) {
    cardLikes.forEach((element) => {
      if (element._id === this.myId) {
        likeElement.classList.add('place__like_active');
      }
    })
  }

  // Открытие попапов изображений карточек (в т.ч. новых)
  _openCardElementPopup() {
    openPopup(cardImgPopupEl);
    imgPopupEl.src = this.link;
    imgPopupCaptionEl.textContent = this.name;
    imgPopupEl.alt = this.name;
  }

// Обработчик удаления карточки, Слушатель submit удаления карточек
  setEventListeners() {
    deletePopupEl.addEventListener('submit', function (evt) {
      evt.preventDefault();
    })
  }
}


// // Функция удаления ближайшей к корзине карточки
// const removeClosestCard = (button) => {
//   const card = button.closest('.place');
//
//   api.deleteCards(card.id)
//   .then((result) => {
//     card.remove();
//     console.log(result);
//   })
//   .then(closePopup(deletePopupEl))
//   .catch((err) => {
//     console.log(err);
//   })
//   .finally(() => {
//     deleteFormSubmitBtnEl.removeEventListener('click', () => {
//       removeClosestCard(button)
//     });
//   })
// }
//
// // Функция открытия попапа подтверждения удаления карточки
// const openDeletePopup = (button) => {
//   openPopup(deletePopupEl);
//   enableSubmitButton(deleteFormSubmitBtnEl);
//   deleteFormSubmitBtnEl.addEventListener('click', () => {
//     removeClosestCard(button)
//   });
//   button.removeEventListener('click', openDeletePopup);
// }
//
// // Добавление лайка карточки на сервер
// const handlePutLike = (like, counter) => {
//   const card = like.closest('.place');
//
//   return api.putLikes(card.id)
//     .then((result) => {
//       like.classList.add('place__like_active');
//       counter.textContent = result.likes.length;
//
//       console.log(result.likes.length);
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       like.removeEventListener('click', () => {
//         removeClosestCard(button)
//       });
//     })
//   };
//
// // Удаление лайка карточки с сервера
// const handleDeleteLike = (like, counter) => {
//   const card = like.closest('.place');
//
//   return api.deleteLikes(card.id)
//     .then((result) => {
//       like.classList.remove('place__like_active');
//       counter.textContent = result.likes.length;
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       like.removeEventListener('click', () => {
//         removeClosestCard(button)
//       });
//     })
//   };
//
// // Функция создания новых карточек
// function createCard(template, name, link, likes, id, cardId, myId) {
//   const cardElement = template.querySelector('.place').cloneNode(true);
//   const cardImg = cardElement.querySelector('.place__image');
//   const likeElement = cardElement.querySelector('.place__like');
//   const likeCounterEl = cardElement.querySelector('.place__like-count');
//   const deleteBtnElement = cardElement.querySelector('.place__delete-button');
//   cardElement.querySelector('.place__name').textContent = name;
//   cardImg.src = link;
//   cardImg.classList.add('place__image_size');
//   cardImg.alt = name;
//   likeCounterEl.textContent = likes.length;
//   cardElement.id = cardId;
//   const cardLikes = Array.from(likes);
//
//   // Корзина
//   // Функция проверки id пользователя для определения принадлежности карточки
//   const checkOwnerId = (button) => {
//     if (id !== myId) {
//       button.classList.add('place__delete-button_hidden');
//     } else {
//       button.classList.remove('place__delete-button_hidden');
//       button.addEventListener('click', () => {
//         openDeletePopup(button);
//       });
//     }
//   }
//
//   checkOwnerId(deleteBtnElement);
//
//   // Лайк
//   // Проверка id пользователя у лайка карточки
//   const checkLikeOwnerId = () => {
//     cardLikes.forEach((element) => {
//       if (element._id === myId) {
//         likeElement.classList.add('place__like_active');
//       }
//     })
//   }
//
//   checkLikeOwnerId();
//
//   // Слушатель кнопки лайка карточки
//   likeElement.addEventListener('click', () => {
//     if (likeElement.classList.contains('place__like_active')) {
//       handleDeleteLike(likeElement, likeCounterEl);
//     } else {
//       handlePutLike(likeElement, likeCounterEl);
//     }
//   });
//
//   // Открытие попапов изображений карточек (в т.ч. новых)
//   const openCardImage = () => {
//     openPopup(cardImgPopupEl);
//     imgPopupEl.src = link;
//     imgPopupCaptionEl.textContent = name;
//     imgPopupEl.alt = name;
//     cardImg.removeEventListener('click', openCardImage);
//   }
//
//   cardImg.addEventListener('click', openCardImage);
//
//   return cardElement
// }
//
// // Обработчик удаления карточки
// function handleDeleteFormSubmit(evt) {
//   evt.preventDefault();
// }
//
// // Слушатель submit удаления карточек
// deletePopupEl.addEventListener('submit', handleDeleteFormSubmit);
