import { Action } from "@ngrx/store";
import { User } from "../user.model";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SIGNUP = "SIGNUP";

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
