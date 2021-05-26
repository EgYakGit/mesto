import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open({ name, link }) {    
    super.open();
    this._popupElement.querySelector('.popup__discription').textContent = name;
    this._popupElement.querySelector('.popup__image').src = link;
    super.setEventListeners();
  }
}