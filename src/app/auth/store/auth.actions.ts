import { Action } from "@ngrx/store";
import { User } from "../user.model";

export const AUTO_LOGIN = "[Auth] AUTO_LOGIN";
export const LOGIN_START = "[Auth] LOGIN_START";
export const AUTHENTICATE_SUCCESS = "[Auth] AUTHENTICATE_SUCCESS";
export const AUTHENTICATE_FAIL = "[Auth] AUTHENTICATE_FAIL";
export const LOGOUT = "[Auth] LOGOUT";
export const SIGNUP_START = "[Auth] SIGNUP_START";
// export const SIGNUP = "[Auth] SIGNUP";

export class AutoLogIn implements Action {
  readonly type = AUTO_LOGIN;
}

export class LogInStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;
  constructor(public payload: User) {}
}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;
  constructor(public payload: string) {}
}

export class LogOut implements Action {
  readonly type = LOGOUT;
}

export class SignUpStart implements Action {
  readonly type = SIGNUP_START;
  constructor(public payload: { email: string; password: string }) {}
}

export type AuthActions =
  | AutoLogIn
  | LogInStart
  | AuthenticateSuccess
  | AuthenticateFail
  | LogOut
  | SignUpStart;
