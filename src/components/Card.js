export default class Card {
  constructor(obj, cardTemplate, { handleCardClick }) {
    this.name = obj.name;
    this.link = obj.link;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = this._cardTemplate.cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');    
    this._likeBtn = this._element.querySelector('.card__item-like');
    this._deleteBtn =  this._element.querySelector('.card__item-delete');
    this._cardImage.src = this.link;   
    this._cardImage.alt = this.name;
    this._element.querySelector('.card__item-title').textContent = this.name;
    this._setEventListeners();
    return this._element;
  }

  _likeButtonClick() {
    this._likeBtn
      .classList.toggle('card__item-like_active');
  }

  _deleteButtonClick() {
    this._element.remove();
  }

  _setEventListeners() {
    this._likeBtn
      .addEventListener('click', (evt) => {
        this._likeButtonClick(evt);
      });

      this._deleteBtn
      .addEventListener('click', (evt) => {
        this._deleteButtonClick(evt);
      });

      this._cardImage
      .addEventListener('click', () =>
        this._handleCardClick(this._name, this._link)
      );
  }
}