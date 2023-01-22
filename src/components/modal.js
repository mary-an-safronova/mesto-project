// Работа модальных окон
export { cleanForm, pressEscape, showProfileInfo, handleProfileFormSubmit };

import { closePopup, openPopup } from "./utils";

const popupCloseIconElements = document.querySelectorAll('.popup__close-icon');
const overlayElements = document.querySelectorAll('.popup__background');
const profilePopupEl = document.querySelector('.popup-edit');
const inputName = document.querySelector('#name');
const profileNameEl = document.querySelector('.profile__name');
const inputProfession = document.querySelector('#profession');
const profileProfessionEl = document.querySelector('.profile__profession');

// Очистка полей и ошибок при закрытии модального окна
function cleanForm() {
  const forms = document.querySelectorAll('.form');
  const errorElements = document.querySelectorAll('.form__input-error');
  const inputElements = document.querySelectorAll('.form__textfield');
  const submitBtns = document.querySelectorAll('.form__submit-button');

  forms.forEach((form) => {
    errorElements.forEach((errorElement) => {
      inputElements.forEach((inputElement) => {
        submitBtns.forEach((submitBtn) => {
          form.reset();
          errorElement.textContent = '';
          inputElement.classList.remove('form__textfield_type_error');
          submitBtn.disabled = true;
          submitBtn.classList.add('form__submit-button_inactive');
        });
      });
    })
  })
}

// Закрытие модального окна при клике на крестик
popupCloseIconElements.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => {
    closePopup(popup);
    cleanForm();
  });
});

// Закрытие модального окна при клике на оверлей
overlayElements.forEach((overlayElement) => {
  const popup = overlayElement.closest('.popup');
  overlayElement.addEventListener('click', () => {
    closePopup(popup);
    cleanForm();
  });
});

// Закрытие модального окна при клике на escape, удаление слушателя при закрытии окна
function pressEscape (event) {
  if (event.code === 'Escape') {
    const popups = document.querySelectorAll('.popup');
    popups.forEach((popup) => {
        closePopup(popup);
        cleanForm();
    });
  }
  event.target.removeEventListener('keydown', pressEscape);
}

// Функция отображения информации профиля в полях формы редактирования при открытии попапа
function showProfileInfo() {
  openPopup(profilePopupEl);
  inputName.value = profileNameEl.textContent;
  inputProfession.value = profileProfessionEl.textContent;
}

// Обработчик «отправки» формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  closePopup(profilePopupEl);
  profileNameEl.textContent = inputName.value;
  profileProfessionEl.textContent = inputProfession.value;
}
