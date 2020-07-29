import { Card } from './Card.js';
import { preparePopupProfileForOpening, preparePopupAddPhotoForOpening, addPhotoCard, closePopup, editProfileFormSubmitHandler, 
    profile, popupEditProfileForm, popupAddPhotoForm, addNewPhotoSubmitHandler, createCard } from './utils.js';
import { FormValidator } from './FormValidator.js';

const popupList = document.querySelectorAll('.popup');
const popupEditProfileOpenButton = profile.querySelector('.profile__edit-button');
const popupAddPhotoOpenButton = profile.querySelector('.profile__add-button');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    fieldSelector: '.popup__field',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    errorClass: '.popup__field-error',
    fieldErrorSelector: 'popup__field_type_error',
    inputErrorClass: 'popup__input_type_error',
  };

initialCards.reverse().forEach((item) => {
    const cardElement = createCard(Card, item.name, item.link);
    addPhotoCard(cardElement);
  });

popupList.forEach(function (popup) {
    popup.addEventListener('click', (event) => {
        if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-button')) {
            closePopup(popup);
        }
    });
});

const profileFormValidator = new FormValidator(validationConfig, popupEditProfileForm);
const addPhotoFormValidator = new FormValidator(validationConfig, popupAddPhotoForm);
profileFormValidator.enableValidation();
addPhotoFormValidator.enableValidation();

popupEditProfileForm.addEventListener('submit', editProfileFormSubmitHandler);
popupAddPhotoForm.addEventListener('submit', () => { addNewPhotoSubmitHandler(Card, event) });
popupEditProfileOpenButton.addEventListener('click', () => { preparePopupProfileForOpening(profileFormValidator) });
popupAddPhotoOpenButton.addEventListener('click', () => { preparePopupAddPhotoForOpening(addPhotoFormValidator) });

