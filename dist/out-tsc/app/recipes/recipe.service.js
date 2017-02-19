var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/Rx';
import { Recipe } from './recipe';
import { Ingredient } from '../shared/ingredient';
var RecipeService = (function () {
    function RecipeService(http) {
        this.http = http;
        this.recipesChanged = new EventEmitter();
        this.recipes = [
            new Recipe('Fried Chicken', 'First step...', 'http://ww2.kqed.org/bayareabites/wp-content/uploads/sites/24/2014/12/chixwings-finish-herbs1.jpg', [
                new Ingredient('Chicken Wings', 10),
                new Ingredient("Barbeque Sauce", 1)
            ]),
            new Recipe('Falafel', 'Just amazing', 'http://toriavey.com/images/2011/01/Falafel-10-640x480.jpg', [])
        ];
    }
    RecipeService.prototype.getRecipes = function () {
        return this.recipes;
    };
    RecipeService.prototype.getRecipeByIndex = function (id) {
        return this.recipes[id];
    };
    RecipeService.prototype.deleteRecipe = function (index) {
        this.recipes.splice(index, 1);
        this.storeDataOnFireBase().subscribe();
    };
    RecipeService.prototype.addRecipe = function (newRecipe) {
        this.recipes.push(newRecipe);
        this.storeDataOnFireBase().subscribe();
    };
    RecipeService.prototype.editRecipe = function (oldRecipe, newRecipe) {
        this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
        this.storeDataOnFireBase().subscribe();
    };
    RecipeService.prototype.storeDataOnFireBase = function () {
        var body = JSON.stringify(this.recipes);
        var headers = new Headers({
            'Content-Type': 'application/json'
        });
        return this.http.put('https://recipebook-7085e.firebaseio.com/recipes.json', body, { headers: headers });
    };
    RecipeService.prototype.fetchDataFromFireBase = function () {
        var _this = this;
        return this.http.get('https://recipebook-7085e.firebaseio.com/recipes.json')
            .map(function (response) { return response.json(); })
            .subscribe(function (data) {
            _this.recipes = data;
            _this.recipesChanged.emit(_this.recipes);
        });
    };
    RecipeService.prototype.fetchDataFromFireBaseByIndex = function (index) {
        var _this = this;
        return this.http.get('https://recipebook-7085e.firebaseio.com/recipes.json')
            .map(function (response) { return response.json(); })
            .subscribe(function (data) {
            _this.recipes[index] = data[index];
            _this.recipesChanged.emit(_this.recipes);
        });
    };
    return RecipeService;
}());
RecipeService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], RecipeService);
export { RecipeService };
//# sourceMappingURL=../../../../src/app/recipes/recipe.service.js.map