import { Ingredient } from "./ingredient.model";
import { User } from "../auth/user.model";

export interface IStore {
  auth: IAuth;
  shoppingList: IShoppingList;
}

export interface IShoppingList {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

export interface IAuth {
  user: User;
}
