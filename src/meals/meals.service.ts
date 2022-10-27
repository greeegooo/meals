import { Injectable } from '@nestjs/common';
import { Meal } from './meal.entity';

@Injectable()
export class MealsService {
  search(): Meal[] {
    let meals = [
      new Meal(1, 'John', 'EggplantParmesan', 5),
      new Meal(2, 'Tom', 'NoodleSoup', 4),
      new Meal(3, 'John', 'Milanesa', 5),
      new Meal(4, 'John', 'ChickpeaSalad', 5)
    ];
    
    return meals;
  }
}
