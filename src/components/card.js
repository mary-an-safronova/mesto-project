// Функции для работы с карточками проекта
import { api } from "./api";
import { cardAddValidator } from "..";
import Popup from "./Popup";
import PopupWithImage from "./PopupWithImage";

export { cardAddFormEl, deletePopupEl, Card};

const cardImgPopupEl = document.querySelector('.popup-img');
const cardAddFormEl = document.querySelector('.add-form');
const deletePopupEl = document.querySelector('.popup-delete');
const deleteFormSubmitBtnEl = document.querySelector('.delete-form__submit-button');
const popupDelete = new Popup(deletePopupEl);

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
    deleteBtnElement.addEventListener('click', this._openDeletePopup.bind(this, cardElement));
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
      .then(popupDelete.close())
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        deleteFormSubmitBtnEl.removeEventListener('click', deleteCard);
      })
  }

  // Функция открытия попапа подтверждения удаления карточки
  _openDeletePopup(cardElement) {
    popupDelete.open();
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
    const popupImg = new PopupWithImage(cardImgPopupEl);
    popupImg.open(this.link, this.name);
    cardImg.removeEventListener('click', this._openCardElementPopup.bind(this));
  }

// Обработчик удаления карточки, Слушатель submit удаления карточек
  setEventListeners() {
    deletePopupEl.addEventListener('submit', function (evt) {
      evt.preventDefault();
    })
  }
}
