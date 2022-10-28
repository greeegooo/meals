import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateRatingDto } from './dtos/create.rating.dto';
import { CreateRateResponseDto } from './dtos/create.rate.response.dto';
import { SearchQueryDto } from './dtos/search.query.dto';
import { Meal } from './entities/meal.entity';
import { MealsService } from './meals.service';
import { Rating } from './entities/rating.entity';
import { MealDto } from './dtos/meal.dto';
import { CreateMealDto } from './dtos/create.meal.dto';
import { RatingDto } from './dtos/rating.dto';

@Controller('meals')
export class MealsController {
  constructor(private readonly mealsService: MealsService) {}

  @Get()
  async search(@Query() query: SearchQueryDto): Promise<MealDto[]> {
    return await this.mealsService.search(query);
  }

  @Post()
  async create(@Body() createMealDto: CreateMealDto): Promise<MealDto> {
    return await this.mealsService.create(createMealDto);
  }

  @Post(':id/ratings')
  rate(
    @Param('id') mealId: string,
    @Body() createRatingDto: CreateRatingDto): Promise<RatingDto> {
  
    return this.mealsService.rate(mealId, createRatingDto);
  }
}
