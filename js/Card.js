export default class Card {
  constructor(obj, cardSelector, imageClickHandler) {
    this.name = obj.name;
    this.link = obj.link;
    this._cardSelector = cardSelector;
    this._imageClickHandler = imageClickHandler;
  }

  _getTemplate() {
    // забираем размеку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._cardSelector) // используем this._cardSelector
      .content.querySelector(".card__item")
      .cloneNode(true);

    // вернём DOM-элемент карточки
    return cardElement;
  }

  generateCard() {
    // Запишем разметку в приватное поле _element.
    this._element = this._getTemplate();
    this._setEventListeners();

    // Добавим данные
    this._element.querySelector(".card__image").src = this.link;
    this._element.querySelector(".card__image").alt = this.name;
    this._element.querySelector(".card__item-title").textContent = this.name;

    // Вернём элемент наружу
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector(".card__item-like").addEventListener('click', (evt) => {
      this._likeBtn(evt);
    });

    this._element.querySelector(".card__item-delete").addEventListener('click', (evt) => {
      this._deleteBtn(evt);
    });

    this._element.querySelector('.card__image').addEventListener('click', () => this._imageClickHandler(this));
  }


  _likeBtn() {
    this._element
      .querySelector(".card__item-like").
      classList.toggle("card__item-like_active");
  }

  _deleteBtn() {
    this._element.remove();
  }
}