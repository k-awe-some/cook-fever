import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Store } from "@ngrx/store";

import * as AppState from "../shared/store.model";
import * as shoppingListActions from "../shopping-list/store/shopping-list.actions";
// import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  // ingredients: Ingredient[];
  ingredients: Observable<AppState.IShoppingList>;
  // private ingredientsSub: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<AppState.IStore>
  ) {}

  ngOnInit() {
    // select a slice of the state
    this.ingredients = this.store.select("shoppingList");
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.ingredientsSub = this.shoppingListService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => (this.ingredients = ingredients)
    // );
  }

  ngOnDestroy() {
    // this.ingredientsSub.unsubscribe();
  }

  onEditItem(index: number) {
    // this.shoppingListService.editingStarted.next(index);
    this.store.dispatch(new shoppingListActions.StartEditIngredient({ index }));
  }
}
