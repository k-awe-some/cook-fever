import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs/operators";

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

@Injectable()
export class AuthEffects {
  @Effect() authLogInHandler = this.actions$.pipe(
    // only continue if action is of type LOGIN_START
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LogInStart) => {
      return this.http
        .post<AuthResponseData>(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
          { ...authData.payload, returnSecureToken: true }
        )
        .pipe(
          map((dataRes) => {
            const expirationDate = new Date(
              new Date().getTime() + +dataRes.expiresIn * 1000
            );
            const user = new User(
              dataRes.email,
              dataRes.localId,
              dataRes.idToken,
              expirationDate
            );
            // the returned observable auto gets dispatched by @Effect()
            return of(new AuthActions.LogIn(user));
          }),
          catchError((errorRes) => {
            // must return a non-error observable
            // so that the overall stream doesn't die
            return of();
          })
        );
    })
  );

  constructor(private http: HttpClient, private actions$: Actions) {}
}
