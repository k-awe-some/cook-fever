/* Modules */
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { AppRoutingModule } from "./app.routing.module";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";

import { appReducer } from "./store/store.reducer";
import { AuthEffects } from "./auth/store/auth.effects";

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducer), // register reducers
    EffectsModule.forRoot([AuthEffects]), // register effects
    SharedModule,
    CoreModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
