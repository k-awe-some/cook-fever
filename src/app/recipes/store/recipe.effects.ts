import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs/operators";

import * as RecipeActions from "./recipe.actions";
import { Recipe } from "../recipe.model";

@Injectable()
export class RecipeEffects {
  @Effect() fetchRecipes = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(`${this.firebaseAPI}/recipes.json`);
    }),
    // rxjs map(): manipulate input observable and/or
    // return a new (manipulated) observable
    map((res) => {
      // js map() function
      return res
        ? res.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          })
        : [];
    }),
    map((recipes) => {
      return new RecipeActions.SetRecipes(recipes);
    })
  );

  firebaseAPI: string = "https://cookfever-cca20-default-rtdb.firebaseio.com/";

  constructor(private actions$: Actions, private http: HttpClient) {}
}
