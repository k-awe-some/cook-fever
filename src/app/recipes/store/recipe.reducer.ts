import * as StoreType from "../../store/store.model";
import * as RecipeActions from "../store/recipe.actions";

const INITIAL_STATE: StoreType.IRecipes = {
  recipes: [],
};

export const recipeReducer = (
  state = INITIAL_STATE,
  action: RecipeActions.RecipeActions
) => {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload],
      };

    default:
      return state;
  }
};
