const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup-edit');

const editBtnSubmit = document.querySelector('.edit-form__submit-button');
const editPopupElement = document.querySelector('.popup-edit');

const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup-add');


//Открытие модальных окон
editButton.addEventListener('click', (editPopupOpened) => {
  editPopup.classList.add('popup_opened');
});

editBtnSubmit.addEventListener('click', (editPopupClosed) => {
  editPopupElement.classList.remove('popup_opened');
});

addButton.addEventListener('click', (addPopupOpened) => {
  addPopup.classList.add('popup_opened');
});


//заполнение полей формы редактирования профиля значениями, которые отображаются на странице СДЕЛАНО
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');

const inputName = document.getElementById('name');
const inputProfession = document.getElementById('profession');

inputName.value = (inputName !== "") ? profileName.innerHTML : "";
inputProfession.value = (inputProfession !== "") ? profileProfession.innerHTML : "";


//Редактирование имени и информации о пользователе СДЕЛАНО

const EditFormElement = document.querySelector('.edit-form');
// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault();

  console.log(inputName.value);
  console.log(inputProfession.value);

  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
}
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
EditFormElement.addEventListener('submit', formSubmitHandler);



//новый массив карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Добавление карточек из массива СДЕЛАНО
const placesContainer = document.querySelector('.grid-places');
const placeTemplate = document.querySelector('#place-template').content;

const cardsArr = initialCards.map(function (item) {
  return {
    name: item.name,
    link: item.link
  };
});

cardsArr.forEach(
  function ({ name, link }) {
    const placeElement = placeTemplate.querySelector(".place").cloneNode(true);
    placeElement.querySelector(".place__name").textContent = name;
    placeElement.querySelector('.place__image').src = link;
    placeElement.querySelector('.place__image').style.aspectRatio = '1 / 1';

    placesContainer.removeChild(placesContainer.lastElementChild);
    placesContainer.prepend(placeElement);
  });





// лайк, СДЕЛАНО
const likeElements = document.querySelectorAll('.place__like');

likeElements.forEach((likeElement) => {
  likeElement.addEventListener('click', function (evt) {
    likeElement.classList.toggle('place__like_active');
  });
});


//корзина СДЕЛАНО
const deleteBtnElements = placesContainer.querySelectorAll('.place__delete-button');

deleteBtnElements.forEach((deleteBtnElement) => {
  deleteBtnElement.addEventListener('click', function (evt) {
    deleteBtnElement.parentElement.remove();
  });
});




//Добавление новых карточек через форму

const inputCardName = document.getElementById('card-name');
const inputCardImg = document.getElementById('card-image');


const addFormElement = document.querySelector('.add-form');
// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function AddFormSubmitHandler(evt) {
  evt.preventDefault();

  const placeElement = placeTemplate.querySelector(".place").cloneNode(true);
  placeElement.querySelector('.place__name').textContent = inputCardName.value;
  placeElement.querySelector('.place__image').src = inputCardImg.value;
  placeElement.querySelector('.place__image').style.aspectRatio = '1 / 1';

  placesContainer.prepend(placeElement);
}

addFormElement.addEventListener('submit', AddFormSubmitHandler);




//Открытие попапа с увеличенным изображением карточки

const placeElement = placeTemplate.querySelector(".place").cloneNode(true);
let placeNameElement = placeElement.querySelector('.place__name');
let placeImgElement = placeElement.querySelector('.place__image');

const imgPopupElement = document.querySelector('.popup-img');
const popupImgCloseIconElement = imgPopupElement.querySelector('.popup__close-icon');
const popupImgElement = imgPopupElement.querySelector('.popup__image');
const popupImgCaptionElement = imgPopupElement.querySelector('.popup__img-caption');

const placeElements = document.querySelectorAll('.place');

for (let i = 0; i <= placeElements.length; i++) {
  let placeElement = placeElements[i];
  if (placeElement) {
    let placeImgElement = placeElement.querySelector('.place__image');

    placeImgElement.addEventListener('click', () => {
      placeImgElement = placeElement.querySelector('.place__image');
      placeNameElement = placeElement.querySelector('.place__name');

      popupImgElement.src = placeImgElement.src;
      popupImgCaptionElement.textContent = placeNameElement.textContent;

      imgPopupElement.classList.add('popup_opened');
    });
  }
};


//Плавное открытие и закрытие попапов
function toggleTwoClasses(el, classOpened, classClosed, timeOfAnimation) {
  if (!el.classList.contains(classOpened)) {
    el.classList.add(classOpened);
    el.classList.remove(classClosed);
  } else {
    el.classList.add(classClosed);
    window.setTimeout(function () {
      el.classList.remove(classOpened);
    }, timeOfAnimation);
  }
}

const editPopupCloseIcon = document.querySelector('.popup__close-icon-edit');
const addPopupCloseIcon = document.querySelector('.popup__close-icon-add');

document.addEventListener("DOMContentLoaded", () => {
  editPopupCloseIcon.addEventListener("click", () => {
      toggleTwoClasses(editPopup, "popup_opened", "popup_closed", 500);
  });

  addPopupCloseIcon.addEventListener("click", () => {
    toggleTwoClasses(addPopup, "popup_opened", "popup_closed", 500);
  });

  popupImgCloseIconElement.addEventListener("click", () => {
    toggleTwoClasses(imgPopupElement, "popup_opened", "popup_closed", 500);
  });
});
