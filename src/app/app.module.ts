/* Modules */
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";

import { AppRoutingModule } from "./app.routing.module";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { shoppingListReducer } from "./shopping-list/store/shopping-list.reducer";

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    StoreModule.forRoot({ shoppingList: shoppingListReducer }), // register reducers
    AppRoutingModule,
    SharedModule,
    CoreModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
