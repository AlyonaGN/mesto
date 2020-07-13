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

const checkInputValidity = (inputElement, {errorClass, fieldErrorSelector, inputSelector, inputErrorClass}) => {
  
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
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);

  } 
  else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }

};

const setEventListeners = (formElement, {fieldSelector, submitButtonSelector, inactiveButtonClass, ...rest}) => {
  
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

function enableValidation({formSelector, ...rest}) {
  
  const formList = document.querySelectorAll(formSelector);
  
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement, rest);

  });

}


