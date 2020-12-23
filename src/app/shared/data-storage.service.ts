import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { RecipesService } from "../recipes/recipes.service";
import { Recipe } from "../recipes/recipe.model";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  firebaseAPI: string = "https://cookfever-cca20-default-rtdb.firebaseio.com/";

  constructor(
    private http: HttpClient,
    private recipesService: RecipesService
  ) {}

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.http
      .put(`${this.firebaseAPI}/recipes.json`, recipes)
      .subscribe((res) => console.log(res));
  }

  fetchRecipes() {
    this.http
      .get<Recipe[]>(`${this.firebaseAPI}/recipes.json`)
      .subscribe((res) => this.recipesService.setRecipes(res));
  }
}
