import { Ingredient } from "./ingredient.model";

export interface IStore {
  shoppingList: IShoppingList;
}

export interface IShoppingList {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}
