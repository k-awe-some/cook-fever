import { ActionReducerMap } from "@ngrx/store";

import { IStore } from "./store.model";
import { AuthReducer } from "../auth/store/auth.reducer";
import { shoppingListReducer } from "../shopping-list/store/shopping-list.reducer";

export const appReducer: ActionReducerMap<IStore> = {
  authentication: AuthReducer,
  shoppingList: shoppingListReducer,
};
