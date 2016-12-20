import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Subject, BehaviorSubject } from 'rxjs';

declare var Auth0Lock: any;

@Injectable()
export class Auth {
    lock = new Auth0Lock('GgNe4VE4DHXzZ4xvMaejXVIju5zJ9BEc', 'rian0702.eu.auth0.com', {});

    constructor() {
        this.lock.on('authenticated', (authResult) => {
            debugger;
            localStorage.setItem('id_token', authResult.idToken);
            this.lock.getProfile(authResult.idToken, (err, profile: Auth0UserProfile) => {
                if (err) {
                    console.log("ERROR");
                    console.log(err);
                    return;
                }

                localStorage.setItem('profile', JSON.stringify(profile));
            })
        });
    }

    public getCurrentUser() {
        return JSON.parse(localStorage.getItem('profile'));
    }

    public login() {
        this.lock.show();
    }

    public authenticated() {
        return tokenNotExpired();
    }

    public logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
    }
}