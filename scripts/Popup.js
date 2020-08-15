export class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(this._popupSelector);
    }

    open() {
        this._popup.classList.add('popup_opened');
    }

    close() {
        this._popup.classList.remove('popup_opened');
    }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    setEventListenerCloseWithEsc() {
        document.addEventListener('keyup', (event) => { this._handleEscClose(event) });
    }

    setEventListeners() {
        this._popup.addEventListener('click', (event) => {
            if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-button')) {
                this.close();
            }
        });
    }
}