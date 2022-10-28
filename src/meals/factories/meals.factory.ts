import { MealDto } from "../dtos/meal.dto";
import { Meal } from "../entities/meal.entity";

export class MealsFactory {
    static getDtoInstance(
        chefName: string,
        meal: string,
        rating: number): MealDto {
        let dto = new MealDto();
        dto.chefName = chefName;
        dto.meal = meal;
        dto.rating = rating;
        return dto;
    }
}