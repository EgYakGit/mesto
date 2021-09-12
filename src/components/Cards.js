export default class Card {
  constructor({ data, cardTemplate, handleCardClick, handleCardDelete, api, userId }) {
    // добавили вторым параметром селектор template-элемента
    this.name = data.name;
    this.link = data.link;
    this._like = data.likes;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._myId = userId;
    this._api = api;
    this._handleCardDelete = handleCardDelete;
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
    this._likeCounter = this._element.querySelector('.counter__like');

    this._cardImage.src = this.link;   
    this._cardImage.alt = this.name;
    this._element.querySelector('.card__item-title').textContent = this.name;
    this._likeCounter.textContent = this._like.length;

    // убираем корзину, если не наша карточка
    if (this._ownerId === this._myId) {
      this._deleteBtn.classList.remove('card__item-delete_hidden');
    }
    
    this._like.forEach((item) => {
      if (item._id === this._myId) {
        this._likeBtn.classList.add('card__item-like_active');
      } else {
        this._likeBtn.classList.remove('card__item-like_active');
      }
    });
////////////
    this._setEventListeners();
    return this._element;
  }

  getId() {
    return this._id;
  }

  _setLikes() {
    const activeBtnLike = this._likeBtn.classList.contains('card__item-like_active');

    if (!activeBtnLike) {
      this._api
        .addLike(this.getId())
        .then((res) => {
          const likeQuantity = res.likes.length;
          this._likeCounter.textContent = likeQuantity;
          this._likeButtonClick();
        })
        .catch((err) => console.log(`Ошибка при добавлении лайка: ${err}`));
    } else {
      this._api
        .deleteLike(this.getId())
        .then((res) => {
          this._likeCounter.textContent = res.likes.length;
          this._likeButtonClick();
        })
        .catch((err) => console.log(`Ошибка при удалении лайка: ${err}`));
    }
  }

  _likeButtonClick() {
    this._likeBtn
      .classList.toggle('card__item-like_active');
  }

  deleteButtonClick() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeBtn
      .addEventListener('click', (e) => {
        e.preventDefault();
        this._setLikes();
      });

      this._deleteBtn
      .addEventListener('click', (e) => {
        e.preventDefault();
        this._handleCardDelete();
      });

      this._cardImage
      .addEventListener('click', (e) => {
      e.preventDefault();
      this._handleCardClick();
    });
  }
}
