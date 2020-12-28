import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

import { fireBaseConfig } from "../../../firebase.config";

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(private http: HttpClient) {}

  // Firebase User Auth Reference:
  // https://firebase.google.com/docs/reference/rest/auth#section-create-email-password

  signUp(data: { email: string; password: string }) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${fireBaseConfig.apiKey}`,
        { ...data, returnSecureToken: true }
      )
      .pipe(
        catchError((errorRes) => {
          let errorMessage: string = "An unknown error occurred!";

          // handle network error
          if (!errorRes.error || !errorRes.error.error)
            return throwError(errorMessage);

          switch (errorRes.error.error.message) {
            case "EMAIL_EXISTS":
              errorMessage = "This email already exists.";
              break;

            default:
              break;
          }

          return throwError(errorMessage); // throw an observable that wraps the message
        })
      );
  }
}
