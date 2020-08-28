import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor ({ popupSelector }, { formSelectors }, { handleFormSubmit }) {
        super(popupSelector, formSelectors.commonPopupClass, formSelectors.openedPopupClass, formSelectors.closeButtonClass);
        this._handleFormSubmit = handleFormSubmit;
        this._inputSelector = formSelectors.inputSelector;
        this._formSelector = formSelectors.formSelector;
        this._submitButtonSelector = formSelectors.submitButtonSelector;
        this._inputList = this._popup.querySelectorAll(this._inputSelector);
        this._form = this._popup.querySelector(this._formSelector);
        this._submitButton = this._popup.querySelector(this._submitButtonSelector);
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
        setTimeout(() => { this._submitButton.textContent = this._submitButton.name; }) 
    }

    makeButtonLoading(loadingButtonText){
        this._submitButton.textContent = loadingButtonText;
    }
}