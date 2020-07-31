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

