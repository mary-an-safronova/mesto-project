// Утилитарные функции, которые используются в работе сразу нескольких других функций
export { openPopup, closePopup };

// Функция открытия модального окна
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Функция закрытия модального окна
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
