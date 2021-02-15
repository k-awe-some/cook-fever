import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { Store } from "@ngrx/store";

import * as StoreType from "../store/store.model";
import * as AuthActions from "../auth/store/auth.actions";
import * as RecipeActions from "../recipes/store/recipe.actions";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  private userSubscription: Subscription = null;

  constructor(private store: Store<StoreType.IStore>) {}

  ngOnInit() {
    this.userSubscription = this.store
      .select("authentication")
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        console.log(user);
        this.isAuthenticated = !!user;
      });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onSaveData() {
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetchData() {
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogOut() {
    this.store.dispatch(new AuthActions.LogOut());
  }
}
