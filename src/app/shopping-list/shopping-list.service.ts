import {Ingredient} from '../shared/ingredient';

export class ShoppingListService {

  private items: Ingredient[]=[];

  constructor() { }

  getItems(){
    return this.items;
  }

  addItems(items: Ingredient[]){
    //Using this.items.push won't work as push only allows one item
    //However, we can use the Array.prototype.push.apply which applies the push method on every item in the array
    Array.prototype.push.apply(this.items, items);
  }

  userAddItem(item: Ingredient){
    this.items.push(item);
  }

  editItem(oldItem: Ingredient, newItem: Ingredient){
    this.items[this.items.indexOf(oldItem)] = newItem;
  }

  deleteItem(item: Ingredient){
    this.items.splice((this.items.indexOf(item)),1);
  }
}
