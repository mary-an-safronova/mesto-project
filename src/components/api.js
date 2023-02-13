export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponce = (res => {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  });

  // Запрос информации о пользователе с сервера
  getUserInfo = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(this._getResponce)
  }

  // Сохранение на сервере откорректированных данных пользователя
  patchUsers = (name, about) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(this._getResponce)
  }

  // Запрос карточек с сервера
  getInitialCards = () => {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(this._getResponce)
  }

  // Добавление на сервер новой карточки
  postCards = (name, link) => {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(this._getResponce)
  }

  // Удаление карточки с сервера
  deleteCards = (cardId) => {
    return fetch((`${this._baseUrl}/cards/${cardId}`), {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._getResponce)
  }

  // Постановка лайка карточки
  putLikes = (cardId) => {
    return fetch((`${this._baseUrl}/cards/likes/${cardId}`), {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._getResponce)
  }

  // Удаление лайка карточки
  deleteLikes = (cardId) => {
    return fetch((`${this._baseUrl}/cards/likes/${cardId}`), {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._getResponce)
  }

  // Обновление аватара пользователя
  patchUserAvatar = (avatar) => {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    })
    .then(this._getResponce)
  }
}

export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-19',
  headers: {
    authorization: 'f92b5f7d-6bec-4339-b0cf-17fe28ece879',
    'Content-Type': 'application/json'
  }
});

// const getResponce = (res => {
//   if (res.ok) {
//     return res.json();
//   }
//   // если ошибка, отклоняем промис
//   return Promise.reject(`Ошибка: ${res.status}`);
// });

// // Запрос информации о пользователе с сервера
// export const getUserInfo = () => {
//   return fetch(`${config.baseUrl}/users/me`, {
//     headers: config.headers
//   })
//     .then(getResponce)
// }

// // Сохранение на сервере откорректированных данных пользователя
// export const patchUsers = (name, about) => {
//   return fetch(`${config.baseUrl}/users/me`, {
//     method: 'PATCH',
//     headers: config.headers,
//     body: JSON.stringify({
//       name: name,
//       about: about
//     })
//   })
//   .then(getResponce)
// }

// // Запрос карточек с сервера
// export const getInitialCards = () => {
//   return fetch(`${config.baseUrl}/cards`, {
//     headers: config.headers
//   })
//     .then(getResponce)
// }

// // Добавление на сервер новой карточки
// export const postCards = (name, link) => {
//   return fetch(`${config.baseUrl}/cards`, {
//     method: 'POST',
//     headers: config.headers,
//     body: JSON.stringify({
//       name: name,
//       link: link
//     })
//   })
//   .then(getResponce)
// }

// // Удаление карточки с сервера
// export const deleteCards = (cardId) => {
//   return fetch((`${config.baseUrl}/cards/${cardId}`), {
//     method: 'DELETE',
//     headers: config.headers
//   })
//   .then(getResponce)
// }

// // Постановка лайка карточки
// export const putLikes = (cardId) => {
//   return fetch((`${config.baseUrl}/cards/likes/${cardId}`), {
//     method: 'PUT',
//     headers: config.headers
//   })
//   .then(getResponce)
// }

// // Удаление лайка карточки
// export const deleteLikes = (cardId) => {
//   return fetch((`${config.baseUrl}/cards/likes/${cardId}`), {
//     method: 'DELETE',
//     headers: config.headers
//   })
//   .then(getResponce)
// }

// // Обновление аватара пользователя
// export const patchUserAvatar = (avatar) => {
//   return fetch(`${config.baseUrl}/users/me/avatar`, {
//     method: 'PATCH',
//     headers: config.headers,
//     body: JSON.stringify({
//       avatar,
//     }),
//   })
//   .then(getResponce)
// }
