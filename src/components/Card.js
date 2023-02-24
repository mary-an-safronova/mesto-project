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
    this.openPopupImg = openPopupImg;
    this.openPopupDelete = openPopupDelete;
    this.cardImgPopupEl = cardImgPopupEl;
    this.deletePopupEl = deletePopupEl;
    this.deleteFormSubmitBtnEl = deleteFormSubmitBtnEl;
    this._cardElement = this._getElement();
  }

  getElement() {
    return this._cardElement;
  }

  _getElement() {
    this._cardElement = this.template.querySelector('.place').cloneNode(true);
    this.cardImg = this._cardElement.querySelector('.place__image');
    this.likeElement = this._cardElement.querySelector('.place__like');
    this.likeCounterEl = this._cardElement.querySelector('.place__like-count');
    this.deleteBtnElement = this._cardElement.querySelector('.place__delete-button');
    this._cardElement.querySelector('.place__name').textContent = this.name;
    this.cardImg.src = this.link;
    this.cardImg.classList.add('place__image_size');
    this.cardImg.alt = this.name;
    this.likeCounterEl.textContent = this.likes.length;
    this._cardElement.id = this.cardId;

    this._setEventListeners();
    this._checkOwnerId();
    this._checkLikeOwnerId();

    return this._cardElement;
  }

  _handleLike() {
    if (this.likeElement.classList.contains('place__like_active')) {
      this._handleDeleteLike();
    } else {
      this._handlePutLike();
    }
  }

  // Добавление лайка карточки на сервер
  _handlePutLike() {
    const card = this.likeElement.closest('.place');

    return this.api.putLikes(card.id)
      .then((result) => {
        this.likeElement.classList.add('place__like_active');
        this.likeCounterEl.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err);
      })
  };

  // Удаление лайка карточки с сервера
  _handleDeleteLike() {
    const card = this.likeElement.closest('.place');

    return this.api.deleteLikes(card.id)
      .then((result) => {
        this.likeElement.classList.remove('place__like_active');
        this.likeCounterEl.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err);
      })
    };

  // Корзина
  // Функция проверки id пользователя для определения принадлежности карточки
  _checkOwnerId () {
    if (this.ownerId !== this.myId) {
      this.deleteBtnElement.classList.add('place__delete-button_hidden');
    } else {
      this.deleteBtnElement.classList.remove('place__delete-button_hidden');
    }
  }

  // Лайк
  // Проверка id пользователя у лайка карточки
  _checkLikeOwnerId() {
    const cardLikes = Array.from(this.likes);
    cardLikes.forEach((element) => {
      if (element._id === this.myId) {
        this.likeElement.classList.add('place__like_active');
      }
    })
  }

// Обработчики добавлены в один метод
  _setEventListeners() {
    this.cardImg.addEventListener('click', this.openPopupImg.bind(this, this.link, this.name));
    this.likeElement.addEventListener('click', this._handleLike.bind(this));
    this.deleteBtnElement.addEventListener('click', this.openPopupDelete.bind(this, this._cardElement, this.cardId));
  }

}

