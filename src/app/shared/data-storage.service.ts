import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs/operators";

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
    return this.http.get<Recipe[]>(`${this.firebaseAPI}/recipes.json`).pipe(
      map((res) => {
        return res.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((res) => {
        this.recipesService.setRecipes(res);
      })
    );
  }
}
