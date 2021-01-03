import { User } from "../user.model";
import * as StoreType from "../../store/store.model";
import * as AuthActions from "../../auth/store/auth.actions";

const INITIAL_STATE: StoreType.IAuth = {
  user: null,
  authError: null,
  loading: false,
};

export const AuthReducer = (
  state = INITIAL_STATE,
  action: AuthActions.AuthActions
) => {
  switch (action.type) {
    case AuthActions.LOGIN_START:
      return { ...state, authError: null, loading: true };

    case AuthActions.LOGIN:
      const user = new User(
        action.payload.email,
        action.payload.id,
        action.payload.token,
        action.payload.expirationDate
      );
      return { ...state, user, authError: null, loading: false };

    case AuthActions.LOGIN_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false,
      };

    case AuthActions.LOGOUT:
      return { ...state, user: null };

    case AuthActions.SIGNUP:
      return { ...state };

    // always return state by default as every
    // dispatched action will reach all reducers
    // regardless of what the action is
    default:
      return state;
  }
};
