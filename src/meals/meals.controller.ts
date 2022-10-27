import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateRateDto } from './dtos/create.rate.dto';
import { CreateRateResponseDto } from './dtos/create.rate.response.dto';
import { SearchQueryDto } from './dtos/search.query.dto';
import { Meal } from './meal.entity';
import { MealsService } from './meals.service';

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
    @Body() createRateDto: CreateRateDto): CreateRateResponseDto {
  
    return this.mealsService.rate(mealId, createRateDto);
  }
}
