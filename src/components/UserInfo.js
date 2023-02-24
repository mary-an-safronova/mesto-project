export default class UserInfo {
  constructor({ nameSelector, professionSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._profession = document.querySelector(professionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._profession.textContent
    }
  }


  setUserInfo({ name, about, avatar, _id }) {
    this._name.textContent = name;
    this._profession.textContent = about;
    this._avatar.src = avatar;
    this._id = _id;
  }
}
