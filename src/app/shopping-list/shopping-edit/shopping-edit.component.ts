import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import { IStore } from "src/app/shared/store.model";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";
import * as shoppingListActions from "../store/shopping-list.actions";
import { shoppingListReducer } from "../store/shopping-list.reducer";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild("shoppingListForm", { static: false }) shoppingListForm: NgForm;

  editSubscription: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<IStore>
  ) {}

  ngOnInit() {
    this.editSubscription = this.store
      .select("shoppingList")
      .subscribe((shoppingList) => {
        if (shoppingList.editedIngredientIndex > -1) {
          this.editedItemIndex = shoppingList.editedIngredientIndex;
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
    // this.editSubscription = this.shoppingListService.editingStarted.subscribe(
    //   (index: number) => {
    //     this.editedItemIndex = index;
    //     this.editMode = true;
    //     this.store
    //       .select("shoppingList")
    //       .subscribe(
    //         (shoppingList) =>
    //           (this.editedItem = shoppingList.ingredients[this.editedItemIndex])
    //       );
    //     this.shoppingListForm.setValue({
    //       name: this.editedItem.name,
    //       amount: this.editedItem.amount,
    //     });
    //   }
    // );
  }

  ngOnDestroy() {
    this.editSubscription.unsubscribe();
    this.store.dispatch(new shoppingListActions.StopEditIngredient());
  }

  onSubmitForm(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    this.editMode
      ? this.store.dispatch(
          new shoppingListActions.UpdateIngredient({
            index: this.editedItemIndex,
            ingredient: newIngredient,
          })
        )
      : this.store.dispatch(
          new shoppingListActions.AddIngredient(newIngredient)
        );
    // ? this.shoppingListService.updateIngredient(
    //   this.editedItemIndex,
    //   newIngredient
    // )
    // : this.shoppingListService.addIngredient(newIngredient);

    this.onClearForm();
  }

  onClearForm() {
    this.editMode = false;
    this.shoppingListForm.reset();
    this.store.dispatch(new shoppingListActions.StopEditIngredient());
  }

  onDeleteItem() {
    // this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(
      new shoppingListActions.DeleteIngredient({ index: this.editedItemIndex })
    );
    this.onClearForm();
  }
}
