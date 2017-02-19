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
import { RecipeService } from '../recipe.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
var RecipeDetailComponent = (function () {
    function RecipeDetailComponent(shoppingListService, activatedRoute, recipeService, router) {
        this.shoppingListService = shoppingListService;
        this.activatedRoute = activatedRoute;
        this.recipeService = recipeService;
        this.router = router;
    }
    RecipeDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscribe = this.activatedRoute.params.subscribe(function (params) {
            _this.recipeIndex = params['id'];
            _this.detailsForSelectedRecipe = _this.recipeService.getRecipeByIndex(_this.recipeIndex);
        });
    };
    RecipeDetailComponent.prototype.ngOnDestroy = function () {
        this.subscribe.unsubscribe();
    };
    RecipeDetailComponent.prototype.onAddToShoppingList = function () {
        this.shoppingListService.addItems(this.detailsForSelectedRecipe.ingredients);
    };
    RecipeDetailComponent.prototype.editRecipe = function () {
        this.router.navigate(['/recipes', this.recipeIndex, 'edit']);
    };
    RecipeDetailComponent.prototype.deleteRecipe = function () {
        this.recipeService.deleteRecipe(this.recipeIndex);
        this.router.navigate(['/recipes']);
    };
    return RecipeDetailComponent;
}());
RecipeDetailComponent = __decorate([
    Component({
        selector: 'rb-recipe-detail',
        templateUrl: './recipe-detail.component.html',
        styleUrls: ['./recipe-detail.component.css']
    }),
    __metadata("design:paramtypes", [ShoppingListService, ActivatedRoute, RecipeService, Router])
], RecipeDetailComponent);
export { RecipeDetailComponent };
//# sourceMappingURL=../../../../../src/app/recipes/recipe-detail/recipe-detail.component.js.map