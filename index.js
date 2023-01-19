const profileBtnEl = document.querySelector('.profile__edit-button');
const profileBtnSubmitEl = document.querySelector('.edit-form__submit-button');
const profilePopupEl = document.querySelector('.popup-edit');
const profileNameEl = document.querySelector('.profile__name');
const profileProfessionEl = document.querySelector('.profile__profession');
const profileFormEl = document.querySelector('.edit-form');

const cardAddBtnEl = document.querySelector('.profile__add-button');
const cardAddBtnSubmitEl = document.querySelector('.add-form__submit-button');
const cardAddPopupEl = document.querySelector('.popup-add');

const popupCloseIconElements = document.querySelectorAll('.popup__close-icon');

const inputName = document.querySelector('#name');
const inputProfession = document.querySelector('#profession');

const cardImgPopupEl = document.querySelector('.popup-img');
const imgPopupEl = cardImgPopupEl.querySelector('.popup__image');
const imgPopupCaptionEl = cardImgPopupEl.querySelector('.popup__img-caption');

// Открытие и закрытие модальных окон
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

popupCloseIconElements.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

profileBtnEl.addEventListener('click', () => {
  openPopup(profilePopupEl);
  // Отображение информации профиля в полях формы редактирования при открытии попапа
  inputName.value = profileNameEl.textContent;
  inputProfession.value = profileProfessionEl.textContent;
});

cardAddBtnEl.addEventListener('click', () => {
  openPopup(cardAddPopupEl);
});

// Редактирование имени и информации о пользователе
// Добавление класса с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__textfield_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

// Удаление класса с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__textfield_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

// Проверка валидности полей
const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
  inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
  inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

// Изменение переключения кнопки submit при проверке на валидность
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('form__submit-button_inactive');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('form__submit-button_inactive');
  }
};

// Добавление обработчиков всем инпутам
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__textfield'));
  const buttonElement = formElement.querySelector('.form__submit-button');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// Добавление обработчиков всем формам
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));

  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

enableValidation();

// Обработчик «отправки» формы
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
const inputCardName = document.querySelector('#card-name');
const inputCardImg = document.querySelector('#card-image');
const cardAddFormEl = document.querySelector('.add-form');

// Обработчик «отправки» формы
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  closePopup(cardAddPopupEl);
  const cardElement = createCard(cardTemplate, inputCardName.value, inputCardImg.value);
  cardsContainerEl.prepend(cardElement);
}
cardAddFormEl.addEventListener('submit', handleAddFormSubmit);
