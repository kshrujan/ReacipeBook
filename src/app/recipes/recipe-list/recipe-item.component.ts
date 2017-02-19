import { Component, Input } from '@angular/core';
import {Recipe} from '../recipe';

@Component({
  selector: 'rb-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent{

  //Input means that the 'recipe' can be set from outisde of this component
  @Input() recipe: Recipe;
  @Input() recipeId: number;
}
