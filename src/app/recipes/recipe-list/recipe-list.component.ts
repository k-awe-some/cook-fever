import { Component, OnInit } from "@angular/core";

import { Recipe } from "../recipe.model";
import { RecipesService } from "../recipes.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.recipes = this.recipesService.getRecipes();
  }

  onAddNewRecipe() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }
}
