import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const appRoutes: Routes = [
  { path: "", redirectTo: "/recipes", pathMatch: "full" },
  {
    path: "recipes",
    // code-splitting/lazy-loading practice:
    // everything in RecipesModule will be put in a detached code bundle
    // which is then downloaded and parsed as soon as user visits this path
    loadChildren: () =>
      import("./recipes/recipes.module").then((module) => module.RecipesModule),
    // loadChildren: "./recipes/recipes.module#RecipesModule", // for older versions of Angular
  },
  {
    path: "shopping-list",
    loadChildren: () =>
      import("./shopping-list/shopping-list.module").then(
        (module) => module.ShoppingListModule
      ),
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./auth/auth.module").then((module) => module.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule], // so configured RouterModule will ship with AppRoutingModule
})
export class AppRoutingModule {}
