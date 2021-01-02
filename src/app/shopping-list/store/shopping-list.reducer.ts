import { Ingredient } from "../../shared/ingredient.model";
import * as shoppingListActions from "./shopping-list.actions";

const INITIAL_STATE = {
  ingredients: [new Ingredient("Apples", 5), new Ingredient("Tomatoes", 10)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export const shoppingListReducer = (
  state = INITIAL_STATE,
  action: shoppingListActions.ShoppingListActions
) => {
  switch (action.type) {
    case shoppingListActions.ADD_INGREDIENT:
      return { ...state, ingredients: [...state.ingredients, action.payload] };

    case shoppingListActions.UPDATE_INGREDIENT:
      // extract current ingredient at payload.index
      const currentIngredient = state.ingredients[action.payload.index];
      // create the updated ingredient object
      const updatedIngredient = {
        ...currentIngredient,
        ...action.payload.ingredient,
      };
      // make a copy of current state (ingredient array)
      const updatedIngredients = [...state.ingredients];
      // update such copy
      updatedIngredients[action.payload.index] = updatedIngredient;

      return { ...state, ingredients: updatedIngredients };

    case shoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ingredient, index) => index !== action.payload.index
        ),
      };

    case shoppingListActions.START_EDIT_INGREDIENT:
      return {
        ...state,
        editedIngredientIndex: action.payload.index,
        editedIngredient: { ...state.ingredients[action.payload.index] },
      };

    case shoppingListActions.STOP_EDIT_INGREDIENT:
      return { ...state, editedIngredient: null, editedIngredientIndex: -1 };

    default:
      return state;
  }
};
