export class Card {
    constructor( photoCardSelector, myPhotoCardSelector, { photoDescription, link, likesAmount, owner, id, userId, arrayOfLikes }, 
    { handleCardClick }, { handleLikeClick }, { handleDeleteIconClick } ) {
        this._photoCardSelector = photoCardSelector;
        this._photoDescription = photoDescription;
        this._link = link;
        this._user = userId;
        this._owner = owner;
        this._id = id;
        this._likes = arrayOfLikes;
        this._likesAmount = likesAmount;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteIconClick = handleDeleteIconClick;
        this._myPhotoCardSelector = myPhotoCardSelector;
    }

    _getTemplate() {
        let applicableCardTemplateSelector = this._photoCardSelector;
        
        if (this._isOwnersCard()) {
            applicableCardTemplateSelector = this._myPhotoCardSelector;
        }

        const cardElement = document
        .querySelector(applicableCardTemplateSelector)
        .content
        .querySelector('li')
        .cloneNode(true);

        return cardElement;
    }

    _isOwnersCard() {
        if (this._owner === this._user) {
            return true;
        }
        else {
            return false;
        }
    }


    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        const photoElement = this._element.querySelector('.photo-card__photo');
        photoElement.src = this._link;
        photoElement.alt = this._photoDescription;
        this._element.querySelector('.photo-card__description').textContent = this._photoDescription;
        const likes = this._element.querySelector('.photo-card__likes-amount');
        likes.textContent = this._likesAmount;
        
        if (this._likes && this._likes.some(like => like._id === this._user)) {
            this._element.querySelector('.photo-card__like').classList.add('photo-card__like_active');
        }
        return this._element;
    }
    
    _setEventListeners() {
        const deletePhotoButton = this._element.querySelector('.photo-card__delete-button');
        if (deletePhotoButton) {
            deletePhotoButton.addEventListener('click', () => {
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

    keepLikes(){

    }

    _toggleLike(event){
        event.target.classList.toggle('photo-card__like_active');
    }
}