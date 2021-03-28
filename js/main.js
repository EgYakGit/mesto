let profile = document.querySelector('.profile');
let editBtn = profile.querySelector('.profile__edit');
let profileName = profile.querySelector('.profile__name');
let profileAbout = profile.querySelector('.profile__about');
let modal = document.querySelector('.modal');
let modalForm = modal.querySelector('.modal__form');
let modalCloseBtn = modal.querySelector('.modal__close');
let nameInput = modalForm.querySelector('.modal__input_name');
let aboutInput = modalForm.querySelector('.modal__input_about');

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  
  closeModal();
}

function openModal() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  modal.classList.add('modal_opened');
}

function closeModal() {
  modal.classList.remove('modal_opened');
}

editBtn.addEventListener('click', openModal);
modalCloseBtn.addEventListener('click', closeModal);
modalForm.addEventListener('submit', formSubmitHandler);