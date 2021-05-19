export default class FormValidation {
  constructor(validationConfig, form) {
    this._form = form;
    this._buttonElement = this._form.querySelector(
      validationConfig.submitButtonSelector
    );
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._inputList = Array.from(
      this._form.querySelectorAll(validationConfig.inputSelector)
    );
  }

  _showInputError = (input, errorMessage) => {
    const errorElement = this._form.querySelector(`#${input.id}-error`);

    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._inputErrorClass);
  };

  // Этот метод удаляет класс с ошибкой
  _hideInputError = (input) => {
    const errorElement = this._form.querySelector(`#${input.id}-error`);

    input.textContent = "";
    errorElement.classList.remove(this._inputErrorClass);
  };

  // Этот метод добавляет класс с ошибкой (сообщение об ошибке)
  _getErrorMessage(input) {
    const defaultErrorHandler = () => input.validationMessage;

    const linkErrorHandler = () => {
      if (input.validity.typeMismatch) {
        return 'Введите ссылку в формате: https://image.ru';
      }

      if (input.validity.valueMissing) {
        return 'Введите URL';
      }
    };

    const errorHandlers = {
      link: linkErrorHandler,
      default: defaultErrorHandler,
    };

    const errorHandler = errorHandlers[input.name] || errorHandlers.default;

    return errorHandler(input);
  }

  //Переключение submit
  _toggleButtonState = () => {
    if (this._hasNotValidInput()) {
      this._buttonElement.toggleAttribute("disabled", true);
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonElement.toggleAttribute("disabled", false);
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  };

  _hasNotValidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  //Проверка валидности поля
  _isValid = (input) => {
    const isInputNotValid = !input.validity.valid;

    if (isInputNotValid) {
      const errorMessage = this._getErrorMessage(input);
      this._showInputError(input, errorMessage);
    } else {
      this._hideInputError(input);
    }
  };

  _onInput(input) {
    this._isValid(input);
    this._toggleButtonState();
  }

  _setEventListeners() {
    //Запрещаем отправку по умолчанию
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    // Проходим по массиву и вешаем слушателя
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => this._onInput(input));
    });

    this._inputList.forEach((input) => {
      this._onInput(input);
    });
  }

  reset() {
    this._inputList.forEach(this._hideInputError);
    this._toggleButtonState();
  }

  enableValidation() {
    this._setEventListeners();
  }
}