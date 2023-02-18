// Работа модальных окон
export { showProfileInfo };

import { profileValidator } from "..";
import { inputName,
  inputProfession,
  profileNameEl,
  profileProfessionEl,
  profileFormEl,
  popupProfile } from "./constants"

// Функция отображения информации профиля в полях формы редактирования при открытии попапа
function showProfileInfo() {
  popupProfile.open();
  const inputs = profileFormEl.querySelectorAll('.form__textfield');
    inputs.forEach((input) => {
      profileValidator.hideInputError(profileFormEl, input);
    })
  inputName.value = profileNameEl.textContent;
  inputProfession.value = profileProfessionEl.textContent;
}
