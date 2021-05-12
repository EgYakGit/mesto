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
  cardModalBtn, 
  container, 
  cardModalForm, 
  imgModalDiscription, 
  templateElement, 
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
	//const inputElements = Array.from(profileForm.querySelectorAll('.form__input'));
  //const buttonElement = profileForm.querySelector('.form__save');
  formEditCardValidator.reset();
	openModal(editModal);
  nameInput.value = '';
  aboutInput.value = ''; 

});  
// 	inputElements.forEach((input) => {
//     hideInputError(profileForm, input, 'modal__input-error_active');  
//   });
//   toggleButtonState(inputElements, buttonElement, 'form__save_disabled');
// }
// );

editCloseBtn.addEventListener('click', () => closeModal(editModal));

function openEditModal(profile) {
// 	const inputList = cardModalForm.querySelectorAll('.form__input');
//   const buttonElement = cardModalForm.querySelector('.form__save');
//заполнение формы
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
	openModal(profile);

	// toggleButtonState(inputList, buttonElement, 'form__save_disabled');
}

//Обработчик формы модалки редактирования
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closeModal(editModal);
  // nameInput.value = '';
  // aboutInput.value = ''; 
}
// навешиваем слушатель 
profileForm.addEventListener('submit', handleProfileFormSubmit);

// навешиваем слушатель событий на кнопки addBtn & addCloseBtn
addBtn.addEventListener('click', () => {
	// const inputElements = Array.from(cardModalForm.querySelectorAll('.form__input'));
  // const buttonElement = cardModalForm.querySelector('.form__save');
  formAddCardValidator.reset();
	openModal(addModal);
	
	cardModalInputName.value = '';
  cardModalInputLink.value = ''; 
});
	
// 	inputElements.forEach((input) => {
//     input.value = '';
//     hideInputError(cardModalForm, input, 'modal__input-error_active');    
//   });

//   toggleButtonState(inputElements, buttonElement, 'form__save_disabled');
// });

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

//функция создания карточки
// function createCard(obj, templateElement) {
//   //функция открытия модалки со значениями из полей формы
//   function imageClickHandler() {
//     imgBtn.src = obj.link;
//     imgBtn.alt = obj.name;
//     imgModalDiscription.textContent = obj.name;
//     openModal(imgModal);
//   }

//   //клонируем темплейт
//   const cardElement = templateElement.cloneNode(true);
//   //ищем элементы темплейта
//   const cardElementTitle = cardElement.querySelector('.card__item-title');
//   const cardImage = cardElement.querySelector('.card__image');

//   //навешиваем обработчик открытия модалки
//   cardImage.addEventListener('click', imageClickHandler);

//   //присваиваем значения строк из массива
//   cardElementTitle.textContent = obj.name;
//   cardImage.src = obj.link;
//   cardImage.alt = obj.name;

//   //навешиваем обработчики на кнопку удаления карточки
//   const deleteBtn = cardElement.querySelector('.card__item-delete');
//   deleteBtn.addEventListener('click', () => {
//     cardElement.remove();
//   });

//   //навешиваем обработчики на кнопку лайка карточки
//   const likeBtn = cardElement.querySelector('.card__item-like');
//   likeBtn.addEventListener('click', (event) => {
//     event.target.classList.toggle('card__item-like_active');
//   });

//   return cardElement;
// };

// //проходим по массиву, добавляем элементы в контейнер
// initialCards.forEach((item) => {
//   const cardElement = createCard(item, templateElement);
//   container.prepend(cardElement);
// });

//функция добавления карточки
const handleCardFormSubmit = (evt) => {
  evt.preventDefault();

  const obj = {
    link: cardModalInputLink.value,
    name: cardModalInputName.value,
  };

  const addElements = createCard(obj, '#template', imageClickHandler);
  //"#template"
  container.prepend(addElements);
  closeModal(addModal);

  cardModalInputLink.value = '';
  cardModalInputName.value = '';
};

addModal.addEventListener('submit', handleCardFormSubmit);
imgCloseBtn.addEventListener('click', () => closeModal(imgModal));