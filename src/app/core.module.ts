import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { RecipesService } from "./recipes/recipes.service";

@NgModule({
  providers: [
    RecipesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ], // no need to export services
})
export class CoreModule {}
