export default class UserInfo {
  constructor({name, about}) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
  }

  getUserInfo() {
    const obj = {}
    obj.name = this._name.textContent;
    obj.about = this._about.textContent;
    return obj;
  }

  setUserInfo(nameInfo, aboutInfo) {
    this._name.textContent = nameInfo;
    this._about.textContent = aboutInfo;
  }
} 