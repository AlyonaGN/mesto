const objectToValidate = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  fieldSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  errorClass: '.popup__field-error',
  fieldErrorSelector: 'popup__field_type_error',
  inputErrorClass: 'popup__input_type_error',
};

const showInputError = (inputElement, errorMessage, errorClass, fieldErrorSelector, inputSelector, inputErrorClass) => {
  const errorInput = inputElement.closest(inputSelector);
  errorInput.classList.add(inputErrorClass);
  const errorElement = errorInput.querySelector(errorClass);
  inputElement.classList.add(fieldErrorSelector);
  errorElement.textContent = errorMessage;
};

const hideInputError = (inputElement, errorClass, fieldErrorSelector, inputSelector, inputErrorClass) => {
  const errorInput = inputElement.closest(inputSelector);
  errorInput.classList.remove(inputErrorClass);
  const errorElement = errorInput.querySelector(errorClass);
  inputElement.classList.remove(fieldErrorSelector);
  errorElement.textContent = '';
};

const checkInputValidity = (inputElement, { errorClass, fieldErrorSelector, inputSelector, inputErrorClass }) => {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage, errorClass, fieldErrorSelector, inputSelector, inputErrorClass);
  }
  else {
    hideInputError(inputElement, errorClass, fieldErrorSelector, inputSelector, inputErrorClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    makeButtonInactive(buttonElement, inactiveButtonClass);
  }
  else {
    makeButtonActive(buttonElement, inactiveButtonClass);
  }
};

function makeButtonInactive(buttonElement, inactiveButtonClass) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
}

function makeButtonActive(buttonElement, inactiveButtonClass) {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
}

const setEventListeners = (formElement, { fieldSelector, submitButtonSelector, inactiveButtonClass, ...rest }) => {
  const inputList = Array.from(formElement.querySelectorAll(fieldSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(inputElement, rest);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

function hidePopupErrors(popup, { inputSelector, fieldSelector, errorClass, fieldErrorSelector, inputErrorClass }) {
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

function enableValidation({ formSelector, ...rest }) {
  const formList = document.querySelectorAll(formSelector);

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement, rest);
  });
}


