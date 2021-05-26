import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._form =  this._popupElement.querySelector('.form');
    this._inputs = Array.from(this._form.querySelectorAll('.form__input'));
    this._submitHandler = submitHandler;
  }

  _getInputValues() {
    this._values = {};
    this._inputs.forEach((input) => {
      this._values[input.name] = input.value;
    });
    return this._values;
  }

  setEventListeners() {
    this._form 
      .addEventListener("submit", (evt) => {
        evt.preventDefault();
        const obj = this._getInputValues();
        this._submitHandler(obj);
      });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._form.reset();
  }
}