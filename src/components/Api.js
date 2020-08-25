export class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    getUserData() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-14/users/me', {
            headers: {
                authorization: '281eea5d-a9b0-4240-a494-1ec91d19957f'
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    getInitialCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-14/cards', {
            headers: {
                authorization: '281eea5d-a9b0-4240-a494-1ec91d19957f'
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    editProfile(formValues) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-14/users/me', {
            method: 'PATCH',
            headers: {
                authorization: '281eea5d-a9b0-4240-a494-1ec91d19957f',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formValues['user-name'],
                about: formValues['profile-description']
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    addNewCard(pictureLink, pictureDescription) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-14/cards', {
            method: 'POST',
            headers: {
                authorization: '281eea5d-a9b0-4240-a494-1ec91d19957f',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                link: pictureLink,
                name: pictureDescription
            })
        })
        .then(res => { 
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    deleteCard(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-14/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: '281eea5d-a9b0-4240-a494-1ec91d19957f',
                'Content-Type': 'application/json'
            }
        })
        .then(res => { 
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    addLike(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-14/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: {
                authorization: '281eea5d-a9b0-4240-a494-1ec91d19957f',
                'Content-Type': 'application/json'
            }
        })
        .then(res => { 
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    removeLike(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-14/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: '281eea5d-a9b0-4240-a494-1ec91d19957f',
                'Content-Type': 'application/json'
            }
        })
        .then(res => { 
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    changeAvatar(avatarLink) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-14/users/me/avatar', {
            method: 'PATCH',
            headers: {
                authorization: '281eea5d-a9b0-4240-a494-1ec91d19957f',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatarLink,
            })
        })
        .then(res => { 
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    loadAppInfo() {
        return Promise.all([this.getInitialCards(), this.getUserData()]);
      }

}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
    headers: {
      authorization: '281eea5d-a9b0-4240-a494-1ec91d19957f',
      'Content-Type': 'application/json'
    }
  });