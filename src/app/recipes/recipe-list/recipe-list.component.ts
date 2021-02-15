import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { Store } from "@ngrx/store";

import { Recipe } from "../recipe.model";
import { Router, ActivatedRoute } from "@angular/router";
import * as StoreType from "../../store/store.model";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipesSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<StoreType.IStore>
  ) {}

  ngOnInit() {
    this.recipesSubscription = this.store
      .select("recipes")
      .pipe(map((recipesState) => recipesState.recipes))
      .subscribe((recipes: Recipe[]) => (this.recipes = recipes));
  }

  ngOnDestroy() {
    this.recipesSubscription.unsubscribe();
  }

  onAddNewRecipe() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }
}
