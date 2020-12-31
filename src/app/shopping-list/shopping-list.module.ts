import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { RouterModule, Routes } from "@angular/router";

const shoppingListRoutes: Routes = [
  { path: "shopping-list", component: ShoppingListComponent },
];

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [
    RouterModule.forChild(shoppingListRoutes),
    CommonModule,
    FormsModule,
  ],
})
export class ShoppingListModule {}
