import * as StoreType from "../../shared/store.model";

const INITIAL_STATE: StoreType.IAuth = {
  user: null,
};

export const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOG_IN":
      return { ...state };

    case "SIGN_UP":
      return { ...state };

    default:
      return state;
  }
};
