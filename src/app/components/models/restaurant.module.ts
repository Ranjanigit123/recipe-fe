//models/restaurant.model.ts

export interface Restaurant {
    _id?: string;
    recipename: String,
    description: String,
    ingredients: String,
    instructions: String,
    preparationtime: String,
    servingsize: String,
    category: String,
    foodtype: String,
    rating: Number,
    offers: Boolean,
    cuisines: [String],
    image: String,
 
}
