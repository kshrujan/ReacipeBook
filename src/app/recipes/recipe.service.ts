import { Injectable, EventEmitter } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/Rx';

import {Recipe} from './recipe';
import {Ingredient} from '../shared/ingredient';


//The @Injectable meta data allows for other services to be injected to this service. In this case, we use the 'Http' service
@Injectable()
export class RecipeService {

  recipesChanged = new EventEmitter<Recipe []>();

  private recipes: Recipe[] = [
    new Recipe('Fried Chicken', 'First step...', 'http://ww2.kqed.org/bayareabites/wp-content/uploads/sites/24/2014/12/chixwings-finish-herbs1.jpg',[
      new Ingredient('Chicken Wings', 10),
      new Ingredient("Barbeque Sauce", 1)
    ]),
    new Recipe('Falafel','Just amazing','http://toriavey.com/images/2011/01/Falafel-10-640x480.jpg',[])
  ];

  constructor(private http: Http) { }

  getRecipes(){
    return this.recipes;
  }

  getRecipeByIndex(id: number){
    return this.recipes[id];
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.storeDataOnFireBase().subscribe();
  }

  addRecipe(newRecipe: Recipe){
    this.recipes.push(newRecipe);
    this.storeDataOnFireBase().subscribe();
  }

  editRecipe(oldRecipe: Recipe, newRecipe: Recipe){
    this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
    this.storeDataOnFireBase().subscribe();
  }

  storeDataOnFireBase(){
    const body = JSON.stringify(this.recipes);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    //We can add any name to the end, in this case we used 'recipes' to relate to recipe table. The .JSON just tells the format
    //Again, all this does is create an observable. It's important to subscribe to that to actually do anything.
    return this.http.put('https://recipebook-7085e.firebaseio.com/recipes.json', body, {headers: headers});
    //we are using PUT instead of POST so that Firebase does not create a new node everytime. Instead it will just append to the end of the same node
  }


  fetchDataFromFireBase(){
    return this.http.get('https://recipebook-7085e.firebaseio.com/recipes.json')
    .map((response: Response) => response.json())
    .subscribe(
      (data: Recipe[]) => {
        this.recipes = data;
        this.recipesChanged.emit(this.recipes);
      }
    );
  }

  fetchDataFromFireBaseByIndex(index: number){
    return this.http.get('https://recipebook-7085e.firebaseio.com/recipes.json')
    .map((response: Response) => response.json())
    .subscribe(
      (data: Recipe[]) => {
        this.recipes[index] = data[index];
        this.recipesChanged.emit(this.recipes);
      }
    );
  }

}
