import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const popupList = document.querySelectorAll('.popup');

const profile = document.querySelector('.profile');
const popupEditProfile = document.querySelector('.popup_type_profile');
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');
const popupEditProfileOpenButton = profile.querySelector('.profile__edit-button');
const nameInput = popupEditProfile.querySelector('.popup__field_name');
const profileDescriptionInput = popupEditProfile.querySelector('.popup__field_description');
const profileUserName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');

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

const popupAddPhoto = document.querySelector('.popup_type_add-photo');
const popupAddPhotoForm = popupAddPhoto.querySelector('.popup__form');
const popupAddPhotoOpenButton = profile.querySelector('.profile__add-button');
const popupAddPhotoSubmitButton = popupAddPhoto.querySelector('.popup__submit-button');
const newPhotoDescriptionInput = popupAddPhoto.querySelector('.popup__field_photo-description');
const newPhotoLinkInput = popupAddPhoto.querySelector('.popup__field_photo-link');

const photoCards = document.querySelector('.photo-cards__list');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

initialCards.reverse().forEach((item) => {
    const card = new Card('.photo-card-template', item.name, item.link, openPopup);
    const cardElement = card.generateCard();
  
    addPhotoCard(cardElement);
  });

popupList.forEach(function (popup) {
    popup.addEventListener('click', (event) => {
        if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-button')) {
            closePopup(popup);
        }
    });
});

function addPhotoCard(photoCard) {
    photoCards.prepend(photoCard);
}

function addNewPhotoSubmitHandler(event) {
    event.preventDefault();
    event.stopPropagation();

    const newPhotoCard = new Card('.photo-card-template', newPhotoDescriptionInput.value, newPhotoLinkInput.value, openPopup);
    const newCardElement = newPhotoCard.generateCard();
    addPhotoCard(newCardElement);

    const popup = event.target.closest('.popup');
    closePopup(popup);

    newPhotoDescriptionInput.value = '';
    newPhotoLinkInput.value = '';
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', handleEscKey);
}

function preparePopupProfileForOpening() {
    nameInput.value = profileUserName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    hidePopupErrors(popupEditProfile, objectToValidate);
    openPopup(popupEditProfile);
}

function preparePopupAddPhotoForOpening() {
    newPhotoDescriptionInput.value = '';
    newPhotoLinkInput.value = '';
    makeButtonInactive(popupAddPhotoSubmitButton, objectToValidate.inactiveButtonClass);
    hidePopupErrors(popupAddPhoto, objectToValidate);
    openPopup(popupAddPhoto);
}

function openPopup(popupToOpen) {
    popupToOpen.classList.add('popup_opened');
    document.addEventListener('keyup', handleEscKey);
}

function handleEscKey(event) {
    if (event.key === 'Escape') {
        const activePopup = document.querySelector('.popup_opened');
        closePopup(activePopup);
    }
}

function editProfileFormSubmitHandler(event) {
    event.preventDefault();
    event.stopPropagation();

    profileUserName.textContent = nameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    const popup = event.target.closest('.popup');
    closePopup(popup);
}

const profileFormToValidate = new FormValidator(objectToValidate, popupEditProfileForm);
profileFormToValidate.enableValidation();

const addPhotoFormToValidate = new FormValidator(objectToValidate, popupAddPhotoForm);
addPhotoFormToValidate.enableValidation();

popupEditProfileOpenButton.addEventListener('click', preparePopupProfileForOpening);
popupAddPhotoOpenButton.addEventListener('click', preparePopupAddPhotoForOpening);
popupEditProfileForm.addEventListener('submit', editProfileFormSubmitHandler);
popupAddPhotoForm.addEventListener('submit', addNewPhotoSubmitHandler);


