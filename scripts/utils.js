const popupEditProfile = document.querySelector('.popup_type_profile');
export const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');
export const profile = document.querySelector('.profile');
const nameInput = popupEditProfile.querySelector('.popup__field_name');
const profileDescriptionInput = popupEditProfile.querySelector('.popup__field_description');
const profileUserName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');

const popupAddPhoto = document.querySelector('.popup_type_add-photo');
export const popupAddPhotoForm = popupAddPhoto.querySelector('.popup__form');
const popupAddPhotoSubmitButton = popupAddPhoto.querySelector('.popup__submit-button');
const newPhotoDescriptionInput = popupAddPhoto.querySelector('.popup__field_photo-description');
const newPhotoLinkInput = popupAddPhoto.querySelector('.popup__field_photo-link');

const inactiveSumbitButtonSelector = 'popup__submit-button_inactive';

const photoCardTemplateClass = '.photo-card-template';

const photoCards = document.querySelector('.photo-cards__list');

export function openPopup(popupToOpen) {
    popupToOpen.classList.add('popup_opened');
    document.addEventListener('keyup', handleEscKey);
}

export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', handleEscKey);
}

function handleEscKey(event) {
    if (event.key === 'Escape') {
        const activePopup = document.querySelector('.popup_opened');
        closePopup(activePopup);
    }
}

export function preparePopupProfileForOpening(profileFormValidator) {
    nameInput.value = profileUserName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    profileFormValidator.hidePopupErrors(popupEditProfile);
    openPopup(popupEditProfile);
}

export function preparePopupAddPhotoForOpening(addPhotoFormValidator) {
    newPhotoDescriptionInput.value = '';
    newPhotoLinkInput.value = '';
    makeButtonInactive(popupAddPhotoSubmitButton, inactiveSumbitButtonSelector);
    addPhotoFormValidator.hidePopupErrors(popupAddPhoto);
    openPopup(popupAddPhoto);
}

export function createCard(Card, cardName, cardLink) {
    const newPhotoCard = new Card(photoCardTemplateClass, cardName, cardLink);
    return newPhotoCard.generateCard();
}

export function addNewPhotoSubmitHandler(Card, event) {
    event.preventDefault();
    event.stopPropagation();

    const newCardElement = createCard(Card, newPhotoDescriptionInput.value, newPhotoLinkInput.value);
    addPhotoCard(newCardElement);

    const popup = event.target.closest('.popup');
    closePopup(popup);

    newPhotoDescriptionInput.value = '';
    newPhotoLinkInput.value = '';
}

function makeButtonInactive(buttonElement, inactiveButtonSelector) {
    buttonElement.classList.add(inactiveButtonSelector);
    buttonElement.setAttribute('disabled', true);
  }

export function addPhotoCard(photoCard) {
    photoCards.prepend(photoCard);
}

export function editProfileFormSubmitHandler(event) {
    event.preventDefault();
    event.stopPropagation();

    profileUserName.textContent = nameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    const popup = event.target.closest('.popup');
    closePopup(popup);
}

