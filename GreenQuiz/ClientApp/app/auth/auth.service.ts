import {Injectable } from '@angular/core';
import {tokenNotExpired } from 'angular2-jwt';

declare var Auth0Lock: any;

@Injectable()
export class Auth {
    lock = new Auth0Lock('GgNe4VE4DHXzZ4xvMaejXVIju5zJ9BEc', 'rian0702.eu.auth0.com', {});

    constructor() {
        this.lock.on('authenticated', (authResult) => {
            localStorage.setItem('id_token', authResult.idToken);
        });
    }

    public login() {
        this.lock.show();
    }

    public authenticated() {
        return tokenNotExpired();
    }

    public logout() {
        localStorage.removeItem('id_token');
    }
}