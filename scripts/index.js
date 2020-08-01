import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { openPopup, closePopup } from './utils.js';
import { validationConfig } from './config.js';

const popupEditProfile = document.querySelector('.popup_type_profile');
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');
const profile = document.querySelector('.profile');
const nameInput = popupEditProfile.querySelector('.popup__field_name');
const profileDescriptionInput = popupEditProfile.querySelector('.popup__field_description');
const profileUserName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');
const popupEditProfileOpenButton = profile.querySelector('.profile__edit-button');

const popupAddPhoto = document.querySelector('.popup_type_add-photo');
const popupAddPhotoForm = popupAddPhoto.querySelector('.popup__form');
const popupAddPhotoSubmitButton = popupAddPhoto.querySelector('.popup__submit-button');
const newPhotoDescriptionInput = popupAddPhoto.querySelector('.popup__field_photo-description');
const newPhotoLinkInput = popupAddPhoto.querySelector('.popup__field_photo-link');
const popupAddPhotoOpenButton = profile.querySelector('.profile__add-button');
const photoCardTemplateClass = '.photo-card-template';

const popupList = document.querySelectorAll('.popup');

const profileFormValidator = new FormValidator(validationConfig, popupEditProfileForm);
const addPhotoFormValidator = new FormValidator(validationConfig, popupAddPhotoForm);

function openProfilePopup() {
    nameInput.value = profileUserName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    profileFormValidator.hidePopupErrors(popupEditProfile);
    openPopup(popupEditProfile);
}

function openAddPhotoPopup() {
    newPhotoDescriptionInput.value = '';
    newPhotoLinkInput.value = '';
    addPhotoFormValidator.resetForm(popupAddPhoto, popupAddPhotoSubmitButton);
    openPopup(popupAddPhoto);
}

function createCard(cardName, cardLink) {
    const newPhotoCard = new Card(photoCardTemplateClass, cardName, cardLink);
    return newPhotoCard.generateCard();
}

function addPhotoCard(photoCard) {
    const photoCards = document.querySelector('.photo-cards__list');
    photoCards.prepend(photoCard);
}

function addNewPhotoSubmitHandler(event) {
    event.preventDefault();
    event.stopPropagation();

    const newCardElement = createCard(newPhotoDescriptionInput.value, newPhotoLinkInput.value);
    addPhotoCard(newCardElement);

    const popup = event.target.closest('.popup');
    closePopup(popup);

    newPhotoDescriptionInput.value = '';
    newPhotoLinkInput.value = '';
}

function editProfileFormSubmitHandler(event) {
    event.preventDefault();
    event.stopPropagation();

    profileUserName.textContent = nameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    const popup = event.target.closest('.popup');
    closePopup(popup);
}

initialCards.reverse().forEach((item) => {
    const cardElement = createCard(item.name, item.link);
    addPhotoCard(cardElement);
  });

popupList.forEach(function (popup) {
    popup.addEventListener('click', (event) => {
        if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-button')) {
            closePopup(popup);
        }
    });
});

profileFormValidator.enableValidation();
addPhotoFormValidator.enableValidation();

popupEditProfileForm.addEventListener('submit', editProfileFormSubmitHandler);
popupAddPhotoForm.addEventListener('submit', () => { addNewPhotoSubmitHandler(event) });
popupEditProfileOpenButton.addEventListener('click', openProfilePopup);
popupAddPhotoOpenButton.addEventListener('click', openAddPhotoPopup);

