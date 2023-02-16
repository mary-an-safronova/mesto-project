export default class UserInfo {
  constructor({ nameSelector, professionSelector, avatarSelector }) {
    this._name = nameSelector;
    this._profession = professionSelector;
    this._avatar = avatarSelector;
  }

  getUserInfo() {
    this._profile = {};
    this._profile['name'] = this._name.textContent;
    this._profile['about'] = this._name.textContent;

    return this._profile;
  }


  setUserInfo({ name, about, avatar }) {
    this._name.textContent = name;
    this._profession.textContent = about;
    this._avatar.src = avatar;
  }
}
