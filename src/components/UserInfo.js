export default class UserInfo {
  constructor({ nameSelector, professionSelector, avatarSelector }) {
    this._name = nameSelector;
    this._profession = professionSelector;
    this._avatar = avatarSelector;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._profession.textContent
    }
  }


  setUserInfo({ name, about, avatar }) {
    this._name.textContent = name;
    this._profession.textContent = about;
    this._avatar.src = avatar;
  }
}
