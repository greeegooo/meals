import { BadRequestException, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateRatingDto as CreateRatingDto } from './dtos/create.rating.dto';
import { SearchQueryDto } from './dtos/search.query.dto';
import { Meal } from './entities/meal.entity';
import { User } from '../auth/entities/user.entity';
import { Rating } from './entities/rating.entity';
import { CreateMealDto } from './dtos/create.meal.dto';
import { MealDto } from './dtos/meal.dto';
import { RatingDto } from './dtos/rating.dto';
import { RatingsFactory } from './factories/ratings.factory';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { UserRoleEnum } from '../auth/entities/role.enum';

@Injectable()
export class MealsService {
  private readonly logger = new Logger(MealsService.name);

  constructor(
    @InjectRepository(Meal) private readonly mealsRepository: Repository<Meal>,
    @InjectRepository(Rating) private readonly ratingsRepository: Repository<Rating>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) {}

  async search(qry: SearchQueryDto): Promise<MealDto[]> {
    this.logger.log('Search. Start');
    let result = await this.mealsRepository.find({
      where: { chef: { name: qry.chefName }}
    });

    this.logger.log('Search. Success.');
    return result.map(this.mapToDto);
  }

  async create(createMealDto: CreateMealDto): Promise<MealDto> {
    this.logger.log('Create. Start.');
    this.logger.log('Create. Validating.');
    let chef = await this.usersRepository.findOne({ where: { id: createMealDto.userId }});
    if(!chef) throw new NotFoundException('Chef not found');
    if(chef.role.toUpperCase() === UserRoleEnum.CUSTOMER) throw new UnauthorizedException('Customers cant create meal');

    let meal = new Meal();
    meal.chef = chef;
    meal.name = createMealDto.name;
    meal.rating = 0;

    this.logger.log('Create. Before Save.');
    let entity = this.mealsRepository.create(meal);
    entity = await this.mealsRepository.save(entity);
    this.logger.log('Create. Save success.');

    return this.mapToDto(entity);
  }

  async rate(mealId: string, createRatingDto: CreateRatingDto): Promise<RatingDto> {
    this.logger.log('Rate. Start.');
    await this.validateRate(mealId, createRatingDto);

    let rating = await this.createRating(mealId, createRatingDto);

    this.logger.log('Rate. Before Save.');
    let entity = this.ratingsRepository.create(rating);
    entity = await this.ratingsRepository.save(entity);
    this.logger.log('Rate. Save Success.');

    this.logger.log('Rate. Updating meal average.');
    await this.updateMealRating(rating);
    this.logger.log('Rate. Update average success.');

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
      where: { meal: { id: mealId }, user: { id: createRatingDto.userId }},
    });
    if(coincidence) 
      throw new BadRequestException('You already submited a rating for this meal.');
    if(![1,2,3,4,5].includes(createRatingDto.rating)) 
      throw new BadRequestException('Ratings must be between [1..5].');
  }
  
  mapToDto(entity: Meal): MealDto {
    let dto = new MealDto();
    dto.meal = entity.name;
    dto.chefName = entity.chef.name
    dto.rating = entity.rating;
    return dto;
  }
}
