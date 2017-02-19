var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RecipeService } from '../recipe.service';
var RecipeEditComponent = (function () {
    function RecipeEditComponent(activatedRoute, recipeService, formBuilder, router) {
        this.activatedRoute = activatedRoute;
        this.recipeService = recipeService;
        this.formBuilder = formBuilder;
        this.router = router;
        this.isNew = true;
    }
    RecipeEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.activatedRoute.params.subscribe(function (params) {
            if (params.hasOwnProperty('id')) {
                _this.isNew = false;
                _this.recipeIndex = +params['id'];
                _this.currentWorkingRecipe = _this.recipeService.getRecipeByIndex(_this.recipeIndex);
            }
            else {
                _this.isNew = true;
                _this.currentWorkingRecipe = null;
            }
            console.log("FORM INIT");
            _this.initForm();
            console.log("DONE");
        });
    };
    RecipeEditComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    RecipeEditComponent.prototype.recipeFormSubmit = function () {
        var newRecipe = this.recipeForm.value;
        if (this.isNew) {
            this.recipeService.addRecipe(newRecipe);
        }
        else {
            this.recipeService.editRecipe(this.currentWorkingRecipe, newRecipe);
        }
        this.navigateBack();
    };
    RecipeEditComponent.prototype.navigateBack = function () {
        this.router.navigate(['../']);
    };
    RecipeEditComponent.prototype.initForm = function () {
        var recipeName = "";
        var recipeImageURL = "";
        var recipeContent = "";
        var recipeIngredients = new FormArray([]);
        if (!this.isNew) {
            for (var i = 0; i < this.currentWorkingRecipe.ingredients.length; i++) {
                recipeIngredients.push(new FormGroup({
                    name: new FormControl(this.currentWorkingRecipe.ingredients[i].name, Validators.required),
                    amount: new FormControl(this.currentWorkingRecipe.ingredients[i].amount, [Validators.required])
                }));
            }
            recipeName = this.currentWorkingRecipe.name;
            recipeImageURL = this.currentWorkingRecipe.imagePath;
            recipeContent = this.currentWorkingRecipe.description;
        }
        else {
        }
        this.recipeForm = this.formBuilder.group({
            'name': [recipeName, Validators.required],
            'imagePath': [recipeImageURL, Validators.required],
            'description': [recipeContent, Validators.required],
            'ingredients': recipeIngredients
        });
    };
    RecipeEditComponent.prototype.addIngredient = function (name, amount) {
        this.recipeForm.controls['ingredients'].push(new FormGroup({
            name: new FormControl(name, Validators.required),
            amount: new FormControl(amount, [Validators.required])
        }));
    };
    RecipeEditComponent.prototype.removeIngredient = function (index) {
        this.recipeForm.controls['ingredients'].removeAt(index);
    };
    return RecipeEditComponent;
}());
RecipeEditComponent = __decorate([
    Component({
        selector: 'rb-recipe-edit',
        templateUrl: './recipe-edit.component.html',
        styleUrls: ['./recipe-edit.component.css']
    }),
    __metadata("design:paramtypes", [ActivatedRoute, RecipeService, FormBuilder, Router])
], RecipeEditComponent);
export { RecipeEditComponent };
//# sourceMappingURL=../../../../../src/app/recipes/recipe-edit/recipe-edit.component.js.map