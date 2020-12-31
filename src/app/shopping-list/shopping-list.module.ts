import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { SharedModule } from "../shared/shared.module";

const shoppingListRoutes: Routes = [
  { path: "", component: ShoppingListComponent },
];

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [
    RouterModule.forChild(shoppingListRoutes),
    SharedModule, // importing CommonModule
    FormsModule,
  ],
})
export class ShoppingListModule {}
