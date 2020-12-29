import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

import { fireBaseConfig } from "../../../firebase.config";

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

  // Firebase User Auth Reference:
  // https://firebase.google.com/docs/reference/rest/auth#section-create-email-password

  signUp(data: { email: string; password: string }) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${fireBaseConfig.apiKey}`,
        { ...data, returnSecureToken: true }
      )
      .pipe(catchError((errorRes) => this.handleError(errorRes)));
  }

  logIn(data: { email: string; password: string }) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${fireBaseConfig.apiKey}`,
        { ...data, returnSecureToken: true }
      )
      .pipe(catchError((errorRes) => this.handleError(errorRes)));
  }
}
