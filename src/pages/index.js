import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { validationConfig } from '../utils/config.js';
import { initialCards } from '../utils/initial-cards.js';
import './index.css';

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
const photoCardTemplateSelector = '.photo-card-template';
const PopupClass = 'popup';
const openedPopupModifier = 'popup_opened';
const closePopupButtonClass = 'popup__close-button';
const popupInputSelector = '.popup__field';
const popupFormSelector = '.popup__form';


const profileFormValidator = new FormValidator(validationConfig, popupEditProfileForm);
const addPhotoFormValidator = new FormValidator(validationConfig, popupAddPhotoForm);


const initialCardsList = new Section({ 
    items: initialCards, 
    renderer: (item) => {
        const cardElement = createCard(item.name, item.link);
        initialCardsList.addItem(cardElement);
        },
    }, 
    photoCardsListSelector);

const userProfileData = new UserInfo( { userNameSelector: '.profile__name', 
profileDescriptionSelector: '.profile__description' } );

    const profileForm = new PopupWithForm({
    popupSelector: '.popup_type_profile',
    commonPopupClass: PopupClass, 
    openedPopupClass: openedPopupModifier, 
    closeButtonClass: closePopupButtonClass,
    inputSelector: popupInputSelector, 
    formSelector: popupFormSelector, 
    handleFormSubmit: (formValues) => {

        userProfileData.setUserInfo(formValues);
        profileForm.close();
        
    }
});

const addPhotoForm = new PopupWithForm({
    popupSelector: '.popup_type_add-photo',
    commonPopupClass: PopupClass, 
    openedPopupClass: openedPopupModifier, 
    closeButtonClass: closePopupButtonClass,
    inputSelector: popupInputSelector, 
    formSelector: popupFormSelector,
    handleFormSubmit: () => {

        const newPhotoCard = createCard(newPhotoDescriptionInput.value, newPhotoLinkInput.value);

        initialCardsList.addItem(newPhotoCard);

        addPhotoForm.close();
    }
});

const popupWithPhoto = new PopupWithImage('.popup_type_photo-view', PopupClass, openedPopupModifier,
closePopupButtonClass, '.popup__photo-fullscreen', '.popup__photo-caption');
popupWithPhoto.setEventListeners();

function createCard(cardName, cardLink) {
    const newPhotoCard = new Card(photoCardTemplateSelector, cardName, cardLink, 
        {
            handleCardClick: () => {
                
                popupWithPhoto.open(cardLink, cardName);
            }
    });
    return newPhotoCard.generateCard();
}

addPhotoForm.setEventListeners();
profileForm.setEventListeners();


profileFormValidator.enableValidation();
addPhotoFormValidator.enableValidation();

initialCardsList.renderItems();

popupEditProfileOpenButton.addEventListener('click', () => {
    const userData = userProfileData.getUserInfo();
    nameInput.value = userData[nameInput.name];
    profileDescriptionInput.value = userData[profileDescriptionInput.name];
    profileFormValidator.hidePopupErrors(popupEditProfile);
    profileForm.open();
});

popupAddPhotoOpenButton.addEventListener('click', () => { 
    addPhotoFormValidator.resetForm(popupAddPhoto, popupAddPhotoSubmitButton);
    addPhotoForm.open(); 
});

