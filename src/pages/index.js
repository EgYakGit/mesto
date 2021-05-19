import Card from "../components/Card.js";
import initialCards from "../utils/initial-cards.js";
import FormValidation from "../components/FormValidator.js";
 import {
  editPopup, 
  addPopup, 
  imgPopup, 
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
  cardPopupInputName, 
  cardPopupInputLink,
  container, 
  cardPopupForm, 
  imgPopupDiscription, 
  validationConfig
} from '../utils/variables.js';

const formAddCardValidator = new FormValidation(validationConfig, cardPopupForm);
formAddCardValidator.enableValidation();

const formEditCardValidator = new FormValidation(validationConfig, profileForm);
formEditCardValidator.enableValidation();

//функция открытия модалки
function openPopup(popup) {
  popup.classList.add('popup_opened');
  // добавление слушателя кнопки Esc
  document.addEventListener('keydown', keyHandler);
}

// функция закрытия модалки
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  // отмена добавленного слушателя
  document.removeEventListener('keydown', keyHandler);
}

//функция закрытия модалки при нажатии Esc
function keyHandler(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup);
  }
}

//функция закрытия модалки при клике на оверлей переписана и перенесена в конец файла index.js
// document.addEventListener('click', overlayHandler);

function overlayHandler(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}



// навешиваем слушатель событий на кнопки editBtn & editCloseBtn
editBtn.addEventListener('click', () => {
  formEditCardValidator.reset();
	// openPopup(editPopup);
  // nameInput.value = '';
  // aboutInput.value = ''; 
  openEditPopup(editPopup);
});  

editCloseBtn.addEventListener('click', () => closePopup(editPopup));

function openEditPopup(profile) {
//заполнение формы
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
	openPopup(profile);
}

//Обработчик формы модалки редактирования
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup(editPopup);
}
// навешиваем слушатель 
profileForm.addEventListener('submit', handleProfileFormSubmit);

// навешиваем слушатель событий на кнопки addBtn & addCloseBtn
addBtn.addEventListener('click', () => {

  // formAddCardValidator.reset();
	openPopup(addPopup);
	
	cardPopupForm.reset();
  formAddCardValidator.reset();
  // cardPopupInputName.value = '';
  // cardPopupInputLink.value = ''; 
});
	
addCloseBtn.addEventListener('click', () => closePopup(addPopup));

//функция открытия модалки со значениями из полей формы
function imageClickHandler(obj) {
	imgBtn.src = obj.link;
	imgBtn.alt = obj.name;
	imgPopupDiscription.textContent = obj.name;
	openPopup(imgPopup);
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
    link: cardPopupInputLink.value,
    name: cardPopupInputName.value,
  };

  const addElements = createCard(obj, '#template', imageClickHandler);
 
  container.prepend(addElements);
  closePopup(addPopup);

  // cardPopupInputLink.value = '';
  // cardPopupInputName.value = '';
  cardPopupForm.reset();
};

addPopup.addEventListener('submit', handleCardFormSubmit);
imgCloseBtn.addEventListener('click', () => closePopup(imgPopup));

// Закрытие модалок по клику оверлея
editPopup.addEventListener("click", overlayHandler); 
addPopup.addEventListener("click", overlayHandler); 
imgPopup.addEventListener("click", overlayHandler); 