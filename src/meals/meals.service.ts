import { Injectable } from '@nestjs/common';
import { CreateRateDto } from './dtos/create.rate.dto';
import { CreateRateResponseDto } from './dtos/create.rate.response.dto';
import { SearchQueryDto } from './dtos/search.query.dto';
import { Meal } from './meal.entity';

@Injectable()
export class MealsService {
  search(qry: SearchQueryDto): Meal[] {
    let meals = [
      new Meal(1, 'John', 'EggplantParmesan', 5),
      new Meal(2, 'Tom', 'NoodleSoup', 4),
      new Meal(3, 'John', 'Milanesa', 5),
      new Meal(4, 'John', 'ChickpeaSalad', 5)
    ];
    
    let result = meals;

    if(qry) {
      if(qry.chefName) {
        result = meals.filter(meal => meal.chefName === qry.chefName);
      }
    }

    return result;
  }

  rate(mealId: number, createRateDto: CreateRateDto) {
    console.log(mealId);
    console.log(createRateDto);

    return new CreateRateResponseDto();
  }
}
