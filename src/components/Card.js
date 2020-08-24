export class Card {
    constructor( photoCardSelector, myPhotoCardSelector, { photoDescription, link, likesAmount, owner, id }, 
    { handleCardClick }, { handleLikeClick }, { handleDeleteIconClick } ) {
        this._photoCardSelector = photoCardSelector;
        this._photoDescription = photoDescription;
        this._link = link;
        this._owner = owner;
        this._id = id;
        this._likesAmount = likesAmount;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteIconClick = handleDeleteIconClick;
        this._myPhotoCardSelector = myPhotoCardSelector;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._photoCardSelector)
        .content
        .querySelector('li')
        .cloneNode(true);

        return cardElement;
    }

    _getTemplateOfMyCard() {
        const cardElement = document
        .querySelector(this._myPhotoCardSelector)
        .content
        .querySelector('li')
        .cloneNode(true);

        return cardElement;
    }

    _isOwnersCard() {
        if (this._owner === "5a4f361b745774983a48beec") {
            return true;
        }
        else {
            return false;
        }
    }


    generateCard() {
        if (this._isOwnersCard()) {
            this._element = this._getTemplateOfMyCard();
        }
        else {
            this._element = this._getTemplate();
        }
        
        this._setEventListeners();

        const photoElement = this._element.querySelector('.photo-card__photo');
        photoElement.src = this._link;
        photoElement.alt = this._photoDescription;
        this._element.querySelector('.photo-card__description').textContent = this._photoDescription;
        const likes = this._element.querySelector('.photo-card__likes-amount');
        likes.textContent = this._likesAmount;

        return this._element;
    }
    
    _setEventListeners() {
        if (this._element.querySelector('.photo-card__delete-button')) {
            this._element.querySelector('.photo-card__delete-button').addEventListener('click', () => {
                this._handleDeleteIconClick(event);
            });
        }

        this._element.querySelector('.photo-card__like').addEventListener('click', () => {
            this._handleLikeClick(event);
        });

        this._element.querySelector('.photo-card__photo').addEventListener('click', () => {
            this._handleCardClick(event);
        });
    }

    _toggleLike(event){
        event.target.classList.toggle('photo-card__like_active');
    }
}