export class UserInfo {
    constructor ({ userNameSelector, profileDescriptionSelector, avatarSelector }) {
        this._userNameSelector = userNameSelector;
        this._profileDescriptionSelector = profileDescriptionSelector;
        this._avatarSelector = avatarSelector;
        this._userName = document.querySelector(this._userNameSelector);
        this._profileDescription = document.querySelector(this._profileDescriptionSelector);
        this._avatar = document.querySelector(this._avatarSelector);
    }

    getUserInfo() {
        this._userData = {};
        this._userData['user-name'] = this._userName.textContent;
        this._userData['profile-description'] = this._profileDescription.textContent;

        return this._userData;
    }

    setUserInfo({userName, userDescription, userAvatar}) {
        
        if (userName) {
            this._userName.textContent = userName;
        }
        if (userDescription) {
            this._profileDescription.textContent = userDescription;
        }
        if (userAvatar) {
            this._avatar.src = userAvatar;
        }
    }
}