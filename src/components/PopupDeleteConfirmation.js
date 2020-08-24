import { Popup } from './Popup.js';

export class PopupDeleteConfirmation extends Popup {
    constructor ({popupSelector, commonPopupClass, openedPopupClass, closeButtonClass, formSelector, handleSubmitButton }) {
        super(popupSelector, commonPopupClass, openedPopupClass, closeButtonClass);
        this._formSelector = formSelector;
        this._popup = document.querySelector(popupSelector);
        this._form = this._popup.querySelector(this._formSelector);
        this._handleSubmitButton = handleSubmitButton;
    }
    
    setEventListeners() {
        super.setEventListeners();
        
        this._form.addEventListener('submit', this._handleSubmitButton);
    }

}