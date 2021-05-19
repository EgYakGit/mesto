//модалки ниже
export const editPopup = document.querySelector('.popup_profile_edit');
export const addPopup = document.querySelector('.popup_profile_add');
export const imgPopup = document.querySelector('.popup_profile_image');

//кнопки открытия модалок ниже
export const editBtn = document.querySelector('.profile__edit');
export const addBtn = document.querySelector('.profile__add');
export const imgBtn = imgPopup.querySelector('.popup__image');

//кнопки закрытия модалок
export const editCloseBtn = editPopup.querySelector('.popup__close');
export const addCloseBtn = addPopup.querySelector('.popup__close');
export const imgCloseBtn = imgPopup.querySelector('.popup__close');

//форма в ДОМе
export const profileForm = document.querySelector('.form');
export const nameInput = profileForm.querySelector('.form__input_edit_name');
export const aboutInput =profileForm.querySelector('.form__input_edit_about')
export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__about');

//форма для карточек в ДОМе
export const cardPopupInputName = addPopup.querySelector('.form__input_add_name');
export const cardPopupInputLink = addPopup.querySelector('.form__input_add_link');
export const cardPopupBtn = document.querySelector('.form__save');
export const container = document.querySelector('.card');
export const cardPopupForm = document.querySelector('.form_card');

// модалка изображений
export const imgPopupDiscription = imgPopup.querySelector('.popup__discription');
export const templateElement = document.querySelector('#template').content.querySelector('.card__item');

export const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save',
  inactiveButtonClass: 'form__save_disabled',
  inputErrorClass: 'popup__input-error_active'
};