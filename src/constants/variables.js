//модалки ниже
export const editPopup = '.popup_profile_edit';
export const addPopup = '.popup_profile_add';
export const imgPopup = '.popup_profile_image';

//кнопки открытия модалок ниже
export const editBtn = document.querySelector('.profile__edit');
export const addBtn = document.querySelector('.profile__add');
export const imgBtn = document.querySelector('.popup__image');
export const cardImage = document.querySelector('card__image');

//кнопки закрытия модалок
export const editCloseBtn = document.querySelector('.popup__close');
export const addCloseBtn = document.querySelector('.popup__close');
export const imgCloseBtn = document.querySelector('.popup__close');

//форма в ДОМе
export const profileForm = document.querySelector('.form');
export const nameInput = profileForm.querySelector('.form__input_edit_name');
export const aboutInput = profileForm.querySelector('.form__input_edit_about');
export const profileName = '.profile__name';
export const profileAbout = '.profile__about';

//форма для карточек в ДОМе
export const cardPopupInputName = document.querySelector('.form__input_add_name');
export const cardPopupInputLink = document.querySelector('.form__input_add_link');
export const cardPopupBtn = document.querySelector('.form__save');
export const container = document.querySelector('.card');
export const cardPopupForm = document.querySelector('.form_card');

// модалка изображений
export const imgPopupDiscription = document.querySelector('.popup__discription');
export const templateElement = document.querySelector('#template').content.querySelector('.card__item');

export const validationConfig = {
  form: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save',
  inactiveButtonClass: 'form__save_disabled',
  inputErrorClass: 'popup__input-error_active'
};