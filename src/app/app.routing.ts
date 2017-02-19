import {Routes, RouterModule} from '@angular/router';
import {RecipesComponent} from './recipes/recipes.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {RECIPE_ROUTES} from './recipes/recipes.routes';


//Create a const that will be an array of type routes. Determine the path, and set the component to that route
const APP_ROUTES: Routes = [
    {path: '', redirectTo: '/recipes', pathMatch: 'full'},
    {path: 'recipes', component: RecipesComponent, children: RECIPE_ROUTES},
    {path: 'shopping-list', component: ShoppingListComponent},
];


//Then, export a const 'routing' that is a RouterModule object with the APP_ROUTES
export const routing = RouterModule.forRoot(APP_ROUTES);
