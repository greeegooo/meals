import { Injectable } from '@nestjs/common';
import { CreateRatingDto as CreateRatingDto } from './dtos/create.rating.dto';
import { SearchQueryDto } from './dtos/search.query.dto';
import { Meal } from './entities/meal.entity';
import { User, UserRoleEnum } from './entities/user.entity';
import { Rating } from './entities/rating.entity';
import { CreateMealDto } from './dtos/create.meal.dto';
import { MealDto } from './dtos/meal.dto';
import { v4 as uuidv4 } from 'uuid';

let meals: Meal[] = [];
let users: User[] = [];
let ratings: Rating[] = [];

@Injectable()
export class MealsService {
  constructor() {
    let u1Id = uuidv4();
    let u2Id = uuidv4();
    let u3Id = uuidv4();
    let u4Id = uuidv4();

    meals = [
      new Meal(uuidv4(), u3Id, 'EggplantParmesan'),
      new Meal(uuidv4(), u4Id, 'NoodleSoup'),
      new Meal(uuidv4(), u3Id, 'Milanesa'),
      new Meal(uuidv4(), u3Id, 'ChickpeaSalad')
    ];
    
    users = [
      new User(u1Id, 'GregCustomer', UserRoleEnum.CUSTOMER),
      new User(u2Id, 'GregChef', UserRoleEnum.CHEF),
      new User(u3Id, 'John', UserRoleEnum.CHEF),
      new User(u4Id, 'Tom', UserRoleEnum.CHEF),
    ];

    console.log(users);
    console.log(meals);
  }
  search(qry: SearchQueryDto): MealDto[] {
    let result = meals;

    if(qry) {
      if(qry.chefName) {
        result = meals.filter(
          meal => users.find(user => user.id == meal.chefId)?.name === qry.chefName);
      }
    }

    return result.map(meal => this.getBy(meal.id));
  }

  getBy(mealId: string): MealDto {
    let ety = meals.find(meal => meal.id === mealId);
    if(!ety) throw new Error('Meal not found');
    let dto = new MealDto();
    dto.meal = ety.name;
    dto.chefName = users.find(user => user.id === ety?.chefId)?.name;
    dto.rating = this.getAverageRating(ety.id);
    return dto;
  }

  getAverageRating(mealId: string): number {
    let ratingsForMeal = ratings.filter(rating => rating.mealId === mealId);
    let sum = ratingsForMeal.reduce((seed, elem) => seed + elem.value, 0);
    console.log(sum);
    return sum / ratings.length || 0;
  }

  create(createMealDto: CreateMealDto): MealDto {
    this.validateCreate(createMealDto);

    let meal = new Meal(
      uuidv4(),
      createMealDto.userId,
      createMealDto.name
    );

    meals.push(meal);

    return this.getBy(meal.id);
  }

  rate(mealId: string, createRatingDto: CreateRatingDto): Rating[] {
    console.log(mealId);
    console.log(createRatingDto);

    this.validateRate(mealId, createRatingDto);

    let rating = new Rating(
      mealId,
      createRatingDto.userId,
      createRatingDto.rating
    )

    ratings.push(rating);

    return ratings;
  }

  private validateRate(mealId: string, createRatingDto: CreateRatingDto) {
    let coincidence = ratings
      .find(rating => rating.mealId === mealId
        && rating.userId === createRatingDto.userId);

    if(coincidence) {
      throw new Error('You already submited a rating for this meal.');
    }
  }

  private validateCreate(createMealDto: CreateMealDto) {
    let user = users.find(user => user.id === createMealDto.userId);
    if(user?.role === UserRoleEnum.CUSTOMER) throw new Error('Customers cant create meal');
  }
}
