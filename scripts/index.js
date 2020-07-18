const popupList = document.querySelectorAll('.popup');

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
const popupAddPhotoSubmitButton = popupAddPhoto.querySelector('.popup__submit-button');
const newPhotoDescriptionInput = popupAddPhoto.querySelector('.popup__field_photo-description');
const newPhotoLinkInput = popupAddPhoto.querySelector('.popup__field_photo-link');

const popupPhotoView = document.querySelector('.popup_type_photo-view');
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
        if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-button')) {
            closePopup(popup);
        }
    });
});

function createPhotoCard(photoDescription, link) {
    const photoCard = photoCardTemplate.cloneNode(true);
    photoCard.querySelector('.photo-card__description').innerText = photoDescription;

    const photoElement = photoCard.querySelector('.photo-card__photo');
    photoElement.src = link;
    photoElement.alt = photoDescription;

    const deletePhotoCardButton = photoCard.querySelector('.photo-card__delete-button');
    deletePhotoCardButton.addEventListener('click', deletePhotoCard);

    const photoCardLikeButton = photoCard.querySelector('.photo-card__like');
    photoCardLikeButton.addEventListener('click', toggleLikePhotoCard);

    const photoCardPhoto = photoCard.querySelector('.photo-card__photo');
    photoCardPhoto.addEventListener('click', openPhotoCardFullScreen);

    return photoCard;
}

function addPhotoCard(photoCard) {
    photoCards.prepend(photoCard);
}

function addNewPhotoSubmitHandler(event) {
    event.preventDefault();
    event.stopPropagation();

    const newPhotoCard = createPhotoCard(newPhotoDescriptionInput.value, newPhotoLinkInput.value);
    addPhotoCard(newPhotoCard);

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

function openPhotoCardFullScreen(event) {
    event.preventDefault();
    event.stopPropagation();

    const photoCardFullScreen = event.target.closest('.photo-card');
    const photoFullScreenElement = photoCardFullScreen.querySelector('.photo-card__photo');
    popupPhotoFullScreen.src = photoFullScreenElement.src;
    popupPhotoFullScreenCaption.innerText = photoCardFullScreen.querySelector('.photo-card__description').innerText;
    popupPhotoFullScreen.alt = photoFullScreenElement.alt;
    openPopup(popupPhotoView);
}

function editProfileFormSubmitHandler(event) {
    event.preventDefault();
    event.stopPropagation();

    profileUserName.textContent = nameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    const popup = event.target.closest('.popup');
    closePopup(popup);
}

function toggleLikePhotoCard(event) {
    event.target.classList.toggle('photo-card__like_active');
}

function deletePhotoCard(event) {
    const photoCardToBeDeleted = event.target.closest('li');
    photoCardToBeDeleted.remove();
}

popupEditProfileOpenButton.addEventListener('click', preparePopupProfileForOpening);
popupAddPhotoOpenButton.addEventListener('click', preparePopupAddPhotoForOpening);
popupEditProfileForm.addEventListener('submit', editProfileFormSubmitHandler);
popupAddPhotoForm.addEventListener('submit', addNewPhotoSubmitHandler);

enableValidation(objectToValidate);
