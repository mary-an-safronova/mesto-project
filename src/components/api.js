import { profileNameEl, profileProfessionEl } from "./modal";
const profileAvatarEl = document.querySelector('.profile__avatar');

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-19',
  headers: {
    authorization: 'f92b5f7d-6bec-4339-b0cf-17fe28ece879',
    'Content-Type': 'application/json'
  }
}

const getResponce = (res => {
  if (res.ok) {
    return res.json();
  }
  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`);
});

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(getResponce);
}

export const getUsers = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(getResponce);
}

getUsers()
  .then((result) => {
    console.log(result);
    profileNameEl.textContent = result.name;
    profileProfessionEl.textContent = result.about;
    profileAvatarEl.src = result.avatar;
  })
  .catch((err) => {
    console.log(err);
  });
