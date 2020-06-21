const popup = document.querySelector('.popup');
const profile = document.querySelector('.profile');
const popupForm = popup.querySelector('.popup__form');

const popupOpenButton = profile.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close-button');
const popupSaveButton =  popup.querySelector('.popup__submit-button');

const nameInput = popup.querySelector('.popup__field_name');
const descriptionInput = popup.querySelector('.popup__field_description');

const profileUserName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');


function popupClose (event) { 
    event.preventDefault();
    event.stopPropagation();
    popup.classList.remove('popup_opened');
}

function popupOpen (event) {
    nameInput.value = profileUserName.textContent;
    descriptionInput.value = profileDescription.textContent;

    popup.classList.add('popup_opened');
}

function formSubmitHandler (event) {
    
    event.preventDefault(); 
  
    profileUserName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
        
    popupClose(event);
}

function stopPropagation (event) {
    event.stopPropagation();
}

popupOpenButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);
popupForm.addEventListener('click', stopPropagation);
popup.addEventListener('click', popupClose);
popupForm.addEventListener('submit', formSubmitHandler);

