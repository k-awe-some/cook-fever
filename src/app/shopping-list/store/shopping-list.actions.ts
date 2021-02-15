import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

// action identifiers
export const ADD_INGREDIENT = "[Shopping List] ADD_INGREDIENT";
export const UPDATE_INGREDIENT = "[Shopping List] UPDATE_INGREDIENT";
export const DELETE_INGREDIENT = "[Shopping List] DELETE_INGREDIENT";
export const START_EDIT_INGREDIENT = "[Shopping List] START_EDIT_INGREDIENT";
export const STOP_EDIT_INGREDIENT = "[Shopping List] STOP_EDIT_INGREDIENT";

// action (class) objects
export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  // payload: Ingredient;
  constructor(public payload: Ingredient) {}
}

export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
}

export class StartEditIngredient implements Action {
  readonly type = START_EDIT_INGREDIENT;
  constructor(public payload: number) {}
}

export class StopEditIngredient implements Action {
  readonly type = STOP_EDIT_INGREDIENT;
}

export type ShoppingListActions =
  | AddIngredient
  | UpdateIngredient
  | DeleteIngredient
  | StartEditIngredient
  | StopEditIngredient;
