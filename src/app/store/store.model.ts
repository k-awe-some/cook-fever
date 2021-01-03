import { Ingredient } from "../shared/ingredient.model";
import { User } from "../auth/user.model";

export interface IStore {
  authentication: IAuth;
  shoppingList: IShoppingList;
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
