import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor ({popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popup = document.querySelector(this._popupSelector);
        this._inputList = this._popup.querySelectorAll('.popup__field');
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    setEventListeners() {
        this._popup.addEventListener('click', (event) => {
            if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-button')) {
                this.close();
            }
        });

        const form = this._popup.querySelector('.popup__form');
        form.addEventListener('submit', (event) => { this._handleFormSubmit(this._getInputValues()) });
    } 
    
    close() {
        this._popup.classList.remove('popup_opened');
        this._inputList.forEach(input => {
            input.value = "";
        });
    }
}