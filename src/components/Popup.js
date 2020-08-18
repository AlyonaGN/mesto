export class Popup {
    constructor(popupSelector, commonPopupClass, openedPopupClass, closeButtonClass) {
        this._popupSelector = popupSelector;
        this._commonPopupClass = commonPopupClass;
        this._openedPopupClass = openedPopupClass;
        this._closeButtonClass = closeButtonClass;
        this._popup = document.querySelector(this._popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add(this._openedPopupClass);
        document.addEventListener('keyup', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove(this._openedPopupClass);
        document.removeEventListener('keyup', this._handleEscClose);
    }

    _handleEscClose() {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.addEventListener('click', (event) => {
            if (event.target.classList.contains(this._commonPopupClass) || event.target.classList.contains(this._closeButtonClass)) {
                this.close();
            }
        });
    }
}