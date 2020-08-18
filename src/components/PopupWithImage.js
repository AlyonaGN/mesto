import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor (popupSelector, commonPopupClass, openedPopupClass, closeButtonClass, photoFullScreenSelector, photoCaptionSelector) {
        super(popupSelector, commonPopupClass, openedPopupClass, closeButtonClass);
        this._photoFullScreenSelector = photoFullScreenSelector;
        this._photoCaptionSelector = photoCaptionSelector;
        this._photoFullScreen = this._popup.querySelector(this._photoFullScreenSelector);
        this._photoCaption = this._popup.querySelector(this._photoCaptionSelector);
    }
    
    open(link, photoDescription) {
        this._photoFullScreen.src = link;
        this._photoCaption.innerText = photoDescription;
        this._photoFullScreen.alt = photoDescription;
        super.open();    
    }
}