var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient';
import { ShoppingListService } from './shopping-list.service';
var AddToShoppingListComponent = (function () {
    function AddToShoppingListComponent(shoppingListService) {
        this.shoppingListService = shoppingListService;
        this.cleared = new EventEmitter();
        this.isAdd = true;
    }
    AddToShoppingListComponent.prototype.ngOnInit = function () {
    };
    AddToShoppingListComponent.prototype.ngOnChanges = function (changes) {
        console.log(changes);
        if (changes.item.currentValue === null) {
            this.isAdd = true;
            this.item = { name: null, amount: null };
        }
        else {
            this.isAdd = false;
        }
    };
    AddToShoppingListComponent.prototype.onShoppingListSubmit = function (ingredient) {
        var newIngredient = new Ingredient(ingredient.name, ingredient.amount);
        if (!this.isAdd) {
            this.shoppingListService.editItem(this.item, newIngredient);
            this.backToAdd();
        }
        else {
            this.item = newIngredient;
            this.shoppingListService.userAddItem(this.item);
        }
    };
    AddToShoppingListComponent.prototype.onDelete = function () {
        this.shoppingListService.deleteItem(this.item);
        this.backToAdd();
    };
    AddToShoppingListComponent.prototype.backToAdd = function () {
        this.isAdd = true;
        this.cleared.emit(null);
    };
    return AddToShoppingListComponent;
}());
__decorate([
    Output(),
    __metadata("design:type", Object)
], AddToShoppingListComponent.prototype, "cleared", void 0);
__decorate([
    Input(),
    __metadata("design:type", Ingredient)
], AddToShoppingListComponent.prototype, "item", void 0);
AddToShoppingListComponent = __decorate([
    Component({
        selector: 'rb-add-to-shopping-list',
        templateUrl: './add-to-shopping-list.component.html',
        styleUrls: ['./add-to-shopping-list.component.css']
    }),
    __metadata("design:paramtypes", [ShoppingListService])
], AddToShoppingListComponent);
export { AddToShoppingListComponent };
//# sourceMappingURL=../../../../src/app/shopping-list/add-to-shopping-list.component.js.map