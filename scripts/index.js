const popup = document.querySelector('.edit-profile-form');
const popupOpenButton = document.querySelector('.profile__open-edit-profile-form');
const popupCloseButton = popup.querySelector('.edit-profile-form__close-button');
const popupSaveButton =  popup.querySelector('.edit-profile-form__submit-button');
const profile = document.querySelector('.profile');

const popupClose = function (event) {
    popup.classList.remove('edit-profile-form_opened');
}

const popupOpen = function (event) {
    popup.classList.add('edit-profile-form_opened');
}

const closeEditFormClickingOverlay = function (event) {
    if (event.target === event.currentTarget) { 
        popupClose(); 
    } 
}

function formSubmitHandler (event) {
    event.preventDefault(); 

    const nameInput = popup.querySelector('.edit-profile-form__name-field');
    const descriptionInput = popup.querySelector('.edit-profile-form__description-field');

    let userName = nameInput.value;
    let jobDescription = descriptionInput.value;

    let profileUserName = profile.querySelector('.profile__name');
    let profileJobDescription = profile.querySelector('.profile__description');
        
    profileUserName.textContent = userName;
    profileJobDescription.textContent = jobDescription;
        
    popupClose();
    
}

popupOpenButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);
popup.addEventListener('click', closeEditFormClickingOverlay);
popup.addEventListener('submit', formSubmitHandler);

