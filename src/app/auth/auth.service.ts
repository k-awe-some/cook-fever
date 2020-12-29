import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { Subject, throwError } from "rxjs";

import { fireBaseConfig } from "../../../firebase.config";
import { User } from "./user.model";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  user = new Subject<User>();

  constructor(private http: HttpClient) {}

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage: string = "An unknown error occurred!";

    // handle network error
    if (!errorRes.error || !errorRes.error.error)
      return throwError(errorMessage);

    switch (errorRes.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "This email already exists.";
        break;

      case "EMAIL_NOT_FOUND":
        errorMessage = "This email does not exist.";
        break;

      case "INVALID_PASSWORD":
        errorMessage = "This password is incorrect.";
        break;

      default:
        break;
    }

    return throwError(errorMessage); // throw an observable that wraps the message
  }

  private handleAuth(resData) {
    const expirationDate = new Date(
      new Date().getTime() + +resData.expiresIn * 1000
    );
    const user = new User(
      resData.email,
      resData.localId,
      resData.idToken,
      expirationDate
    );

    this.user.next(user); // emit currently logged in user
  }

  // Firebase User Auth Reference:
  // https://firebase.google.com/docs/reference/rest/auth#section-create-email-password

  signUp(data: { email: string; password: string }) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${fireBaseConfig.apiKey}`,
        { ...data, returnSecureToken: true }
      )
      .pipe(
        catchError((errorRes) => this.handleError(errorRes)),
        tap((resData) => this.handleAuth(resData))
      );
  }

  logIn(data: { email: string; password: string }) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${fireBaseConfig.apiKey}`,
        { ...data, returnSecureToken: true }
      )
      .pipe(
        catchError((errorRes) => this.handleError(errorRes)),
        tap((resData) => this.handleAuth(resData))
      );
  }
}
