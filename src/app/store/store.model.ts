import { Ingredient } from "../shared/ingredient.model";
import { User } from "../auth/user.model";
import { Recipe } from "../recipes/recipe.model";

export interface IStore {
  authentication: IAuth;
  shoppingList: IShoppingList;
  recipes: IRecipes;
}

export interface IShoppingList {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

export interface IAuth {
  user: User;
  authError: string;
  loading: boolean;
}

export interface IRecipes {
  recipes: Recipe[];
}
