import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';
import { validationConfig } from './config.js';
import { initialCards } from './initial-cards.js';
import '../pages/index.css';

const popupEditProfile = document.querySelector('.popup_type_profile');
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');
const profile = document.querySelector('.profile');
const nameInput = popupEditProfile.querySelector('.popup__field_name');
const profileDescriptionInput = popupEditProfile.querySelector('.popup__field_description');
const popupEditProfileOpenButton = profile.querySelector('.profile__edit-button');

const popupAddPhoto = document.querySelector('.popup_type_add-photo');
const popupAddPhotoForm = popupAddPhoto.querySelector('.popup__form');
const popupAddPhotoSubmitButton = popupAddPhoto.querySelector('.popup__submit-button');
const newPhotoDescriptionInput = popupAddPhoto.querySelector('.popup__field_photo-description');
const newPhotoLinkInput = popupAddPhoto.querySelector('.popup__field_photo-link');
const popupAddPhotoOpenButton = profile.querySelector('.profile__add-button');

const photoCardsListSelector = '.photo-cards__list';
const photoCardTemplateClass = '.photo-card-template';

const profileFormValidator = new FormValidator(validationConfig, popupEditProfileForm);
const addPhotoFormValidator = new FormValidator(validationConfig, popupAddPhotoForm);


const initialCardsList = new Section({ 
    items: initialCards, 
    renderer: (item) => {
        const cardElement = createCard(item.name, item.link);
        initialCardsList.setItem(cardElement);
        },
    }, 
    photoCardsListSelector);

const userProfileData = new UserInfo( { userNameSelector: '.profile__name', 
profileDescriptionSelector: '.profile__description' } );

    const profileForm = new PopupWithForm({
    popupSelector: '.popup_type_profile', 
    handleFormSubmit: (formValues) => {

        userProfileData.setUserInfo(formValues);
        profileForm.close();
        
    }
});

const addPhotoForm = new PopupWithForm({
    popupSelector: '.popup_type_add-photo',
    handleFormSubmit: () => {

        const newPhotoCard = createCard(newPhotoDescriptionInput.value, newPhotoLinkInput.value);

        const card = new Section({}, photoCardsListSelector);
        card.setItem(newPhotoCard);

        addPhotoForm.close();
    }
});

function createCard(cardName, cardLink) {
    const newPhotoCard = new Card(photoCardTemplateClass, cardName, cardLink, 
        {
            handleCardClick: () => {
                const popup = new PopupWithImage(cardLink, cardName, '.popup_type_photo-view');
                popup.open(event);
                popup.setEventListeners();
                popup.setEventListenerCloseWithEsc();
            }
    });
    return newPhotoCard.generateCard();
}

addPhotoForm.setEventListeners();
profileForm.setEventListeners();

addPhotoForm.setEventListenerCloseWithEsc();
profileForm.setEventListenerCloseWithEsc();


profileFormValidator.enableValidation();
addPhotoFormValidator.enableValidation();

initialCardsList.renderItems();

popupEditProfileOpenButton.addEventListener('click', () => {
    const userData = userProfileData.getUserInfo();
    nameInput.value = userData[nameInput.name];
    profileDescriptionInput.value = userData[profileDescriptionInput.name];
    profileFormValidator.hidePopupErrors(popupEditProfile);
    profileForm.open(event);
});

popupAddPhotoOpenButton.addEventListener('click', () => { 
    addPhotoFormValidator.resetForm(popupAddPhoto, popupAddPhotoSubmitButton);
    addPhotoForm.open(event) 
});

