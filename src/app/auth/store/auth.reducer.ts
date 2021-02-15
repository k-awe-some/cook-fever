import { User } from "../user.model";
import * as StoreType from "../../store/store.model";
import * as AuthActions from "../../auth/store/auth.actions";

const INITIAL_STATE: StoreType.IAuth = {
  user: null,
  authError: null,
  loading: false,
};

export const authReducer = (
  state = INITIAL_STATE,
  action: AuthActions.AuthActions
) => {
  switch (action.type) {
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return { ...state, authError: null, loading: true };

    case AuthActions.AUTHENTICATE_SUCCESS:
      const user = new User(
        action.payload.email,
        action.payload.id,
        action.payload.token,
        action.payload.expirationDate
      );
      return { ...state, user, authError: null, loading: false };

    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false,
      };

    case AuthActions.LOGOUT:
      return { ...state, user: null };

    // always return state by default as every
    // dispatched action will reach all reducers
    // regardless of what the action is
    default:
      return state;
  }
};
