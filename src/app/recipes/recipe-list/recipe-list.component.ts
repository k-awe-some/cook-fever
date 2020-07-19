import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { Recipe } from "../recipe.model";
import { RecipesService } from "../recipes.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipesSubscription: Subscription;

  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.recipesSubscription = this.recipesService.recipesChanged.subscribe(
      (recipes: Recipe[]) => (this.recipes = recipes)
    );
    this.recipes = this.recipesService.getRecipes();
  }

  ngOnDestroy() {
    this.recipesSubscription.unsubscribe();
  }

  onAddNewRecipe() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }
}
