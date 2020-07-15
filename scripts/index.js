const popupList = document.querySelectorAll('.popup');
const popupCloseButtonsList = document.querySelectorAll('.popup__close-button');

const profile = document.querySelector('.profile');
const popupEditProfile = document.querySelector('.popup_type_profile');
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');
const popupEditProfileOpenButton = profile.querySelector('.profile__edit-button');
const nameInput = popupEditProfile.querySelector('.popup__field_name');
const profileDescriptionInput = popupEditProfile.querySelector('.popup__field_description');
const profileUserName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');

const popupAddPhoto = document.querySelector('.popup_type_add-photo');
const popupAddPhotoForm = popupAddPhoto.querySelector('.popup__form');
const popupAddPhotoOpenButton = profile.querySelector('.profile__add-button');
const newPhotoDescriptionInput = popupAddPhoto.querySelector('.popup__field_photo-description');
const newPhotoLinkInput = popupAddPhoto.querySelector('.popup__field_photo-link');

const popupPhotoView = document.querySelector('.popup_type_photo-view');
const popupPhotoViewFullScreen = document.querySelector('.popup__photo-card-fullscreen');
const popupPhotoFullScreen = popupPhotoView.querySelector('.popup__photo-fullscreen');
const popupPhotoFullScreenCaption = popupPhotoView.querySelector('.popup__photo-caption');
const photoCardTemplate = document.querySelector('.photo-card-template').content;
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

initialCards.reverse().forEach(function (initialCard) {
    const photoDescription = initialCard.name;
    const link = initialCard.link;
    const initialPhotoCard = createPhotoCard(photoDescription, link);
    addPhotoCard(initialPhotoCard);
});

popupList.forEach(function (popup) {
    popup.addEventListener('click', (event) => {
        if (event.target.classList.contains('popup')) {
            popupClose(popup); 
        } 
      });
});

popupCloseButtonsList.forEach(function (popupCloseButton){
    popupCloseButton.addEventListener('click', (event) => {
        if (event.target === popupCloseButton) {
            const popup = event.target.closest('.popup');
            popupClose(popup); 
        } 
      });
});

function createPhotoCard (photoDescription, link) {
    const photoCard = photoCardTemplate.cloneNode(true);
    photoCard.querySelector('.photo-card__description').innerText = photoDescription;
    photoCard.querySelector('.photo-card__photo').src = link;
    
    const deletePhotoCardButton = photoCard.querySelector('.photo-card__delete-button');
    deletePhotoCardButton.addEventListener('click', deletePhotoCard);

    const photoCardLikeButton = photoCard.querySelector('.photo-card__like');
    photoCardLikeButton.addEventListener('click', toggleLikePhotoCard);

    const photoCardPhoto = photoCard.querySelector('.photo-card__photo');
    photoCardPhoto.addEventListener('click', openPhotoCardFullScreen);
    
    return photoCard;
}

function addPhotoCard (photoCard) {
    photoCards.prepend(photoCard);
}

function addNewPhotoSubmitHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const newPhotoCard = createPhotoCard(newPhotoDescriptionInput.value, newPhotoLinkInput.value);
    addPhotoCard(newPhotoCard);

    const popup = event.target.closest('.popup');
    popupClose(popup);
    
    newPhotoDescriptionInput.value = '';
    newPhotoLinkInput.value = '';
}

function popupClose (popup) { 
    
    popup.classList.remove('popup_opened');
    
    hidePopupErrors(popup, { inputSelector: '.popup__input', fieldSelector: '.popup__field', errorClass: '.popup__field-error', fieldErrorSelector: 'popup__field_type_error', inputErrorClass: 'popup__input_type_error' })

    document.removeEventListener('keyup', handleEscKey);
}

function popupOpen (event) {
    if (event.target === popupEditProfileOpenButton) {
        
        nameInput.value = profileUserName.textContent;
        profileDescriptionInput.value = profileDescription.textContent;

        popupEditProfile.classList.add('popup_opened');

        document.addEventListener('keyup', handleEscKey);
    }

    else if (event.target === popupAddPhotoOpenButton) {
        
        newPhotoDescriptionInput.value = '';
        newPhotoLinkInput.value = '';

        popupAddPhoto.classList.add('popup_opened');

        document.addEventListener('keyup', handleEscKey);
    }

}

function handleEscKey (event) {
    if (event.key !== 'Escape') { 
        return; 
    }

    else {
        const activePopup = document.querySelector('.popup_opened');
        popupClose(activePopup);
    }
  }

function openPhotoCardFullScreen (event) {
    event.preventDefault();
    event.stopPropagation();
    
    const photoCardFullScreen = event.target.closest('.photo-card');
    popupPhotoFullScreen.src = photoCardFullScreen.querySelector('.photo-card__photo').src;
    popupPhotoFullScreenCaption.innerText = photoCardFullScreen.querySelector('.photo-card__description').innerText;

    popupPhotoView.classList.add('popup_opened');

    document.addEventListener('keyup', handleEscKey);
}

function editProfileFormSubmitHandler (event) {
    event.preventDefault();
    event.stopPropagation(); 
  
    profileUserName.textContent = nameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    
    const popup = event.target.closest('.popup');
    popupClose(popup); 
}

function toggleLikePhotoCard (event) {
    event.target.classList.toggle('photo-card__like_active');
}

function deletePhotoCard (event) {
    const photoCardToBeDeleted = event.target.closest('li');
    photoCardToBeDeleted.remove();
}

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
    errors.forEach(function (error){
        error.textContent = '';
    });
  }

popupEditProfileOpenButton.addEventListener('click', popupOpen);

popupAddPhotoOpenButton.addEventListener('click', popupOpen);

popupEditProfileForm.addEventListener('submit', editProfileFormSubmitHandler);
popupAddPhotoForm.addEventListener('submit', addNewPhotoSubmitHandler);

enableValidation({

    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    fieldSelector: '.popup__field',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    errorClass: '.popup__field-error',
    fieldErrorSelector: 'popup__field_type_error',
    inputErrorClass: 'popup__input_type_error',
  });


