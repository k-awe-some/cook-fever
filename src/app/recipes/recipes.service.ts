import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";

export class RecipesService {
  private recipes: Recipe[] = [
    new Recipe(
      "Tasty Schnitzel",
      "A super-tasty Schnitzel - just awesome!",
      "https://storage.needpix.com/rsynced_images/schnitzel-4081269_1280.jpg",
      [new Ingredient("Meat", 1), new Ingredient("French fries", 20)]
    ),

    new Recipe(
      "Big Fat Burger",
      "What else you need to say?",
      "https://live.staticflickr.com/7911/47515489631_7102800a75_b.jpg",
      [new Ingredient("Bun", 2), new Ingredient("Meat", 1)]
    ),
  ];

  getRecipes() {
    return this.recipes.slice(); // return a copy of recipes array
  }

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }
}
