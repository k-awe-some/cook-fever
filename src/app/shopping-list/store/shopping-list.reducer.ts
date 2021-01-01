import { Ingredient } from "../../shared/ingredient.model";
import * as shoppingListActions from "./shopping-list.actions";

const INITIAL_STATE = {
  ingredients: [new Ingredient("Apples", 5), new Ingredient("Tomatoes", 10)],
};

export const shoppingListReducer = (
  state = INITIAL_STATE,
  action: shoppingListActions.AddIngredient
) => {
  switch (action.type) {
    case shoppingListActions.ADD_INGREDIENT:
      return { ...state, ingredients: [...state.ingredients, action.payload] };

    default:
      return state;
  }
};
