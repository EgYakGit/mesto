export default class UserInfo {
  constructor({name, about, avatar}) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    const data = {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src
    };

    return data;
  }

  setUserInfo({name, about, avatar, id}) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar;
    this._userID = id;
  }

  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }

  setUserAvatar(link) {
    this._avatar.src = link;
  }

  getUserId() {
    return this._userID;
  }
}