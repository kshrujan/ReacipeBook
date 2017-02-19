import { Component, OnInit } from '@angular/core';

import {Recipe} from "./recipe";
import {RecipeService} from './recipe.service';

@Component({
  selector: 'rb-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  selectedRecipe: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.fetchDataFromFireBase();
  }

}
