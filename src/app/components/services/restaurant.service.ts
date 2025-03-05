//services/restaurant.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/restaurant.module';

@Injectable({
    providedIn: 'root',
})
export class RestaurantService {
    private apiUrl = 'https://recipe-be-1.onrender.com/api/restaurants';

    constructor(private http: HttpClient) { }

    getRestaurants(
        category: string = '',
        rating: number = 0,
        sortBy: string = 'name',
        sortOrder: 'asc' | 'desc' = 'asc'
    ): Observable<Restaurant[]> {
        let params = new HttpParams();
        if (category) {
            params = params.set('category', category);
        }
        if (rating > 0) {
            params = params.set('rating', 
            rating.toString());
        }
        params = params.set('sortBy', sortBy);
        params = params.set('sortOrder', sortOrder);

        return this.http.get<Restaurant[]>
        (this.apiUrl, { params });
    }

    createRestaurant(restaurant: Restaurant):
     Observable<Restaurant> {
        return this.http.post<Restaurant>
        (this.apiUrl, restaurant);
    }

    updateRestaurant(
        id: string,
        updatedRestaurant: Restaurant
    ): Observable<Restaurant> {
        return this.http.put<Restaurant>
        (`${this.apiUrl}/${id}`, updatedRestaurant);
    }

    deleteRestaurant(id: string): Observable<void> {
        return this.http.delete<void>
        (`${this.apiUrl}/${id}`);
    }
}
