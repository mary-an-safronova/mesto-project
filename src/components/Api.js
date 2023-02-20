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

  _request(url, options) {
    return fetch(url, options).then(this._getResponce)
  }

  // Запрос информации о пользователе с сервера
  getUserInfo = () => {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
  }

  // Сохранение на сервере откорректированных данных пользователя
  patchUsers = (name, about) => {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
  }

  // Запрос карточек с сервера
  getInitialCards = () => {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
  }

  // Добавление на сервер новой карточки
  postCards = (name, link) => {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
  }

  // Удаление карточки с сервера
  deleteCards = (cardId) => {
    return this._request((`${this._baseUrl}/cards/${cardId}`), {
      method: 'DELETE',
      headers: this._headers
    })
  }

  // Постановка лайка карточки
  putLikes = (cardId) => {
    return this._request((`${this._baseUrl}/cards/likes/${cardId}`), {
      method: 'PUT',
      headers: this._headers
    })
  }

  // Удаление лайка карточки
  deleteLikes = (cardId) => {
    return this._request((`${this._baseUrl}/cards/likes/${cardId}`), {
      method: 'DELETE',
      headers: this._headers
    })
  }

  // Обновление аватара пользователя
  patchUserAvatar = (avatar) => {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar })
    })
  }
}
