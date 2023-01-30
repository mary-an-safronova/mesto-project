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

// Запрос информации о пользователе с сервера
export const getUsers = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(getResponce);
}

// Сохранение на сервере откорректированных данных пользователя
export const patchUsers = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  });
}

// Запрос карточек с сервера
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(getResponce);
}

// Добавление на сервер новой карточки
export const postCards = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(getResponce);
}

// Удаление карточки с сервера
export const deleteCards = (cardId) => {
  return fetch((`${config.baseUrl}/cards/${cardId}`), {
    method: 'DELETE',
    headers: config.headers
  });
}

// Постановка лайка карточки
export const putLikes = (cardId) => {
  return fetch((`${config.baseUrl}/cards/likes/${cardId}`), {
    method: 'PUT',
    headers: config.headers
  });
}

// Удаление лайка карточки
export const deleteLikes = (cardId) => {
  return fetch((`${config.baseUrl}/cards/likes/${cardId}`), {
    method: 'DELETE',
    headers: config.headers
  });
}

// Обновление аватара пользователя
export const patchUserAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    }),
  })
  .then(getResponce)
}
