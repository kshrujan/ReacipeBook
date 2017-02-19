import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';


import {RecipeService} from '../recipe.service';
import {Subscription} from 'rxjs/Rx';
import {Recipe} from '../recipe';

@Component({
  selector: 'rb-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  private recipeIndex: number;
  private currentWorkingRecipe: Recipe;
  private isNew = true;

  recipeForm: FormGroup;
  subscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private recipeService: RecipeService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe(
      //The plus in front of params, converts the string "id" to a number id
      (params: any) => {
        if(params.hasOwnProperty('id')){
          this.isNew= false;
          this.recipeIndex = +params['id']
          this.currentWorkingRecipe = this.recipeService.getRecipeByIndex(this.recipeIndex);
        } else {
          this.isNew = true;
          this.currentWorkingRecipe = null;
        }

        //YOU WANT TO CREATE THE FORM EVERYTIME THE PARAMS CHANGES
        console.log("FORM INIT");
        this.initForm();
        console.log("DONE");
      }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  recipeFormSubmit(){
    //the 'recipeForm.value' will return a JS object with name, image, description ....etc Just like the recipeForm object
    const newRecipe = this.recipeForm.value;

    if(this.isNew){
      this.recipeService.addRecipe(newRecipe);
    } else {
      //takes both the current recipe, and the new one with updated values
      this.recipeService.editRecipe(this.currentWorkingRecipe,newRecipe);
    }
    this.navigateBack();
  }


  private navigateBack(){
    //essentially goes up one
    this.router.navigate(['../']);
  }

  private initForm(){
    let recipeName = "";
    let recipeImageURL ="";
    let recipeContent="";
    let recipeIngredients: FormArray = new FormArray([]);


    //EDIT
    if(!this.isNew){
      for(var i=0; i<this.currentWorkingRecipe.ingredients.length; i++){
        recipeIngredients.push(
          new FormGroup({
            name: new FormControl(this.currentWorkingRecipe.ingredients[i].name, Validators.required),
            amount: new FormControl(this.currentWorkingRecipe.ingredients[i].amount, [Validators.required])
          })
        );
      }

      recipeName = this.currentWorkingRecipe.name;
      recipeImageURL = this.currentWorkingRecipe.imagePath;
      recipeContent = this.currentWorkingRecipe.description;
    } else {

    }


    //NOW TIME TO CREATE THE FORM VIA TS
    //YOU WILL REFERENCE THE FORM USING 'recipeForm'
    this.recipeForm = this.formBuilder.group({
      'name': [recipeName, Validators.required],
      'imagePath': [recipeImageURL, Validators.required],
      'description': [recipeContent, Validators.required],
      'ingredients': recipeIngredients

    });
  }

  addIngredient(name: string, amount: string){
    (<FormArray>this.recipeForm.controls['ingredients']).push(
      new FormGroup({
        name: new FormControl(name, Validators.required),
        amount: new FormControl(amount, [Validators.required])
      })
    );
  }

  removeIngredient(index: number){
    (<FormArray>this.recipeForm.controls['ingredients']).removeAt(index);
  }



}
