import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";

import * as AppState from "../shared/store.model";
import * as ShoppingListActions from "../shopping-list/store/shopping-list.actions";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<AppState.IShoppingList>;

  constructor(private store: Store<AppState.IStore>) {}

  ngOnInit() {
    // select a slice of the state
    this.ingredients = this.store.select("shoppingList");
  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEditIngredient(index));
  }
}
