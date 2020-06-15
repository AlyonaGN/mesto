const popup = document.querySelector('.edit-profile-form');
const popupOpenButton = document.querySelector('.profile__open-edit-profile-form');
const popupCloseButton = popup.querySelector('.edit-profile-form__close-button');
const popupSaveButton =  popup.querySelector('.edit-profile-form__submit-button');
const profile = document.querySelector('.profile');

const popupToggle = function (event) {
    popup.classList.toggle('edit-profile-form_opened');
    console.log('i tried');
}

const closeEditFormClickingOverlay = function (event) {
    if (event.target === popupCloseButton) {
        event.stopPropagation();
    }
    else if (event.target === event.currentTarget) { 
        popupToggle(); 
    } 
    else  {
        return;
    }
}

function formSubmitHandler (event) {
    event.preventDefault(); 

    if (event.submitter !== popupCloseButton) {
        
        const nameInput = popup.querySelector('.edit-profile-form__name-field');
        const descriptionInput = popup.querySelector('.edit-profile-form__description-field');

        let userName = nameInput.value;
        let jobDescription = descriptionInput.value;

        let profileUserName = profile.querySelector('.profile__name');
        let profileJobDescription = profile.querySelector('.profile__description');
        
        profileUserName.textContent = userName;
        profileJobDescription.textContent = jobDescription;
        
        popupToggle();
    }
}

popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);
popup.addEventListener('click', closeEditFormClickingOverlay);
popup.addEventListener('submit', formSubmitHandler);

