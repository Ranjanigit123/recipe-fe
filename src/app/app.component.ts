// app.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } 
    from './components/navbar/navbar.component';
import { RestaurantCardComponent } 
    from './components/restaurant-card/restaurant-card.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [
    NavbarComponent,
    FormsModule,
    HttpClientModule,
    RestaurantCardComponent,
    ReactiveFormsModule,
    CommonModule
],
    standalone: true,
})
export class AppComponent implements OnInit {
    title = 'Restro - find your Recipe';
    category = new FormControl('');
    rating = new FormControl('');
    selectedCuisines: string[] = [];
    restaurants: any[] = [];
    filteredRestaurants: any[] = [];
    selectedRecipe: any = null;
    savedRecipes: any[] = [];
    showFavoritesModal = false;


    options = [
        { value: 'North Indian', label: 'North Indian' },
        { value: 'South Indian', label: 'South Indian' },
        { value: 'Chinese', label: 'Chinese' },
        { value: 'Desserts', label: 'Desserts' },
        { value: 'Italian', label: 'Italian' },
        { value: 'Oriental', label: 'Oriental' },
        { value: 'Pastas', label: 'Pastas' },
        { value: 'Pizzas', label: 'Pizzas' },
        { value: 'Japanese', label: 'Japanese' },
        { value: 'Sushi', label: 'Sushi' },
        { value: 'Barbecue', label: 'Barbecue' },
        { value: 'Steak', label: 'Steak' },
        { value: 'Seafood', label: 'Seafood' },
    ];

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.getRestaurants();
    }

    getRestaurants() {
        this.http.get('https://recipe-be-1.onrender.com/api/restaurants').subscribe(
            (response: any) => {
                if (response.success) {
                    this.restaurants = response.data;
                    this.filterRestaurants();
                }
            },
            (error) => {
                console.log('Error:', error);
            }
        );
    }

    filterRestaurants() {
        this.filteredRestaurants = this.restaurants.filter((restaurant) => {
            const categoryMatch = this.category.value ? restaurant.category === this.category.value : true;
            const ratingMatch = this.rating.value ? restaurant.rating >= parseInt(this.rating.value) : true;
            const cuisineMatch = this.selectedCuisines.length > 0 ? this.selectedCuisines.every((cuisine) => restaurant.cuisines.includes(cuisine)) : true;
            return categoryMatch && ratingMatch && cuisineMatch;
        });
    }

    toggleCuisine(cuisine: string) {
        const index = this.selectedCuisines.indexOf(cuisine);
        if (index === -1) {
            this.selectedCuisines.push(cuisine);
        } else {
            this.selectedCuisines.splice(index, 1);
        }
        this.filterRestaurants();
    }

    showFullRecipe(restaurant: any) {
        this.selectedRecipe = restaurant;
        console.log('Full recipe details:', restaurant);
    }

    closeFullRecipe() {
        this.selectedRecipe = null;
    }
    successMessage: string = '';
    savedRecipe: any = null;

    saveToFavorites(recipe: any) {
        const savedRecipe = {
          recipename: recipe.recipename,
          description: recipe.description,
          image: recipe.image,
          cuisines: recipe.cuisines,
          rating: recipe.rating,
          preparationtime: recipe.preparationtime,
          category: recipe.category,
        };
      
        this.savedRecipes.push(savedRecipe);
        this.successMessage = 'Successfully added to favorites!';
        
        setTimeout(() => {
          this.successMessage = '';
        }, 2000);
      }
      


    openFavoritesModal() {
        this.showFavoritesModal = true;
    }

    closeFavoritesModal() {
        this.showFavoritesModal = false;
    }
    searchTerm: string = '';

searchRecipes() {
  const searchTermLower = this.searchTerm.toLowerCase().trim();

  this.filteredRestaurants = this.restaurants.filter((restaurant) => {
    return (
      restaurant.recipename.toLowerCase().includes(searchTermLower) ||
      restaurant.ingredients.toLowerCase().includes(searchTermLower) ||
      restaurant.foodtype.toLowerCase().includes(searchTermLower)
    );
  });
}

}
