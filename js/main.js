let profile = document.querySelector('.profile');
let editBtn = profile.querySelector('.profile__edit');
let profileName = profile.querySelector('.profile__name');
let profileAbout = profile.querySelector('.profile__about');
let modal = document.querySelector('.modal');
let form = modal.querySelector('.form');
let modalCloseBtn = modal.querySelector('.modal__close'); 
let nameInput = form.querySelector('.form__input_edit_name');
let aboutInput = form.querySelector('.form__input_edit_about');

function openModal() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  modal.classList.add('modal_opened');
}

function closeModal() {
  modal.classList.remove('modal_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  
  closeModal();
}

editBtn.addEventListener('click', openModal);
modalCloseBtn.addEventListener('click', closeModal);
form.addEventListener('submit', formSubmitHandler);
//modalForm --> form