//модалки ниже
export const editModal = document.querySelector('.modal_profile_edit');
export const addModal = document.querySelector('.modal_profile_add');
export const imgModal = document.querySelector('.modal_profile_image');

//кнопки открытия модалок ниже
export const editBtn = document.querySelector('.profile__edit');
export const addBtn = document.querySelector('.profile__add');
export const imgBtn = imgModal.querySelector('.modal__image');

//кнопки закрытия модалок
export const editCloseBtn = editModal.querySelector('.modal__close');
export const addCloseBtn = addModal.querySelector('.modal__close');
export const imgCloseBtn = imgModal.querySelector('.modal__close');

//форма в ДОМе
export const profileForm = document.querySelector('.form');
export const nameInput = profileForm.querySelector('.form__input_edit_name');
export const aboutInput =profileForm.querySelector('.form__input_edit_about')
export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__about');

//форма для карточек в ДОМе
export const cardModalInputName = addModal.querySelector('.form__input_add_name');
export const cardModalInputLink = addModal.querySelector('.form__input_add_link');
export const cardModalBtn = document.querySelector('.form__save');
export const container = document.querySelector('.card');
export const cardModalForm = document.querySelector('.form_card');

// модалка изображений
export const imgModalDiscription = imgModal.querySelector('.modal__discription');
export const templateElement = document.querySelector('#template').content.querySelector('.card__item');

export const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save',
  inactiveButtonClass: 'form__save_disabled',
  inputErrorClass: 'modal__input-error_active'
};

//  import {
//   editModal, 
//   addModal, 
//   imgModal, 
//   editBtn, 
//   addBtn, 
//   imgBtn, 
//   editCloseBtn, 
//   addCloseBtn, 
//   imgCloseBtn, 
//   profileForm, 
//   nameInput, 
//   aboutInput, 
//   profileName, 
//   profileAbout, 
//   cardModalInputName, 
//   cardModalInputLink, 
//   cardModalBtn, 
//   container, 
//   cardModalForm, 
//   imgModalDiscription, 
//   templateElement, 
//   enableValidation
// } from './variables.js';