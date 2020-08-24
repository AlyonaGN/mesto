import { api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupDeleteConfirmation } from '../components/PopupDeleteConfirmation.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { validationConfig } from '../utils/config.js';
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

const popupDeletePhoto = document.querySelector('.popup_type_delete-card');

const myPhotoCardTemplateSelector = '.photo-card-template_mine';

const photoCardsListSelector = '.photo-cards__list';
const photoCardTemplateSelector = '.photo-card-template';

const popupClass = 'popup';
const openedPopupModifier = 'popup_opened';
const closePopupButtonClass = 'popup__close-button';
const popupInputSelector = '.popup__field';
const popupFormSelector = '.popup__form';

const avatarSelector = '.profile__avatar';

const userProfileData = new UserInfo( { 
    userNameSelector: '.profile__name', 
    profileDescriptionSelector: '.profile__description', 
    avatarSelector: avatarSelector 
} );

api.getUserData()
    .then((data) => {
        userProfileData.setUserInfo({userName: data.name, userDescription: data.about, userAvatar: data.avatar});
    })
    .catch((error) => {
        console.log(error);
    });

const cardRenderer = new Section({
    renderer: (item) => {
        const cardElement = createCard(item.name, item.link, item.likes.length, item.owner._id, item._id);
        cardRenderer.addItem(cardElement);
    },
},
    photoCardsListSelector);    

api.getInitialCards()
    .then((cards) => {
        cardRenderer.renderItems(cards);
    }).catch((error) => {
        console.log(error);
    });

const profileFormValidator = new FormValidator(validationConfig, popupEditProfileForm);
const addPhotoFormValidator = new FormValidator(validationConfig, popupAddPhotoForm);

const profileForm = new PopupWithForm({
    popupSelector: '.popup_type_profile',
    commonPopupClass: popupClass,
    openedPopupClass: openedPopupModifier,
    closeButtonClass: closePopupButtonClass,
    inputSelector: popupInputSelector,
    formSelector: popupFormSelector,
    handleFormSubmit: (formValues) => {
        api.editProfile(formValues)
        .then(() => {
            api.getUserData()
            .then((data) => {
                userProfileData.setUserInfo({ userName: data.name, userDescription: data.about });
            })
            .catch((error) => {
                console.log(error);
            })
        })
        .then(() => {
            profileForm.close();
        });
    }
});

const addPhotoForm = new PopupWithForm({
    popupSelector: '.popup_type_add-photo',
    commonPopupClass: popupClass, 
    openedPopupClass: openedPopupModifier, 
    closeButtonClass: closePopupButtonClass,
    inputSelector: popupInputSelector, 
    formSelector: popupFormSelector,
    handleFormSubmit: () => {

        api.addNewCard(newPhotoLinkInput.value, newPhotoDescriptionInput.value)
            .then((cardData) => {
                return createCard(cardData.name, cardData.link, cardData.likes.length, cardData.owner._id, cardData._id);
            })
            .then((newPhotoCard) => {
                cardRenderer.addItem(newPhotoCard);
            })
            .then(() => {
                addPhotoForm.close();
            });
    }
});

const popupWithPhoto = new PopupWithImage('.popup_type_photo-view', popupClass, openedPopupModifier,
closePopupButtonClass, '.popup__photo-fullscreen', '.popup__photo-caption');
popupWithPhoto.setEventListeners();

function createCard(cardName, cardLink, amountOfLikes, ownerId, cardId) {
    const newPhotoCard = new Card(photoCardTemplateSelector, myPhotoCardTemplateSelector,
        { photoDescription: cardName, link: cardLink, likesAmount: amountOfLikes, owner: ownerId, id: cardId },
        {
            handleCardClick: () => {
                popupWithPhoto.open(cardLink, cardName);
            }
        },
        { 
            handleLikeClick: (event) => {
                const photoLikesAmount = event.target.closest('.photo-card__like-container').querySelector('.photo-card__likes-amount');
                if (!event.target.classList.contains('photo-card__like_active')) {
                    api.addLike(cardId)
                        .then((likedCard) => {
                            photoLikesAmount.textContent = likedCard.likes.length;
                            newPhotoCard._toggleLike(event);
                        });
                }
                else {
                    api.removeLike(cardId)
                        .then((likedCard) => {
                            photoLikesAmount.textContent = likedCard.likes.length;
                            newPhotoCard._toggleLike(event);
                        });
                }
            }
        }, 
        { 
            handleDeleteIconClick:  (event) => {
                const cardToDelete = event.target.closest('li');
                const popupDeleteCard = new PopupDeleteConfirmation({
                    popupSelector: '.popup_type_delete-card', 
                    commonPopupClass: popupClass, 
                    openedPopupClass: openedPopupModifier, 
                    closeButtonClass: closePopupButtonClass,
                    formSelector: popupFormSelector, 
                    handleSubmitButton: () => {
                        api.deleteCard(cardId)
                            .then((deletedCard) => {
                                console.log(deletedCard);
                                cardToDelete.remove();
                            })
                            .then(() => {
                                popupDeleteCard.close();
                            });   
                    } 
                });
                
                popupDeleteCard.open();
                popupDeleteCard.setEventListeners();
            }
        });
    return newPhotoCard.generateCard();
}

addPhotoForm.setEventListeners();
profileForm.setEventListeners();


profileFormValidator.enableValidation();
addPhotoFormValidator.enableValidation();

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

