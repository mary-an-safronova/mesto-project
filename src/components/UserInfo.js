export default class UserInfo {
  constructor(nameSelector, professionSelector) {
    this._name = nameSelector;
    this._profession = professionSelector;
  }

  getUserInfo() {
    this._profile = {};
    this._profile['user-name'] = this._name.textContent;
    this._profile['profession'] = this._name.textContent;

    return this._profile;
  }


  setUserInfo(name, profession) {
    this._name.textContent = name;
    this._profession.textContent = profession;
  }
}
