import { Action } from "@ngrx/store";
import { User } from "../user.model";

export const LOGIN_START = "[Auth] LOGIN_START";
export const LOGIN = "[Auth] LOGIN";
export const LOGOUT = "[Auth] LOGOUT";
export const SIGNUP = "[Auth] SIGNUP";

export class LogInStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class LogIn implements Action {
  readonly type = LOGIN;
  constructor(public payload: User) {}
}

export class LogOut implements Action {
  readonly type = LOGOUT;
}

export class SignUp implements Action {
  readonly type = SIGNUP;
  constructor(public payload: { email: string; password: string }) {}
}

export type AuthActions = LogIn | LogOut | SignUp;
