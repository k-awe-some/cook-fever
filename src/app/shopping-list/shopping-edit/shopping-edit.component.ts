import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import { IStore } from "src/app/store/store.model";
import { Ingredient } from "src/app/shared/ingredient.model";
import * as ShoppingListActions from "../store/shopping-list.actions";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild("shoppingListForm", { static: false }) shoppingListForm: NgForm;

  editSubscription: Subscription;
  editMode: boolean = false;
  editedItem: Ingredient;

  constructor(private store: Store<IStore>) {}

  ngOnInit() {
    this.editSubscription = this.store
      .select("shoppingList")
      .subscribe((shoppingList) => {
        if (shoppingList.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = shoppingList.editedIngredient;
          this.shoppingListForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
          });
        } else {
          this.editMode = false;
        }
      });
  }

  ngOnDestroy() {
    this.editSubscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEditIngredient());
  }

  onSubmitForm(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    this.editMode
      ? this.store.dispatch(
          new ShoppingListActions.UpdateIngredient(newIngredient)
        )
      : this.store.dispatch(
          new ShoppingListActions.AddIngredient(newIngredient)
        );

    this.onClearForm();
  }

  onClearForm() {
    this.editMode = false;
    this.shoppingListForm.reset();
    this.store.dispatch(new ShoppingListActions.StopEditIngredient());
  }

  onDeleteItem() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClearForm();
  }
}
