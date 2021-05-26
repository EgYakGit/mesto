import Card from "../components/Card.js";
import initialCards from "../utils/initial-cards.js";
import FormValidation from "../components/FormValidator.js";
 import {
  editPopup, 
  addPopup, 
  imgPopup, 
  editBtn, 
  addBtn, 
  profileForm, 
  nameInput, 
  aboutInput, 
  profileName, 
  profileAbout, 
  container, 
  cardPopupForm,  
  templateElement,
  validationConfig
} from '../utils/variables.js';
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";


const createCard = (obj) => {
  const card = new Card(obj, templateElement, {
    handleCardClick() {
      popupWithImage.open(obj);
    },
  });
  const cardElement = card.generateCard();
  return cardElement;
};

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (obj) => {
      const cardElement = createCard(obj);
      cardsList.addItem(cardElement);
    },
  },
  container
);

const userInfo = new UserInfo({
  name: profileName,
  about: profileAbout,
});

const popupWithImage = new PopupWithImage(imgPopup);
const addCardPopup = new PopupWithForm(addPopup, addCardSubmitHandler);
const editProfilePopup = new PopupWithForm(editPopup, editFormSubmitHandler);
const formAddCardValidator = new FormValidation(validationConfig, cardPopupForm);


const formEditCardValidator = new FormValidation(validationConfig, profileForm);


function editFormSubmitHandler(obj) {
  userInfo.setUserInfo(obj.name, obj.about);
  editProfilePopup.close();
}

editBtn.addEventListener("click", () => {
  nameInput.value = userInfo.getUserInfo().name;
  aboutInput.value = userInfo.getUserInfo().about;
  editProfilePopup.open();
  formEditCardValidator.reset();
});

function addCardSubmitHandler(obj) {
  const card = createCard(obj);

  cardsList.addItem(card);
  addCardPopup.close();
}

addBtn.addEventListener("click", () => {
  addCardPopup.open();
  formAddCardValidator.reset();
});

cardsList.renderItems();
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
popupWithImage.setEventListeners();
formAddCardValidator.enableValidation();
formEditCardValidator.enableValidation();