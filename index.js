const profileBtnEl = document.querySelector('.profile__edit-button');
const profileBtnSubmitEl = document.querySelector('.edit-form__submit-button');
const profilePopupEl = document.querySelector('.popup-edit');

const cardAddBtnEl = document.querySelector('.profile__add-button');
const cardAddBtnSubmitEl = document.querySelector('.add-form__submit-button');
const cardAddPopupEl = document.querySelector('.popup-add');

const popupCloseIconElements = document.querySelectorAll('.popup__close-icon');

// Открытие модальных окон
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

popupCloseIconElements.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function openPopup(popup) {
  return function (event) {
    popup.classList.add('popup_opened');
  }
}

profileBtnEl.addEventListener('click', openPopup(profilePopupEl));
cardAddBtnEl.addEventListener('click', openPopup(cardAddPopupEl));

// Заполнение полей формы редактирования профиля значениями, которые отображаются на странице
const profileNameEl = document.querySelector('.profile__name');
const profileProfessionEl = document.querySelector('.profile__profession');

const inputName = document.querySelector('#name');
const inputProfession = document.querySelector('#profession');

inputName.value = profileNameEl.textContent;
inputProfession.value = profileProfessionEl.textContent;

// Редактирование имени и информации о пользователе
const profileFormEl = document.querySelector('.edit-form');
// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  closePopup(profilePopupEl);
  profileNameEl.textContent = inputName.value;
  profileProfessionEl.textContent = inputProfession.value;
}
profileFormEl.addEventListener('submit', handleProfileFormSubmit);

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
  const cardImgPopupEl = document.querySelector('.popup-img');
  const imgPopupEl = cardImgPopupEl.querySelector('.popup__image');
  const imgPopupCaptionEl = cardImgPopupEl.querySelector('.popup__img-caption');

  cardImg.addEventListener('click', () => {
    cardImgPopupEl.classList.add('popup_opened');
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
const inputCardName = document.querySelector('#card-name');
const inputCardImg = document.querySelector('#card-image');
const cardAddFormEl = document.querySelector('.add-form');

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  closePopup(cardAddPopupEl);
  const cardElement = createCard(cardTemplate, inputCardName.value, inputCardImg.value);
  cardsContainerEl.prepend(cardElement);
}
cardAddFormEl.addEventListener('submit', handleAddFormSubmit);
