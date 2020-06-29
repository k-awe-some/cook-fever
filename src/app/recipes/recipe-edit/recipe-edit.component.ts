import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";

import { RecipesService } from "./../recipes.service";
import { Recipe } from "../recipe.model";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] ? true : false;
      this.initForm();
    });
  }

  get controls() {
    return (<FormArray>this.recipeForm.get("ingredients")).controls;
  }

  private initForm() {
    let recipeName = "";
    let recipeImagePath = "";
    let recipeDescription = "";
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const currentRecipe = this.recipesService.getRecipe(this.id);
      recipeName = currentRecipe.name;
      recipeImagePath = currentRecipe.imagePath;
      recipeDescription = currentRecipe.description;
      if (currentRecipe["ingredients"]) {
        for (let ingredient of currentRecipe.ingredients)
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get("ingredients")).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onSubmitForm() {
    this.editMode
      ? this.recipesService.updateRecipe(this.id, this.recipeForm.value)
      : this.recipesService.addRecipe(this.recipeForm.value);
  }
}
