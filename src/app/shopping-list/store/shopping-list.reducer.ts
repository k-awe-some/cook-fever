import { Ingredient } from "../../shared/ingredient.model";

import * as ShoppingListActions from "./shopping-list.actions";
import * as StoreType from "../../store/store.model";

const INITIAL_STATE: StoreType.IShoppingList = {
  ingredients: [new Ingredient("Apples", 5), new Ingredient("Tomatoes", 10)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

// data in, new data out
export const shoppingListReducer = (
  state = INITIAL_STATE,
  action: ShoppingListActions.ShoppingListActions
) => {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return { ...state, ingredients: [...state.ingredients, action.payload] };

    case ShoppingListActions.UPDATE_INGREDIENT:
      // extract current ingredient at payload.index
      const currentIngredient = state.ingredients[state.editedIngredientIndex];
      // create the updated ingredient object
      const updatedIngredient = {
        ...currentIngredient,
        ...action.payload,
      };
      // make a copy of current state (ingredient array)
      const updatedIngredients = [...state.ingredients];
      // update such copy
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null,
      };

    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ingredient, index) => index !== state.editedIngredientIndex
        ),
        editedIngredientIndex: -1,
        editedIngredient: null,
      };

    case ShoppingListActions.START_EDIT_INGREDIENT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.ingredients[action.payload] },
      };

    case ShoppingListActions.STOP_EDIT_INGREDIENT:
      return { ...state, editedIngredient: null, editedIngredientIndex: -1 };

    default:
      return state;
  }
};
