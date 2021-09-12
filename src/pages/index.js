import Card from '../components/Cards.js';
import FormValidation from '../components/FormValidator.js';
 import {
  editPopup, 
  addPopup, 
  imgPopup, 
  deletePopup,
  editBtn, 
  addBtn, 
  validationConfig,
  profileForm, 
  nameInput, 
  aboutInput, 
  profileName, 
  profileAbout, 
  profileAvatar,
  container, 
  cardPopupForm,  
  templateElement,
  avatarForm,
  avatarBtn,
  avatarUpdatePopup,
} from '../constants/variables.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDeleteForm from '../components/PopupWithDeleteForm.js';
import Api from '../components/Api.js';
import './index.css';

const api = new Api({
  address: "https://mesto.nomoreparties.co/v1/cohort-27",
  token: "f8a0f685-371b-49c7-8421-4195e39df623",
});


const createCard = (data) => {
  const card = new Card({
    data: data,
    cardTemplate: templateElement,
    handleCardClick: () => {
      popupWithImage.open(data);
    },
    handleCardDelete: () => {
      deleteCardPopup.open(()=> {
        deleteCardPopup.setLoading(true);
        api.deleteCard(data._id)
        .then(() => {
          card.deleteButtonClick();
          deleteCardPopup.close();          
        })
        .catch((err) => console.log(`Ошибка при удалении карточки: ${err}`))
        .finally(() => {
          deleteCardPopup.setLoading(false);
        });
      })
    },
    userId: userInfo.getUserId(),
    api: api,
  });

  const cardElement = card.generateCard();
  return cardElement;
};

const cardsList = new Section(
  {
    renderer: (data) => {
      cardsList.addItem(createCard(data));
    },
  },
  container
);

const userInfo = new UserInfo({
  name: profileName,
  about: profileAbout,
  avatar: profileAvatar,
});

Promise.all([api.getUserData(), api.getInitialCards()]).then(
  ([userData, initialCards]) => {
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
      id: userData._id,
    });
    cardsList.renderItems(initialCards);
  }
);

const popupWithImage = new PopupWithImage(imgPopup);
const addCardPopup = new PopupWithForm(addPopup, addCardSubmitHandler);
const editProfilePopup = new PopupWithForm(editPopup, editFormSubmitHandler);
const deleteCardPopup = new PopupWithDeleteForm(deletePopup);

const formAddCardValidator = new FormValidation(validationConfig, cardPopupForm);

const formEditCardValidator = new FormValidation(validationConfig, profileForm);

const formUpdateAvatarValidator = new FormValidation(validationConfig, avatarForm);

// Обновление аватара
const updateAvatarPopup = new PopupWithForm(avatarUpdatePopup, avatarPopupSubmitHandler);

function avatarPopupSubmitHandler(data) {
  updateAvatarPopup.setLoading(true);
  api
    .updateAvatar(data.avatar)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      updateAvatarPopup.close();
    })
    .catch((err) => console.log(`Ошибка при загрузке фотографии: ${err}`))
    .finally(() => {
      updateAvatarPopup.setLoading(false);
    });
}

// Редактирование профиля
function editFormSubmitHandler(data) {
  editProfilePopup.setLoading(true);
  api
    .setUserData(data)
    .then(({ name, about, avatar }) => {
      userInfo.setUserInfo({ name, about, avatar });
      editProfilePopup.close();
    })
    .catch((err) => console.log(`Ошибка при обновлении профиля: ${err}`))
    .finally(() => {
      editProfilePopup.setLoading(false);
    });
}

// Добавление карточки
function addCardSubmitHandler(data) {
  addCardPopup.setLoading(true);
  api
    .createCard(data)
    .then((res) => {
      cardsList.addItem(createCard(res));
      addCardPopup.close();
    })
    .catch((err) => console.log(`Ошибка при загрузке карточки: ${err}`))
    .finally(() => {
      addCardPopup.setLoading(false);
    });
}

editBtn.addEventListener('click', () => {
  // nameInput.value = userInfo.getUserInfo().name;
  // aboutInput.value = userInfo.getUserInfo().about;
  editProfilePopup.open();
  formEditCardValidator.reset();
});


addBtn.addEventListener('click', () => {
  addCardPopup.open();
  formAddCardValidator.reset();
});


avatarBtn.addEventListener("click", () => {
  updateAvatarPopup.open();
  formUpdateAvatarValidator.reset();
});


updateAvatarPopup.setEventListeners();
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
popupWithImage.setEventListeners();
deleteCardPopup.setEventListeners();
formAddCardValidator.enableValidation();
formEditCardValidator.enableValidation();
formUpdateAvatarValidator.enableValidation();