import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";

import { RecipesService } from "./../recipes.service";

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
              name: new FormControl(ingredient.name),
              amount: new FormControl(ingredient.amount),
            })
          );
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName),
      imagePath: new FormControl(recipeImagePath),
      description: new FormControl(recipeDescription),
      ingredients: recipeIngredients,
    });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get("ingredients")).push(
      new FormGroup({
        name: new FormControl(),
        amount: new FormControl(),
      })
    );
  }

  onSubmitForm() {
    console.log(this.recipeForm);
  }
}
