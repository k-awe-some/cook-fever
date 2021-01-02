import { User } from "../user.model";
import * as StoreType from "../../store/store.model";
import * as AuthActions from "../../auth/store/auth.actions";

const INITIAL_STATE: StoreType.IAuth = {
  user: null,
};

export const AuthReducer = (
  state = INITIAL_STATE,
  action: AuthActions.AuthActions
) => {
  switch (action.type) {
    case AuthActions.LOGIN:
      const user = new User(
        action.payload.email,
        action.payload.id,
        action.payload.token,
        action.payload.expirationDate
      );
      return { ...state, user };

    case AuthActions.LOGOUT:
      return { ...state, user: null };

    case AuthActions.SIGNUP:
      return { ...state };

    default:
      return state;
  }
};
