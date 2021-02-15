import { ActionReducerMap } from "@ngrx/store";

import { IStore } from "./store.model";
import { authReducer } from "../auth/store/auth.reducer";
import { shoppingListReducer } from "../shopping-list/store/shopping-list.reducer";

export const appReducer: ActionReducerMap<IStore> = {
  authentication: authReducer,
  shoppingList: shoppingListReducer,
};
