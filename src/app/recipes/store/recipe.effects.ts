import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { Store } from "@ngrx/store";

import * as StoreType from "../../store/store.model";
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

  @Effect({ dispatch: false }) storeRecipes = this.actions$.pipe(
    ofType(RecipeActions.STORE_RECIPES),
    // withLatestFrom(): merge value from another obs into this obs
    withLatestFrom(this.store.select("recipes")),
    switchMap(([actionData, recipesState]) => {
      return this.http.put(
        `${this.firebaseAPI}/recipes.json`,
        recipesState.recipes
      );
    })
  );

  firebaseAPI: string = "https://cookfever-cca20-default-rtdb.firebaseio.com/";

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<StoreType.IStore>
  ) {}
}
