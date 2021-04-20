// Функция присваивания класса с ошибкой
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(inputErrorClass);
};

// Функция удаления класса с ошибкой
const hideInputError = (formElement, inputElement, inputErrorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = '';
  errorElement.classList.remove(inputErrorClass);
};

// Задаём свой текс ошибок
const getErrorMessage = (inputElement) => {
  const defaultErrorHandler = (inputElement) => inputElement.validationMessage;

  const linkErrorHandler = (inputElement) => {
    if (inputElement.validity.typeMismatch) {
      return 'Введите ссылку в формате: https://image.ru';
    }

    if (inputElement.validity.valueMissing) {
      return 'Введите URL';
    }
  };

  const errorHandlers = {
    link: linkErrorHandler,
    default: defaultErrorHandler,
  };

  const inputName = inputElement.name;
  const errorHandler = errorHandlers[inputName] || errorHandlers.default;

  return errorHandler(inputElement);
};

// Функция проверки поля на валидность
const isValid = (formElement, inputElement, inputErrorClass) => {
  const isInputNotValid = !inputElement.validity.valid;
  
  if (isInputNotValid) {
    const errorMessage = getErrorMessage(inputElement); 
   
    showInputError(formElement, inputElement, errorMessage, inputErrorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass);
  }
};

//Функция переключения submit
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  
  const findAtLeastOneNotValid = (inputElement) => !inputElement.validity.valid;
  const hasNotValidInput = Array.from(inputList).some(findAtLeastOneNotValid);

  if (hasNotValidInput) {
    buttonElement.toggleAttribute('disabled', true);
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.toggleAttribute('disabled', false);
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

// Навешивание слушателя
const setEventListeners = (
  formElement,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass
) => {
  // Запрещаем отправку по умолчанию
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  const inputListIterator = (inputElement) => {
    const handleInput = () => {
      isValid(formElement, inputElement, inputErrorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    };

    inputElement.addEventListener('input', handleInput);
  };

  inputList.forEach(inputListIterator);
};

// Включаем валидацию
const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,  
}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  // Проходим по массиву и вешаем слушателя
  formList.forEach((formElement) => {
    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass);
  });
};

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save',
  inactiveButtonClass: 'form__save_disabled',
  inputErrorClass: 'modal__input-error_active'
});