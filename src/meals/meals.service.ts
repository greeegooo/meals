import { Injectable } from '@nestjs/common';
import { CreateRatingDto as CreateRatingDto } from './dtos/create.rating.dto';
import { CreateRateResponseDto } from './dtos/create.rate.response.dto';
import { SearchQueryDto } from './dtos/search.query.dto';
import { Meal } from './entities/meal.entity';
import { User, UserRoleEnum } from './entities/user.entity';
import { Rating } from './entities/rating.entity';

const meals: Meal[] = [
  new Meal(1, 'John', 'EggplantParmesan', 5),
  new Meal(2, 'Tom', 'NoodleSoup', 4),
  new Meal(3, 'John', 'Milanesa', 5),
  new Meal(4, 'John', 'ChickpeaSalad', 5)
];

const users: User[] = [
  new User(1, 'GregCustomer', UserRoleEnum.CUSTOMER),
  new User(1, 'GregChef', UserRoleEnum.CHEF),
];

let ratings: Rating[] = [];

@Injectable()
export class MealsService {
  search(qry: SearchQueryDto): Meal[] {
    let result = meals;

    if(qry) {
      if(qry.chefName) {
        result = meals.filter(meal => meal.chefName === qry.chefName);
      }
    }

    return result;
  }

  rate(mealId: number, createRatingDto: CreateRatingDto): Rating[] {
    console.log(mealId);
    console.log(createRatingDto);

    this.validate(mealId, createRatingDto);

    let rating = new Rating(
      mealId,
      createRatingDto.userId,
      createRatingDto.rating
    )

    ratings.push(rating);

    return ratings;
  }

  private validate(mealId: number, createRatingDto: CreateRatingDto) {
    let coincidence = ratings
      .find(rating => rating.mealId === mealId
        && rating.userId === createRatingDto.userId);

    if(coincidence) {
      throw new Error('You already submited a rating for this meal.');
    }
  }
}
