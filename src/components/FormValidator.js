export class FormValidator {
  constructor(validationConfig, formToValidate) {
    this._validationConfig = validationConfig;
    this._formToValidate = formToValidate;
}

_showInputError(inputElement, errorMessage) {
    const errorInput = inputElement.closest(this._validationConfig.inputSelector);
    errorInput.classList.add(this._validationConfig.inputErrorClass);
    const errorElement = errorInput.querySelector(this._validationConfig.errorClass);
    inputElement.classList.add(this._validationConfig.fieldErrorSelector);
    errorElement.textContent = errorMessage;
  }
  
 _hideInputError(inputElement) {
    const errorInput = inputElement.closest(this._validationConfig.inputSelector);
    errorInput.classList.remove(this._validationConfig.inputErrorClass);
    const errorElement = errorInput.querySelector(this._validationConfig.errorClass);
    inputElement.classList.remove(this._validationConfig.fieldErrorSelector);
    errorElement.textContent = '';
  }
  
 _checkInputValidity(inputElement){
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
    else {
      this._hideInputError(inputElement);
    }
  }
  
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._makeButtonInactive(buttonElement, this._validationConfig.inactiveButtonClass);
    }
    else {
      this._makeButtonActive(buttonElement, this._validationConfig.inactiveButtonClass);
    }
  }
  
  _makeButtonInactive(buttonElement) {
    buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  }
  
  _makeButtonActive(buttonElement) {
    buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }

 hidePopupErrors(popup) {
    const inputs = popup.querySelectorAll(this._validationConfig.inputSelector);
    inputs.forEach((input) => {
      input.classList.remove(this._validationConfig.inputErrorClass);
    });
  
    const fields = popup.querySelectorAll(this._validationConfig.fieldSelector);
    fields.forEach((field) => {
      field.classList.remove(this._validationConfig.fieldErrorSelector);
    });
  
    const errors = popup.querySelectorAll(this._validationConfig.errorClass);
    errors.forEach((error) => {
      error.textContent = '';
    });
  }

  resetForm(popup, buttonElement) {
    this._makeButtonInactive(buttonElement);
    this.hidePopupErrors(popup);
  }
  
 _setEventListeners (formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._validationConfig.fieldSelector));
    const buttonElement = formElement.querySelector(this._validationConfig.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement, this._validationConfig.inactiveButtonClass);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }
  
  enableValidation() {
    const formList = document.querySelectorAll(this._validationConfig.formSelector);
  
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
  
      this._setEventListeners(formElement);
    });
  }
}




