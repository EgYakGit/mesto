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

function openEditModal(profile) {
  //заполнение формы
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  openModal(profile);
}

//Обработчик формы модалки редактирования
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closeModal(editModal);
}
// навешиваем слушатель 
profileForm.addEventListener("submit", formSubmitHandler);

// навешиваем слушатель событий на кнопки addBtn & addCloseBtn
addBtn.addEventListener("click", () => openModal(addModal));
addCloseBtn.addEventListener("click", () => closeModal(addModal));

//функция создания карточки
function createCard(obj, templateElement) {
  //функция открытия модалки со значениями из полей формы
  function imageClickHandler() {
    imgBtn.src = obj.link;
    imgBtn.alt = obj.name;
    imgModalDiscription.textContent = obj.name;
    openModal(imgModal);
  }

  //клонируем темплейт
  const cardElement = templateElement.cloneNode(true);
  //ищем элементы темплейта
  const cardElementTitle = cardElement.querySelector(".card__item-title");
  const cardImage = cardElement.querySelector(".card__image");

  //навешиваем обработчик открытия модалки
  cardImage.addEventListener("click", imageClickHandler);

  //присваиваем значения строк из массива
  cardElementTitle.textContent = obj.name;
  cardImage.src = obj.link;
  cardImage.alt = obj.name;

  //навешиваем обработчики на кнопку удаления карточки
  const deleteBtn = cardElement.querySelector(".card__item-delete");
  deleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  //навешиваем обработчики на кнопку лайка карточки
  const likeBtn = cardElement.querySelector(".card__item-like");
  likeBtn.addEventListener("click", (event) => {
    event.target.classList.toggle("card__item-like-active");
  });

  return cardElement;
};

//проходим по массиву, добавляем элементы в контейнер
initialCards.forEach((item) => {
  const cardElement = createCard(item, templateElement);
  container.prepend(cardElement);
});

//функция добавления карточки
const cardSubmitHandler = (evt) => {
  evt.preventDefault();

  const obj = {
    link: cardModalInputLink.value,
    name: cardModalInputName.value,
  };

  const cardElement = createCard(obj, templateElement);
  container.prepend(cardElement);
  closeModal(addModal);

  cardModalInputLink.value = "";
  cardModalInputName.value = "";
};

addModal.addEventListener("submit", cardSubmitHandler);
imgCloseBtn.addEventListener("click", () => closeModal(imgModal));
