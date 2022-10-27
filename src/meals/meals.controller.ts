import { Controller, Get } from '@nestjs/common';
import { Meal } from './meal.entity';
import { MealsService } from './meals.service';

@Controller('meals')
export class MealsController {
  constructor(private readonly mealsService: MealsService) {}

  @Get()
  search(): Meal[] {
    return this.mealsService.search();
  }
}
