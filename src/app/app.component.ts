import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

import { AuthService } from "./auth/auth.service";
import * as StoreType from "./store/store.model";
import * as AuthActions from "./auth/store/auth.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private store: Store<StoreType.IStore>
  ) {}

  ngOnInit() {
    this.store.dispatch(new AuthActions.AutoLogIn());
  }
}
