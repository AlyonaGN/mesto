import { Api } from '../components/Api.js';
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
const popupChangeAvatarSelector = '.popup_type_change-avatar';
const popupProfileSelector = '.popup_type_profile';
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');
const profile = document.querySelector('.profile');
const nameInput = popupEditProfile.querySelector('.popup__field_name');
const profileDescriptionInput = popupEditProfile.querySelector('.popup__field_description');
const popupEditProfileOpenButton = profile.querySelector('.profile__edit-button');
const avatarOverlay = profile.querySelector('.profile__avatar-overlay');

const popupAddPhoto = document.querySelector('.popup_type_add-photo');
const popupAddPhotoSelector = '.popup_type_add-photo';
const popupAddPhotoForm = popupAddPhoto.querySelector('.popup__form');
const popupAddPhotoSubmitButton = popupAddPhoto.querySelector('.popup__submit-button');
const newPhotoDescriptionInput = popupAddPhoto.querySelector('.popup__field_photo-description');
const newPhotoLinkInput = popupAddPhoto.querySelector('.popup__field_photo-link');
const popupAddPhotoOpenButton = profile.querySelector('.profile__add-button');

const popupPhotoFullScreenSelector = '.popup_type_photo-view';

const popupDeletePhotoSelector = '.popup_type_delete-card';

const popupEditAvatarElement = document.querySelector('.popup_type_change-avatar');
const popupEditAvatarForm = popupEditAvatarElement.querySelector('.popup__form');
const newAvatarLinkInput = popupEditAvatarElement.querySelector('.popup__field_photo-link');
const popupEditAvatarSubmitButton = popupEditAvatarElement.querySelector('.popup__submit-button');

const myPhotoCardTemplateSelector = '.photo-card-template_mine';
const myId = "5a4f361b745774983a48beec";

const photoCardsListSelector = '.photo-cards__list';
const photoCardTemplateSelector = '.photo-card-template';

const popupClass = 'popup';
const openedPopupModifier = 'popup_opened';
const closePopupButtonClass = 'popup__close-button';
const popupInputSelector = '.popup__field';
const popupFormSelector = '.popup__form';
const popupSubmitButtonSelector = '.popup__submit-button';
const popupSelectors = {
    commonPopupClass: popupClass,
    openedPopupClass: openedPopupModifier,
    closeButtonClass: closePopupButtonClass,
    inputSelector: popupInputSelector,
    formSelector: popupFormSelector,
    submitButtonSelector: popupSubmitButtonSelector,
}

const avatarSelector = '.profile__avatar';

const userProfileData = new UserInfo({ 
    userNameSelector: '.profile__name', 
    profileDescriptionSelector: '.profile__description', 
    avatarSelector: avatarSelector 
});

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
    headers: {
        authorization: '281eea5d-a9b0-4240-a494-1ec91d19957f',
        'Content-Type': 'application/json'
    }
});

api.loadAppInfo()
    .then(([cardList, userData]) => {
        userProfileData.setUserInfo({
            userName: userData.name, 
            userDescription: userData.about, 
            userAvatar: userData.avatar
        });
        cardRenderer.renderItems(cardList);
    })
    .catch((error) => {
        console.log(error);
    });

const cardRenderer = new Section({
    renderer: (item) => {
        const cardElement = createCard(item.name, item.link, item.likes.length, item.owner._id, item._id, item.likes);
        cardRenderer.addItem(cardElement);
    },
},
    photoCardsListSelector);    

const profileFormValidator = new FormValidator(validationConfig, popupEditProfileForm);
const addPhotoFormValidator = new FormValidator(validationConfig, popupAddPhotoForm);
const editAvatarValidator = new FormValidator(validationConfig, popupEditAvatarForm);

const profileForm = new PopupWithForm({ popupSelector: popupProfileSelector }, { formSelectors: popupSelectors },
    {
        handleFormSubmit: (formValues) => {
            profileForm.makeButtonLoading('Сохранение...');
            api.editProfile(formValues)
                .then(() => {
                    api.getUserData()
                        .then((data) => {
                            userProfileData.setUserInfo({
                                userName: data.name,
                                userDescription: data.about
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                })
                .then(() => {
                    profileForm.close();
                });
        }
    }
);

const addPhotoForm = new PopupWithForm(
    { popupSelector: popupAddPhotoSelector }, { formSelectors: popupSelectors },
    {
        handleFormSubmit: () => {
            addPhotoForm.makeButtonLoading('Создание...');
            api.addNewCard(newPhotoLinkInput.value, newPhotoDescriptionInput.value)
                .then((cardData) => {
                    return createCard(cardData.name, cardData.link, cardData.likes.length, cardData.owner._id, cardData._id);
                })
                .then((newPhotoCard) => {
                    cardRenderer.addItem(newPhotoCard);
                })
                .then(() => {
                    addPhotoForm.close();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
);

const popupEditAvatar = new PopupWithForm(
    { popupSelector: popupChangeAvatarSelector }, { formSelectors: popupSelectors },
    {
        handleFormSubmit: () => {
            popupEditAvatar.makeButtonLoading('Сохранение...');
            api.changeAvatar(newAvatarLinkInput.value)
                .then((res) => {
                    userProfileData.setUserInfo({ userAvatar: res.avatar });
                })
                .then(() => {
                    popupEditAvatar.close();
                })
                .catch((error) => {
                    console.log(error);
                });

        }
    }
);

const popupWithPhoto = new PopupWithImage(popupPhotoFullScreenSelector, popupClass, openedPopupModifier,
closePopupButtonClass, '.popup__photo-fullscreen', '.popup__photo-caption');
popupWithPhoto.setEventListeners();

const popupDeleteCard = new PopupDeleteConfirmation(
    { popupSelector: popupDeletePhotoSelector }, { formSelectors: popupSelectors }, { handleSubmit: function () {} });
popupDeleteCard.setEventListeners();

function createCard(cardName, cardLink, amountOfLikes, ownerId, cardId, likes) {

    const newPhotoCard = new Card(photoCardTemplateSelector, myPhotoCardTemplateSelector,
        { photoDescription: cardName, link: cardLink, likesAmount: amountOfLikes, owner: ownerId, id: cardId, userId: myId, arrayOfLikes: likes },
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
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
                else {
                    api.removeLike(cardId)
                        .then((likedCard) => {
                            photoLikesAmount.textContent = likedCard.likes.length;
                            newPhotoCard._toggleLike(event);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
            }
        },
        {
            handleDeleteIconClick: (event) => {
                popupDeleteCard.setSubmitAction(() => {
                    const cardToDelete = event.target.closest('li');
                    api.deleteCard(cardId)
                        .then(() => {
                            cardToDelete.remove();
                        })
                        .then(() => {
                            popupDeleteCard.close();
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                });
                popupDeleteCard.open();
            }
        });
    return newPhotoCard.generateCard();
}

addPhotoForm.setEventListeners();
profileForm.setEventListeners();
popupEditAvatar.setEventListeners();

profileFormValidator.enableValidation();
addPhotoFormValidator.enableValidation();
editAvatarValidator.enableValidation();

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

avatarOverlay.addEventListener('click', () => { 
    editAvatarValidator.resetForm(popupEditAvatarElement, popupEditAvatarSubmitButton);
    popupEditAvatar.open(); 
});

