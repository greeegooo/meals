import { Injectable } from '@nestjs/common';
import { CreateRatingDto as CreateRatingDto } from './dtos/create.rating.dto';
import { SearchQueryDto } from './dtos/search.query.dto';
import { Meal } from './entities/meal.entity';
import { User, UserRoleEnum } from '../auth/entities/user.entity';
import { Rating } from './entities/rating.entity';
import { CreateMealDto } from './dtos/create.meal.dto';
import { MealDto } from './dtos/meal.dto';
import { v4 as uuidv4 } from 'uuid';
import { mealsRepo, ratingsRepo, usersRepo } from '../test.repositories';
import { RatingDto } from './dtos/rating.dto';
import { RatingsFactory } from './factories/ratings.factory';

@Injectable()
export class MealsService {
  search(qry: SearchQueryDto): MealDto[] {
    let result = mealsRepo;

    if(qry) {
      if(qry.chefName) {
        result = mealsRepo.filter(
          meal => usersRepo.find(user => user.id == meal.chefId)?.name === qry.chefName);
      }
    }

    return result.map(meal => this.getBy(meal.id));
  }

  getBy(mealId: string): MealDto {
    let ety = mealsRepo.find(meal => meal.id === mealId);
    if(!ety) throw new Error('Meal not found');
    let dto = new MealDto();
    dto.meal = ety.name;
    dto.chefName = usersRepo.find(user => user.id === ety?.chefId)?.name;
    dto.rating = this.getAverageRating(ety.id);
    return dto;
  }

  getAverageRating(mealId: string): number {
    let ratingsForMeal = ratingsRepo.filter(rating => rating.mealId === mealId);
    let sum = ratingsForMeal.reduce((seed, elem) => seed + elem.value, 0);
    console.log(sum);
    return sum / ratingsRepo.length || 0;
  }

  create(createMealDto: CreateMealDto): MealDto {
    console.log(createMealDto);
    this.validateCreate(createMealDto);

    let meal = new Meal(
      uuidv4(),
      createMealDto.userId,
      createMealDto.name
    );

    mealsRepo.push(meal);

    return this.getBy(meal.id);
  }

  rate(mealId: string, createRatingDto: CreateRatingDto): RatingDto {
    this.validateRate(mealId, createRatingDto);

    let rating = new Rating(
      mealId,
      createRatingDto.userId,
      createRatingDto.rating
    )

    ratingsRepo.push(rating);

    return RatingsFactory.getDtoInstance(
      mealsRepo.find(m => m.id === rating.mealId)?.name as string,
      usersRepo.find(u => u.id === rating.userId)?.name as string,
      rating.value
    );
  }

  private validateRate(mealId: string, createRatingDto: CreateRatingDto) {
    let coincidence = ratingsRepo
      .find(rating => rating.mealId === mealId
        && rating.userId === createRatingDto.userId);

    if(coincidence) {
      throw new Error('You already submited a rating for this meal.');
    }
  }

  private validateCreate(createMealDto: CreateMealDto) {
    let user = usersRepo.find(user => user.id === createMealDto.userId);
    if(user?.role === UserRoleEnum.CUSTOMER) throw new Error('Customers cant create meal');
  }
}
