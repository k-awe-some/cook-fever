import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import * as StoreType from "../store/store.model";
import * as AuthActions from "../auth/store/auth.actions";

@Injectable({ providedIn: "root" })
export class AuthService {
  private tokenExpirationTimer: any = null;

  constructor(private store: Store<StoreType.IStore>) {}

  setLogOutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(
      () => this.store.dispatch(new AuthActions.LogOut()),
      expirationDuration
    );
  }

  clearLogOutTimer() {
    if (this.tokenExpirationTimer) clearTimeout(this.tokenExpirationTimer);
    this.tokenExpirationTimer = null;
  }
}
