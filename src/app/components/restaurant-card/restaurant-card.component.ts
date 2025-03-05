// restaurant-card/restaurant-card.component.ts

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-restaurant-card',
    templateUrl: './restaurant-card.component.html',
    standalone: true,
    imports: [CommonModule]
})
export class RestaurantCardComponent {
    @Input() restaurant: any;
    @Output() viewRecipe = new EventEmitter<void>();
    @Output() saveRecipe = new EventEmitter<any>();

  onViewRecipe() {
    this.viewRecipe.emit(this.restaurant);
  }

  onSaveRecipe() {
    this.saveRecipe.emit(this.restaurant);
  }
   
 
    
}
