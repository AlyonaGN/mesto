import { Popup } from './Popup.js';

export class PopupDeleteConfirmation extends Popup {
    constructor ({ popupSelector }, { formSelectors }, { handleSubmit } ) {
        super(popupSelector, formSelectors.commonPopupClass, formSelectors.openedPopupClass, formSelectors.closeButtonClass);
        this._formSelector = formSelectors.formSelector;
        this._popup = document.querySelector(popupSelector);
        this._form = this._popup.querySelector(this._formSelector);
        this._handleSubmitAction = handleSubmit;    
    }
    
    setSubmitAction(handler){
        this._handleSubmitAction = handler;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', () => { this._handleSubmitAction() });
    }
}