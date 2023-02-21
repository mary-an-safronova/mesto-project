export default class Card {
  constructor(settings) {
    const { template, name, link, likes, id, cardId, myId, api, cardImgPopupEl, deletePopupEl, deleteFormSubmitBtnEl, openPopupImg, openPopupDelete} = settings;
    this.template = template;
    this.name = name;
    this.link = link;
    this.likes = likes;
    this.ownerId = id;
    this.cardId = cardId;
    this.myId = myId;
    this.api = api;
    this.cardImgPopupEl = cardImgPopupEl;
    this.deletePopupEl = deletePopupEl;
    this.deleteFormSubmitBtnEl = deleteFormSubmitBtnEl;
    //this._cardElement = this.getElement();
    this.openPopupImg = openPopupImg;
    this.openPopupDelete = openPopupDelete;
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

    cardImg.addEventListener('click', this.openPopupImg.bind(this, this.link, this.name));
    likeElement.addEventListener('click', this._handleLike.bind(this, likeElement, likeCounterEl));
    deleteBtnElement.addEventListener('click', this.openPopupDelete.bind(this, cardElement, this.cardId));
    //this._setEventListeners();

    this._checkOwnerId(deleteBtnElement);
    this._checkLikeOwnerId(cardLikes, likeElement);

    return cardElement;
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

    return this.api.putLikes(card.id)
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

    return this.api.deleteLikes(card.id)
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

// // Обработчики добавлены в один метод
//   _setEventListeners(cardImg, likeElement, likeCounterEl, deleteBtnElement, cardElement) {
//     cardImg.addEventListener('click', this._openCardElementPopup.bind(this));
//     likeElement.addEventListener('click', this._handleLike.bind(this, likeElement, likeCounterEl));
//     deleteBtnElement.addEventListener('click', this._openDeletePopup.bind(this, cardElement));
//   }

// Обработчик удаления карточки, Слушатель submit удаления карточек
  setEventListeners() {
    this.deletePopupEl.addEventListener('submit', function (evt) {
      evt.preventDefault();
    })
}
}

