import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor ({popupSelector, commonPopupClass, openedPopupClass, closeButtonClass, inputSelector, formSelector, handleFormSubmit }) {
        super(popupSelector, commonPopupClass, openedPopupClass, closeButtonClass);
        this._handleFormSubmit = handleFormSubmit;
        this._inputSelector = inputSelector;
        this._formSelector = formSelector;
        this._inputList = this._popup.querySelectorAll(this._inputSelector);
        this._form = this._popup.querySelector(this._formSelector);
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (event) => { this._handleFormSubmit(this._getInputValues()) });
    } 
    
    close() {
        super.close();
        this._form.reset();
    }
}