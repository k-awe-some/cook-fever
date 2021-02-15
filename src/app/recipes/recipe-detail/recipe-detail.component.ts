import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { map } from "rxjs/operators";
import { Store } from "@ngrx/store";

import { IStore } from "src/app/store/store.model";
import { Recipe } from "../recipe.model";
import { RecipesService } from "../recipes.service";
import * as ShoppingListActions from "../../shopping-list/store/shopping-list.actions";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<IStore>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.store
        .select("recipes")
        .pipe(
          map((recipesState) => {
            return recipesState.recipes.find(
              (recipe, index) => index === this.id
            );
          })
        )
        .subscribe((recipe) => (this.recipe = recipe));
    });
  }

  onAddToShoppingList() {
    this.recipe.ingredients.forEach((ingredient) => {
      this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
    });
  }

  onEditRecipe() {
    this.router.navigate(["edit"], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipesService.deleteRecipe(this.id);
    this.router.navigate(["recipes"]);
  }
}
