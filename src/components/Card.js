export class Card {
    constructor(photoCardSelector, photoDescription, link, { handleCardClick }) {
        this._photoCardSelector = photoCardSelector;
        this._photoDescription = photoDescription;
        this._link = link;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._photoCardSelector)
        .content
        .querySelector('li')
        .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        const photoElement = this._element.querySelector('.photo-card__photo');
        photoElement.src = this._link;
        photoElement.alt = this._photoDescription;
        this._element.querySelector('.photo-card__description').textContent = this._photoDescription;

        return this._element;
    }
    
    _setEventListeners() {
        this._element.querySelector('.photo-card__delete-button').addEventListener('click', () => {
            this._deletePhotoCard(event);
        });

        this._element.querySelector('.photo-card__like').addEventListener('click', () => {
            this._toggleLikePhotoCard(event);
        });

        this._element.querySelector('.photo-card__photo').addEventListener('click', () => {
            this._handleCardClick(event);
        });
    }

    _deletePhotoCard(event) {
        const photoCardToBeDeleted = event.target.closest('li');
        photoCardToBeDeleted.remove();  
    }

    _toggleLikePhotoCard(event) {
        event.target.classList.toggle('photo-card__like_active');
    }

}