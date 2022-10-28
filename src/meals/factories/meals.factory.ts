import { User } from "src/auth/entities/user.entity";
import { CreateMealDto } from "../dtos/create.meal.dto";
import { MealDto } from "../dtos/meal.dto";
import { Meal } from "../entities/meal.entity";

export class MealsFactory {
    static getDtoInstance(chefName: string, meal: string, rating: number): MealDto {
        let dto = new MealDto();
        dto.chefName = chefName;
        dto.meal = meal;
        dto.rating = rating;
        return dto;
    }
    static getEntityInstance(meal: string, chef: User, rating: number) {
        let ety = new Meal();
        ety.name = meal;
        ety.chef = chef
        ety.rating = rating;
        return ety;
    }
}