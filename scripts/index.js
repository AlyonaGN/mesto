const profile = document.querySelector('.profile');
const popupEditProfile = document.querySelector('.popup_type_profile');
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');
const popupEditProfileOpenButton = profile.querySelector('.profile__edit-button');
const popupEditProfileCloseButton = popupEditProfile.querySelector('.popup__close-button');
const nameInput = popupEditProfile.querySelector('.popup__field_name');
const profileDescriptionInput = popupEditProfile.querySelector('.popup__field_description');
const profileUserName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');

const popupAddPhoto = document.querySelector('.popup_type_add-photo');
const popupAddPhotoForm = popupAddPhoto.querySelector('.popup__form');
const popupAddPhotoOpenButton = profile.querySelector('.profile__add-button');
const popupAddPhotoCloseButton = popupAddPhoto.querySelector('.popup__close-button');
const newPhotoDescriptionInput = popupAddPhoto.querySelector('.popup__field_photo-description');
const newPhotoLinkInput = popupAddPhoto.querySelector('.popup__field_photo-link');

const popupPhotoView = document.querySelector('.popup_type_photo-view');
const popupPhotoFullScreen = popupPhotoView.querySelector('.popup__photo-fullscreen');
const popupPhotoViewCloseButton = popupPhotoView.querySelector('.popup__close-button');
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

    popupClose(event);
    
    newPhotoDescriptionInput.value = '';
    newPhotoLinkInput.value = '';
}

function popupClose (event) { 
    event.preventDefault();
    event.stopPropagation();

    if (event.target === popupEditProfileCloseButton || event.target === popupEditProfileForm) {
        popupEditProfile.classList.remove('popup_opened');
    }

    else if (event.target === popupAddPhotoCloseButton || event.target === popupAddPhotoForm) {
        popupAddPhoto.classList.remove('popup_opened');
    }

    else if (event.target === popupPhotoViewCloseButton) {
        popupPhotoView.classList.remove('popup_opened');
    }
}

function popupOpen (event) {
    if (event.target === popupEditProfileOpenButton) {
        
        nameInput.value = profileUserName.textContent;
        profileDescriptionInput.value = profileDescription.textContent;

        popupEditProfile.classList.add('popup_opened');
    }

    else if (event.target === popupAddPhotoOpenButton) {
        popupAddPhoto.classList.add('popup_opened');
    }
}

function openPhotoCardFullScreen (event) {
    event.preventDefault();
    event.stopPropagation();
    
    const photoCardFullScreen = event.target.closest('.photo-card');
    popupPhotoFullScreen.src = photoCardFullScreen.querySelector('.photo-card__photo').src;
    popupPhotoFullScreenCaption.innerText = photoCardFullScreen.querySelector('.photo-card__description').innerText;

    popupPhotoView.classList.add('popup_opened');
}

function editProfileFormSubmitHandler (event) {
    event.preventDefault();
    event.stopPropagation(); 
  
    profileUserName.textContent = nameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
        
    popupClose(event);
}

function toggleLikePhotoCard (event) {
    event.target.classList.toggle('photo-card__like_active');
}

function deletePhotoCard (event) {
    const photoCardToBeDeleted = event.target.closest('li');
    photoCardToBeDeleted.remove();
}


popupEditProfileOpenButton.addEventListener('click', popupOpen);
popupEditProfileCloseButton.addEventListener('click', popupClose);

popupAddPhotoOpenButton.addEventListener('click', popupOpen);
popupAddPhotoCloseButton.addEventListener('click', popupClose);

popupEditProfileForm.addEventListener('submit', editProfileFormSubmitHandler);
popupAddPhotoForm.addEventListener('submit', addNewPhotoSubmitHandler);

popupPhotoViewCloseButton.addEventListener('click', popupClose);

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


