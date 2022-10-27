import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateRatingDto } from './dtos/create.rating.dto';
import { CreateRateResponseDto } from './dtos/create.rate.response.dto';
import { SearchQueryDto } from './dtos/search.query.dto';
import { Meal } from './entities/meal.entity';
import { MealsService } from './meals.service';
import { Rating } from './entities/rating.entity';

@Controller('meals')
export class MealsController {
  constructor(private readonly mealsService: MealsService) {}

  @Get()
  search(@Query() query: SearchQueryDto): Meal[] {
    return this.mealsService.search(query);
  }

  @Post(':id/ratings')
  rate(
    @Param('id') mealId: number,
    @Body() createRatingDto: CreateRatingDto): Rating[] {
  
    return this.mealsService.rate(mealId, createRatingDto);
  }
}
