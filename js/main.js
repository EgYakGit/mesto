// let profile = document.querySelector('.profile');
// let editBtn = profile.querySelector('.profile__edit');
// let profileName = profile.querySelector('.profile__name');
// let profileAbout = profile.querySelector('.profile__about');
// let modal = document.querySelector('.modal');
// let form = modal.querySelector('.form');
// let modalCloseBtn = modal.querySelector('.modal__close'); 
// let nameInput = form.querySelector('.form__input_edit_name');
// let aboutInput = form.querySelector('.form__input_edit_about');

// function openModal() {
//   nameInput.value = profileName.textContent;
//   aboutInput.value = profileAbout.textContent;
//   modal.classList.add('modal_opened');
// }

// function closeModal() {
//   modal.classList.remove('modal_opened');
// }

// function formSubmitHandler(evt) {
//   evt.preventDefault();
//   profileName.textContent = nameInput.value;
//   profileAbout.textContent = aboutInput.value;
  
//   closeModal();
// }

// editBtn.addEventListener('click', openModal);
// modalCloseBtn.addEventListener('click', closeModal);
// form.addEventListener('submit', formSubmitHandler);


//модалки ниже
const editModal = document.querySelector('.modal_profile_edit');
const addModal = document.querySelector('.modal_profile_add');
const imgModal = document.querySelector('.modal_profile_image');

//кнопки открытия модалок ниже
const editBtn = document.querySelector('.profile__edit');
const addBtn = document.querySelector('.profile__add');
const imgBtn = imgModal.querySelector('.modal__image');

//кнопки закрытия модалок
const editCloseBtn = editModal.querySelector('.modal__close');
const addCloseBtn = addModal.querySelector('.modal__close');
const imgCloseBtn = imgModal.querySelector('.modal__close');

//форма в ДОМе
const profileForm = document.querySelector('.form');
const nameInput = profileForm.querySelector('.form__input_edit_name');
const aboutInput =profileForm.querySelector('.form__input_edit_about')
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

//форма для карточек в ДОМе
const cardModalInputName = addModal.querySelector(".form__input_add_name");
const cardModalInputLink = addModal.querySelector(".form__input_add_link");
const cardModalBtn = document.querySelector(".form__save");
const container = document.querySelector(".card");
const cardModalForm = document.querySelector(".form_card");

// модалка изображений
const imgModalDiscription = imgModal.querySelector(".modal__discription");
const templateElement = document.querySelector("#template").content.querySelector(".card__item");

//функция открытия модалки
function openModal(modal) {
  modal.classList.add("modal_opened");
}

// функция закрытия модалки
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

// навешиваем слушатель событий на кнопки editBtn & editCloseBtn
editBtn.addEventListener("click", () =>
  openModal(editModal));
editCloseBtn.addEventListener("click", () => 
  closeModal(editModal));
