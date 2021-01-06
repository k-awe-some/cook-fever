import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, tap } from "rxjs/operators";

import * as AuthActions from "../../auth/store/auth.actions";
import { environment } from "src/environments/environment";
import { User } from "../user.model";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuth = (dataRes) => {
  const expirationDate = new Date(
    new Date().getTime() + +dataRes.expiresIn * 1000
  );
  const user = new User(
    dataRes.email,
    dataRes.localId,
    dataRes.idToken,
    expirationDate
  );
  // return the observable that holds data ready for LOGIN action
  // which will auto get dispatched by @Effect()
  return new AuthActions.AuthenticateSuccess(user);
};

const handleError = (errorRes) => {
  let errorMessage: string = "An unknown error occurred!";

  // handle network error
  if (!errorRes.error || !errorRes.error.error)
    return of(new AuthActions.AuthenticateFail(errorMessage));

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
  // must return a non-error observable wrapped in of()
  // so that the overall stream doesn't die
  return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable() // so things can be injected into AuthEffects
export class AuthEffects {
  // an Effect is an action handler that will subscribe to the action behind the scenes
  @Effect() authLogInHandler = this.actions$.pipe(
    // ofType() filters which types of action to be continued in this observable pipe
    // only continue if action is of type LOGIN_START action
    ofType(AuthActions.LOGIN_START),
    // create a new observable by taking another observable 's data
    switchMap((authData: AuthActions.LogInStart) => {
      // return a new (http) observable which will then
      // have to return a non-error observable which is
      // picked up by switchMap() eventually
      return this.http
        .post<AuthResponseData>(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
          { ...authData.payload, returnSecureToken: true }
        )
        .pipe(
          map((dataRes) => handleAuth(dataRes)),
          // error has to be caught in the http observable pipe
          catchError((errorRes) => handleError(errorRes))
        );
    })
  );

  @Effect() authSignUpHandler = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signUpAction: AuthActions.SignUpStart) => {
      return this.http
        .post<AuthResponseData>(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
          { ...signUpAction.payload, returnSecureToken: true }
        )
        .pipe(
          map((dataRes) => handleAuth(dataRes)),
          catchError((errorRes) => handleError(errorRes))
        );
    })
  );

  // this effect should not yield a dispatched action at the end
  @Effect({ dispatch: false }) authSuccessHandler = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS), // filter successful login
    tap(() => {
      this.router.navigate(["/"]);
    })
  );

  constructor(
    private http: HttpClient,
    private router: Router,
    private actions$: Actions // one big observable that gives access to all dispatched actions and execute code without changing the state
  ) {}
}
