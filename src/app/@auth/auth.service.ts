import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import * as auth0 from 'auth0-js';

import {environment} from './../../environments/environment';

// import { IUser } from './IUser';
// import { Profile } from '../../../node_modules/@types/selenium-webdriver/firefox';

@Injectable({providedIn: 'root'})
export class AuthService {
  // Create Auth0 web auth instance @TODO: Update AUTH_CONFIG and remove .example
  // extension in src/app/auth/auth0-variables.ts.example
  private _Auth0 = new auth0.WebAuth({
    clientID: environment.auth0.clientId,
    domain: environment.auth0.domain,
    responseType: 'token id_token',
    redirectUri: environment.auth0.redirect,
    audience: environment.auth0.audience,
    scope: environment.auth0.scope
  });

  // Create a stream of logged in status to communicate throughout app
  loggedIn : boolean = false;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);
  profile$ = new BehaviorSubject<any>(null);
  // profile$ = this._profile.asObservable();

  constructor() {
    // You can restore an unexpired authentication session on init by using the
    // checkSession() endpoint from auth0.js:
    // https://auth0.com/docs/libraries/auth0js/v9#using-checksession-to-acquire-new-
    // tokens
    this._Auth0.checkSession({ audience: environment.auth0.audience }, this.handleAuthResult.bind(this));
    this.loadProfile();
  }

  private loadProfile() {
    const profile = localStorage.getItem("profile");
    if (profile) {
      try {
        this.profile$.next(JSON.parse(profile));
      } catch (err) {
        console.log(err);
      }
    }
  }

  private _setLoggedIn(value : boolean) {
    // Update login status subject
    this.loggedIn = value;
    this.loggedIn$.next(value);
  }

  login() {
    // Auth0 authorize request
    this._Auth0.authorize();
  }

  handleAuthResult(err, authResult) {
    if (authResult && authResult.accessToken) {
      window.location.hash = '';
      this._setLoggedIn(true);
      this.getUserInfo(authResult);
      this._setSession(authResult);
    } else if (err) {
      console.error(`Error: ${err.error}`);
    }
    this._setLoggedIn(this.authenticated);
  }

  handleLoginCallback() {
    // When Auth0 hash parsed, get profile
    this._Auth0.parseHash(this.handleAuthResult.bind(this));
  }

  getUserInfo(authResult) {
    // Use access token to retrieve user's profile and set session
    this._Auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (err) {
        console.error(`Error: ${err.error}`);
      } else if (profile) {
        localStorage.setItem("profile",JSON.stringify(profile));
        this.profile$.next(profile);
        return profile;
      }
    });
  }

  private _setSession(authResult) {
    // Save session data and update login status subject
    localStorage.setItem('expires_at', (authResult.expiresIn * 1000 + Date.now()).toString());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem("profile");
    this.profile$.next(null);
    this._setLoggedIn(false);
    this._Auth0.logout({returnTo: environment.auth0.home, clientID: environment.auth0.clientId});
  }

  get expiresAt() : number {
    return parseInt(localStorage.getItem('expires_at'), 10);
  }

  get idToken() : string {
    return localStorage.getItem('id_token');
  }

  get accessToken() : string {
    return localStorage.getItem('access_token');
  }

  get profile() {
    return this.profile$.getValue();
  }

  get authenticated() : boolean {
    // Check if current date is greater than expiration --???and user is currently
    // logged in???--
    const OK: boolean = (Date.now() < this.expiresAt); // && this.loggedIn;
    return OK;
  }

}
