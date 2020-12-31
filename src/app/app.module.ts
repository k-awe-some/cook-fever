/* Modules */
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app.routing.module";
import { RecipesModule } from "./recipes/recipes.module";
import { ShoppingListModule } from "./shopping-list/shopping-list.module";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core.module";

/* Components */
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { AlertComponent } from "./shared/alert/alert.component";
import { AuthModule } from "./auth/auth.module";

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    RecipesModule,
    ShoppingListModule,
    SharedModule,
    CoreModule,
  ],
  bootstrap: [AppComponent],
  // specify component(s) that will eventually need to be
  // created without a selector or a route config (Angular 8)
  entryComponents: [AlertComponent],
})
export class AppModule {}
