import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor (link, photoDescription, popupSelector) {
        super(popupSelector);
        this._popupSelector = popupSelector;
        this._photoDescription = photoDescription;
        this._link = link;
    }
    
    open(event) {
        event.preventDefault();
        event.stopPropagation();
        
        const popupPhotoFullScreen = document.querySelector('.popup__photo-fullscreen');
        const popupPhotoFullScreenCaption = document.querySelector('.popup__photo-caption');

        popupPhotoFullScreen.src = this._link;
        popupPhotoFullScreenCaption.innerText = this._photoDescription;
        popupPhotoFullScreen.alt = this._photoDescription;
        super.open();    
    }
}