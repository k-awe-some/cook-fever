import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";

import * as StoreType from "../store/store.model";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store<StoreType.IStore>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): boolean | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this.store.select("authentication").pipe(
      take(1),
      map((authState) => {
        const isAuth = !!authState.user;
        // return isAuth; // return a boolean
        return isAuth ? true : this.router.createUrlTree(["/auth"]); // return a UrlTree
      })
    );
  }
}
