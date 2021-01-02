import { Action } from "@ngrx/store";

export const LOG_IN = "LOG_IN";
export const SIGN_UP = "SIGN_UP";

export class LogIn implements Action {
  readonly type = LOG_IN;
  constructor(public payload: { email: string; password: string }) {}
}

export class SignUp implements Action {
  readonly type = LOG_IN;
  constructor(public payload: { email: string; password: string }) {}
}
