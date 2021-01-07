import { Injectable } from "@angular/core";
// import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
// import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, throwError } from "rxjs";
import { Store } from "@ngrx/store";

// import { environment } from "../../environments/environment";
import { User } from "./user.model";
import * as StoreType from "../store/store.model";
import * as AuthActions from "../auth/store/auth.actions";

// export interface AuthResponseData {
//   idToken: string;
//   email: string;
//   refreshToken: string;
//   expiresIn: string;
//   localId: string;
//   registered?: boolean;
// }

@Injectable({ providedIn: "root" })
export class AuthService {
  // BehaviorSubject gives subscribers immediate access
  // to the previously emitted value even if they haven't
  // subscribed at the point of time that value was emitted
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any = null;

  constructor(
    // private http: HttpClient,
    // private router: Router,
    private store: Store<StoreType.IStore>
  ) {}

  // private handleError(errorRes: HttpErrorResponse) {
  //   let errorMessage: string = "An unknown error occurred!";

  //   // handle network error
  //   if (!errorRes.error || !errorRes.error.error)
  //     return throwError(errorMessage);

  //   switch (errorRes.error.error.message) {
  //     case "EMAIL_EXISTS":
  //       errorMessage = "This email already exists.";
  //       break;

  //     case "EMAIL_NOT_FOUND":
  //       errorMessage = "This email does not exist.";
  //       break;

  //     case "INVALID_PASSWORD":
  //       errorMessage = "This password is incorrect.";
  //       break;

  //     default:
  //       break;
  //   }

  //   return throwError(errorMessage); // throw an observable that wraps the message
  // }

  // private handleAuth(resData) {
  //   const expirationDate = new Date(
  //     new Date().getTime() + +resData.expiresIn * 1000
  //   );
  //   const user = new User(
  //     resData.email,
  //     resData.localId,
  //     resData.idToken,
  //     expirationDate
  //   );

  //   // this.user.next(user); // emit currently logged in user
  //   this.store.dispatch(new AuthActions.AuthenticateSuccess(user));
  //   this.autoLogOut(resData.expiresIn * 1000);
  //   localStorage.setItem("userData", JSON.stringify(user));
  // }

  // Firebase User Auth Reference:
  // https://firebase.google.com/docs/reference/rest/auth#section-create-email-password

  // signUp(data: { email: string; password: string }) {
  //   return this.http
  //     .post<AuthResponseData>(
  //       `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
  //       { ...data, returnSecureToken: true }
  //     )
  //     .pipe(
  //       catchError((errorRes) => this.handleError(errorRes)),
  //       tap((resData) => this.handleAuth(resData))
  //     );
  // }

  // logIn(data: { email: string; password: string }) {
  //   return this.http
  //     .post<AuthResponseData>(
  //       `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
  //       { ...data, returnSecureToken: true }
  //     )
  //     .pipe(
  //       catchError((errorRes) => this.handleError(errorRes)),
  //       tap((resData) => this.handleAuth(resData))
  //     );
  // }

  // autoLogIn() {
  //   const userData: {
  //     email: string;
  //     id: string;
  //     _token: string;
  //     _tokenExpirationDate: string;
  //   } = JSON.parse(localStorage.getItem("userData"));

  //   if (!userData) return;

  //   const loadedUser = new User(
  //     userData.email,
  //     userData.id,
  //     userData._token,
  //     new Date(userData._tokenExpirationDate)
  //   );

  //   if (loadedUser.token) {
  //     // this.user.next(loadedUser);
  //     this.store.dispatch(new AuthActions.AuthenticateSuccess(loadedUser));

  //     // getTime(): returns time in milliseconds
  //     const remainingAuthDuration =
  //       new Date(userData._tokenExpirationDate).getTime() -
  //       new Date().getTime();
  //     this.autoLogOut(remainingAuthDuration);
  //   }
  // }

  // logOut() {
  //   // this.user.next(null);
  //   this.store.dispatch(new AuthActions.LogOut());
  //   this.router.navigate(["/auth"]);
  //   localStorage.removeItem("userData");
  //   if (this.tokenExpirationTimer) {
  //     clearTimeout(this.tokenExpirationTimer);
  //     this.tokenExpirationTimer = null;
  //   }
  // }

  setLogOutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(
      () => this.store.dispatch(new AuthActions.LogOut()),
      expirationDuration
    );
  }

  clearLogOutTimer() {
    if (this.tokenExpirationTimer) clearTimeout(this.tokenExpirationTimer);
    this.tokenExpirationTimer = null;
  }
}
