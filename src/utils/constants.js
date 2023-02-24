export { validationConfig };

// Валидация форм
const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__textfield',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__textfield_type_error',
  errorClass: 'form__input-error_active'
}

export const profileConfig = {
  nameSelector: '.profile__name',
  professionSelector: '.profile__profession',
  avatarSelector: '.profile__avatar'
}

export const profileBtnEl = document.querySelector('.profile__edit-button');
export const cardAddBtnEl = document.querySelector('.profile__add-button');
export const profilePopupEl = document.querySelector('.popup-edit');

export const profileAvatarWrapEl = document.querySelector('.profile__avatar-wrap');
export const profileAvatarBtnEl = document.querySelector('.profile__avatar-cover');
export const avatarPopupEl = document.querySelector('.popup-avatar');

export const cardAddPopupEl = document.querySelector('.popup-add');
export const cardsContainerEl = document.querySelector('.grid-places');
export const cardTemplate = document.querySelector('#place-template').content;
export const cardImgPopupEl = document.querySelector('.popup-img');
export const deletePopupEl = document.querySelector('.popup-delete');
export const deleteFormSubmitBtnEl = document.querySelector('.delete-form__submit-button');


