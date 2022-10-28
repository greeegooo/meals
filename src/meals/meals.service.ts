import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateRatingDto as CreateRatingDto } from './dtos/create.rating.dto';
import { SearchQueryDto } from './dtos/search.query.dto';
import { Meal } from './entities/meal.entity';
import { User, UserRoleEnum } from '../auth/entities/user.entity';
import { Rating } from './entities/rating.entity';
import { CreateMealDto } from './dtos/create.meal.dto';
import { MealDto } from './dtos/meal.dto';
import { RatingDto } from './dtos/rating.dto';
import { RatingsFactory } from './factories/ratings.factory';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(Meal) private readonly mealsRepository: Repository<Meal>,
    @InjectRepository(Rating) private readonly ratingsRepository: Repository<Rating>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) {}

  async search(qry: SearchQueryDto): Promise<MealDto[]> {
    let result = await this.mealsRepository.find({
      where: { chef: { name: qry.chefName }}
    });

    return result.map(this.mapToDto);
  }

  async create(createMealDto: CreateMealDto): Promise<MealDto> {
    let chef = await this.usersRepository.findOne({ where: { id: createMealDto.userId }});
    console.log(chef);
    if(!chef) throw new NotFoundException('Chef not found');
    if(chef.role === UserRoleEnum.CUSTOMER) throw new UnauthorizedException('Customers cant create meal');

    let meal = new Meal();
    meal.chef = chef;
    meal.name = createMealDto.name;
    meal.rating = 0;

    let entity = this.mealsRepository.create(meal);
    entity = await this.mealsRepository.save(entity);

    return this.mapToDto(entity);
  }

  async rate(mealId: string, createRatingDto: CreateRatingDto): Promise<RatingDto> {
    await this.validateRate(mealId, createRatingDto);

    let rating = await this.createRating(mealId, createRatingDto);

    let entity = this.ratingsRepository.create(rating);
    entity = await this.ratingsRepository.save(entity);

    await this.updateMealRating(rating);

    return RatingsFactory.getDtoInstance(rating);
  }

  private async createRating(mealId: string, createRatingDto: CreateRatingDto): Promise<Rating> {
    let rating = new Rating();
    let meal = await this.mealsRepository.findOne({ where: { id: mealId }});
    if(!meal) throw new NotFoundException('Meal not found');
    rating.meal = meal;
    let user = await this.usersRepository.findOne({ where: { id: createRatingDto.userId }});
    if(!user) throw new NotFoundException('User not found');
    rating.user = user;
    rating.value = createRatingDto.rating;
    return rating;
  }

  private async updateMealRating(rating: Rating) {
    let average = await this.getAverageRating(rating.meal.id);
    this.mealsRepository.update({id: rating.meal.id}, { rating: average });
  }

  private async getAverageRating(mealId: string): Promise<number> {
    let ratingsForMeal = await this.ratingsRepository.find({ where: { meal: { id: mealId }}});
    let sum = ratingsForMeal.reduce((seed, elem) => seed + elem.value, 0);
    return sum / ratingsForMeal.length || 0;
  }

  private async validateRate(mealId: string, createRatingDto: CreateRatingDto) {
    let coincidence = await this.ratingsRepository.findOne({
      where: {
        meal: { id: mealId },
        user: { id: createRatingDto.userId }
      },
    });
    console.log(coincidence);
    if(coincidence) throw new BadRequestException('You already submited a rating for this meal.');
  }

  mapToDto(entity: Meal): MealDto {
    let dto = new MealDto();
    dto.meal = entity.name;
    dto.chefName = entity.chef.name
    dto.rating = entity.rating;
    return dto;
  }
}
