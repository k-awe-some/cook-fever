import { Recipe } from "./recipe.model";

export class RecipesService {
  private recipes: Recipe[] = [
    new Recipe(
      "Test Recipe 1",
      "This is Test Recipe 1.",
      "https://assets.bonappetit.com/photos/5d7296eec4af4d0008ad1263/master/pass/Basically-Gojuchang-Chicken-Recipe-Wide.jpg"
    ),

    new Recipe(
      "Test Recipe 2",
      "This is Test Recipe 2.",
      "https://assets.bonappetit.com/photos/5d7296eec4af4d0008ad1263/master/pass/Basically-Gojuchang-Chicken-Recipe-Wide.jpg"
    )
  ];

  getRecipes() {
    return this.recipes.slice(); // return a copy of recipes array
  }
}
