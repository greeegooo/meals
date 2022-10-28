import { User } from "./auth/entities/user.entity";
import { Meal } from "./meals/entities/meal.entity";
import { Rating } from "./meals/entities/rating.entity";

export let mealsRepo: Meal[] = [];
export let usersRepo: User[] = [];
export let ratingsRepo: Rating[] = [];