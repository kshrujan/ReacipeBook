import { Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {Recipe} from '../recipe';
import {RecipeService} from '../recipe.service';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';

@Component({
  selector: 'rb-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

 detailsForSelectedRecipe: Recipe;
 private subscribe: Subscription;
 private recipeIndex: number;

  constructor(private shoppingListService: ShoppingListService, private activatedRoute: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.subscribe = this.activatedRoute.params.subscribe(
      (params: any) => {
        this.recipeIndex = params['id'];
        this.detailsForSelectedRecipe = this.recipeService.getRecipeByIndex(this.recipeIndex);
      }
    );
  }

  ngOnDestroy(){
    this.subscribe.unsubscribe();
  }

  onAddToShoppingList(){
    this.shoppingListService.addItems(this.detailsForSelectedRecipe.ingredients);
  }

  editRecipe(){
    this.router.navigate(['/recipes',this.recipeIndex,'edit']);
  }

  deleteRecipe(){
    this.recipeService.deleteRecipe(this.recipeIndex);
    this.router.navigate(['/recipes']);
  }

}
