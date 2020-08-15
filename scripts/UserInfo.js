export class UserInfo {
    constructor ({ userNameSelector, profileDescriptionSelector }) {
        this._userNameSelector = userNameSelector;
        this._profileDescriptionSelector = profileDescriptionSelector;
        this._userName = document.querySelector(this._userNameSelector);
        this._profileDescription = document.querySelector(this._profileDescriptionSelector);
    }

    getUserInfo() {
        this._userData = {};
        this._userData['user-name'] = this._userName.textContent;
        this._userData['profile-description'] = this._profileDescription.textContent;

        return this._userData;
    }

    setUserInfo(formValues) {
        this._userName.textContent = formValues['user-name'];
        this._profileDescription.textContent = formValues['profile-description'];
    }
}