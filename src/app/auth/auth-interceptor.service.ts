import { Injectable } from "@angular/core";
import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from "@angular/common/http";
import { exhaustMap, map, take } from "rxjs/operators";
import { Store } from "@ngrx/store";

import * as StoreType from "../store/store.model";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private store: Store<StoreType.IStore>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select("authentication").pipe(
      // take value from user observable (1 time only, then auto unsubscribe())
      take(1),
      map((authState) => authState.user),
      // replace it with handle observable
      // modify request to attach token
      // and return this handle observable
      exhaustMap((user) => {
        // only attach token if user is currently logged in
        return !user
          ? next.handle(req)
          : next.handle(
              req.clone({
                params: new HttpParams().set("auth", user.token),
              })
            );
      })
    );
  }
}
