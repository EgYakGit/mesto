import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._form =  this._popupElement.querySelector('.form');
    this._inputs = Array.from(this._form.querySelectorAll('.form__input'));
    this._button = this._popupElement.querySelector('.form__save');
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
      .addEventListener('submit', (e) => {
        e.preventDefault();
        const data = this._getInputValues();
        this._submitHandler(data);
      });
    super.setEventListeners();
  }

  setLoading(isLoading) {
      if (isLoading) {
        this._button.textContent = "Сохранение...";
      } else {
        this._button.textContent = this._button.ariaLabel;
      }
    }  

  close() {
    super.close();
    this._form.reset();
  }
}