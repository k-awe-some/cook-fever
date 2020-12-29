import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { exhaustMap, map, take, tap } from "rxjs/operators";

import { RecipesService } from "../recipes/recipes.service";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  firebaseAPI: string = "https://cookfever-cca20-default-rtdb.firebaseio.com/";

  constructor(
    private http: HttpClient,
    private recipesService: RecipesService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.http
      .put(`${this.firebaseAPI}/recipes.json`, recipes)
      .subscribe((res) => console.log(res));
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(`${this.firebaseAPI}/recipes.json`).pipe(
      // rxjs map(): manipulate input observable and/or
      // return a new (manipulated) observable
      map((res) => {
        // js map() function
        return res.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      // rxjs tap(): perform some action on input observable
      tap((res) => {
        this.recipesService.setRecipes(res);
      })
    );
  }
}
