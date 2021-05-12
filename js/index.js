import Card from "./Card.js";
import initialCards from "./initial-cards.js";
import FormValidation from "./FormValidator.js";
 import {
  editModal, 
  addModal, 
  imgModal, 
  editBtn, 
  addBtn, 
  imgBtn, 
  editCloseBtn, 
  addCloseBtn, 
  imgCloseBtn, 
  profileForm, 
  nameInput, 
  aboutInput, 
  profileName, 
  profileAbout, 
  cardModalInputName, 
  cardModalInputLink,
  container, 
  cardModalForm, 
  imgModalDiscription, 
  validationConfig
} from './variables.js';

const formAddCardValidator = new FormValidation(validationConfig, cardModalForm);
formAddCardValidator.enableValidation();

const formEditCardValidator = new FormValidation(validationConfig, profileForm);
formEditCardValidator.enableValidation();

//функция открытия модалки
function openModal(modal) {
  modal.classList.add('modal_opened');
  // добавление слушателя кнопки Esc
  document.addEventListener('keydown', keyHandler);
}

// функция закрытия модалки
function closeModal(modal) {
  modal.classList.remove('modal_opened');
  // отмена добавленного слушателя
  document.removeEventListener('keydown', keyHandler);
}

//функция закрытия модалки при нажатии Esc
function keyHandler(evt) {
  if (evt.key === 'Escape') {
    const openedModal = document.querySelector('.modal_opened');
      closeModal(openedModal);
  }
}

//функция закрытия модалки при клике на оверлей
document.addEventListener('click', overlayHandler);

function overlayHandler(evt) {
  if (evt.target.classList.contains('modal')) {
    closeModal(evt.target);
  }
}

// навешиваем слушатель событий на кнопки editBtn & editCloseBtn
editBtn.addEventListener('click', () => {
  formEditCardValidator.reset();
	openModal(editModal);
  nameInput.value = '';
  aboutInput.value = ''; 
});  

editCloseBtn.addEventListener('click', () => closeModal(editModal));

function openEditModal(profile) {
//заполнение формы
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
	openModal(profile);
}

//Обработчик формы модалки редактирования
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closeModal(editModal);
}
// навешиваем слушатель 
profileForm.addEventListener('submit', handleProfileFormSubmit);

// навешиваем слушатель событий на кнопки addBtn & addCloseBtn
addBtn.addEventListener('click', () => {

  formAddCardValidator.reset();
	openModal(addModal);
	
	cardModalInputName.value = '';
  cardModalInputLink.value = ''; 
});
	
addCloseBtn.addEventListener('click', () => closeModal(addModal));

//функция открытия модалки со значениями из полей формы
function imageClickHandler(obj) {
	imgBtn.src = obj.link;
	imgBtn.alt = obj.name;
	imgModalDiscription.textContent = obj.name;
	openModal(imgModal);
}

function createCard(obj, cardSelector, imageClickHandler) {
	const card = new Card(obj, cardSelector, imageClickHandler);
	const cardElement = card.generateCard();

	return cardElement;
}

function renderList() {
  initialCards.forEach((item) => {
    // Создадим экземпляр карточки
    const cardElement = createCard(item, '#template', imageClickHandler);
    container.prepend(cardElement);
  });  
}

renderList();

//функция добавления карточки
const handleCardFormSubmit = (evt) => {
  evt.preventDefault();

  const obj = {
    link: cardModalInputLink.value,
    name: cardModalInputName.value,
  };

  const addElements = createCard(obj, '#template', imageClickHandler);
 
  container.prepend(addElements);
  closeModal(addModal);

  cardModalInputLink.value = '';
  cardModalInputName.value = '';
};

addModal.addEventListener('submit', handleCardFormSubmit);
imgCloseBtn.addEventListener('click', () => closeModal(imgModal));