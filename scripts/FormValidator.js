export class FormValidator {
  constructor(objectToValidate, formToValidate) {
    this._objectToValidate = objectToValidate;
    this._formToValidate = formToValidate;
}

_showInputError(inputElement, errorMessage) {
    const errorInput = inputElement.closest(this._objectToValidate.inputSelector);
    errorInput.classList.add(this._objectToValidate.inputErrorClass);
    const errorElement = errorInput.querySelector(this._objectToValidate.errorClass);
    inputElement.classList.add(this._objectToValidate.fieldErrorSelector);
    errorElement.textContent = errorMessage;
  }
  
 _hideInputError(inputElement) {
    const errorInput = inputElement.closest(this._objectToValidate.inputSelector);
    errorInput.classList.remove(this._objectToValidate.inputErrorClass);
    const errorElement = errorInput.querySelector(this._objectToValidate.errorClass);
    inputElement.classList.remove(this._objectToValidate.fieldErrorSelector);
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
      this._makeButtonInactive(buttonElement, inactiveButtonClass);
    }
    else {
      this._makeButtonActive(buttonElement, inactiveButtonClass);
    }
  }
  
  _makeButtonInactive(buttonElement) {
    buttonElement.classList.add(this._objectToValidate.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  }
  
  _makeButtonActive(buttonElement) {
    buttonElement.classList.remove(this._objectToValidate.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
  
 _setEventListeners (formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._objectToValidate.fieldSelector));
    const buttonElement = formElement.querySelector(this._objectToValidate.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement, this._objectToValidate.inactiveButtonClass);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }
  
_hidePopupErrors(popup, { inputSelector, fieldSelector, errorClass, fieldErrorSelector, inputErrorClass }) {
    const inputs = popup.querySelectorAll(inputSelector);
    inputs.forEach(function (input) {
      input.classList.remove(inputErrorClass);
    });
  
    const fields = popup.querySelectorAll(fieldSelector);
    fields.forEach(function (field) {
      field.classList.remove(fieldErrorSelector);
    });
  
    const errors = popup.querySelectorAll(errorClass);
    errors.forEach(function (error) {
      error.textContent = '';
    });
  }
  
  enableValidation() {
    const formList = document.querySelectorAll(this._objectToValidate.formSelector);
  
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
  
      this._setEventListeners(formElement);
    });
  }
}




