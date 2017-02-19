import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Ingredient} from '../shared/ingredient';
import {ShoppingListService} from './shopping-list.service';

@Component({
  selector: 'rb-add-to-shopping-list',
  templateUrl: './add-to-shopping-list.component.html',
  styleUrls: ['./add-to-shopping-list.component.css']
})
export class AddToShoppingListComponent implements OnInit, OnChanges {
  @Output() cleared = new EventEmitter<any>();
  @Input() item: Ingredient;
  isAdd = true;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  //Used to check changes in the bound 'item' var. REMEMBER, ONCHANGES FIRES EVERYTIME A BOUND VAR CHANGES
  //the changes param, is actually a representation of the changed values. That's the object that ngOnChagnes ships with
  ngOnChanges(changes){
    console.log(changes);
    if(changes.item.currentValue === null){
      this.isAdd = true;
      //The name and amount props set to null, allow the object to exist, and therefore be binded to by [ngModel].
      //i.e. [ngModel]="item.name".
      this.item = {name: null, amount: null};
    } else {
      this.isAdd = false;
    }
  }

  //The reason, we set the param as ingredient in this case is because we know our form gives us a JS object with 'name' and "amount"
  //Since, ingredient is also represented in that way, we can be sure that we will get an Ingredient
  onShoppingListSubmit(ingredient: Ingredient){
    const newIngredient = new Ingredient(ingredient.name, ingredient.amount);
    if(!this.isAdd){
      //BASICALLY WHEN WE ARE EDITTING
      this.shoppingListService.editItem(this.item, newIngredient);
      this.backToAdd();
    } else {
      this.item = newIngredient;
      this.shoppingListService.userAddItem(this.item);
    }
  }

  onDelete(){
    this.shoppingListService.deleteItem(this.item);
    this.backToAdd();
  }

  backToAdd(){
    this.isAdd = true;
    this.cleared.emit(null);
  }

}
