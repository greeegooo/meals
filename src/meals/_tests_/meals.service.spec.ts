import { User, UserRoleEnum } from "../../auth/entities/user.entity";
import { Repository } from "typeorm";
import { SearchQueryDto } from "../dtos/search.query.dto";
import { Meal } from "../entities/meal.entity";
import { Rating } from "../entities/rating.entity";
import { MealsFactory } from "../factories/meals.factory";
import { MealsService } from "../meals.service";
import { MealDto } from "../dtos/meal.dto";
import { CreateMealDto } from "../dtos/create.meal.dto";
import e from "express";
import { CreateRatingDto } from "../dtos/create.rating.dto";
import { RatingsFactory } from "../factories/ratings.factory";

describe('mealsService', () => {
    let subject: MealsService;
    let mealsRepository: Repository<Meal>;
    let ratingsRepository: Repository<Rating>;
    let usersRepository: Repository<User>;
    let mockedResponse: Meal[]; 
    let chef: User;

    beforeEach(() => {
        chef = new User()
        chef.name = "chefName";
        chef.role = UserRoleEnum.CHEF;
        mockedResponse = [
            MealsFactory.getEntityInstance('mealTest', chef, 0),
            MealsFactory.getEntityInstance('mealTest2', chef, 0)
        ];

        mealsRepository = { 
            find: () => {},
            findOne: (options) => {},
            create: (entities) => {},
            update: (options, params) => {},
            save: (entities) => {}
        } as Repository<Meal>;

        ratingsRepository = {
            find: (options) => {},
            findOne: (options) => {},
            create: (entities) => {},
            save: (entities) => {}
        } as Repository<Rating>;

        usersRepository = { 
            findOne: (options) => {} 
        } as Repository<User>;

        subject = new MealsService(
            mealsRepository,
            ratingsRepository,
            usersRepository
        );
    });

    describe('search', () => {
        it('should return an array of meals', async () => {
            const result = mockedResponse;
            jest.spyOn(mealsRepository, 'find').mockImplementation(async () => result);
            
            expect(await subject.search({} as SearchQueryDto))
                .toStrictEqual(result.map(subject.mapToDto));
        });

        it('should return an array of filtered meals', async () => {
            const result = mockedResponse.filter(m => m.chef.name === 'chefTest');
            jest.spyOn(mealsRepository, 'find').mockImplementation(async () => result);
            
            expect(await subject.search({ chefName: 'chefTest' } as SearchQueryDto))
                .toStrictEqual(result.map(subject.mapToDto));
        });

        it('should return an empty array when not matching', async () => {
            const result = [] as Meal[];
            jest.spyOn(mealsRepository, 'find').mockImplementation(async () => result);
            
            expect(await subject.search({ chefName: 'notAChef' } as SearchQueryDto))
                .toStrictEqual(result);
        });
    });

    describe('create', () => {
        it('should return a new meal', async () => {
            jest.spyOn(usersRepository, 'findOne').mockImplementation(async () => chef);
            jest.spyOn(mealsRepository, 'create').mockImplementation();
            jest.spyOn(mealsRepository, 'save')
                .mockImplementation(async () => MealsFactory.getEntityInstance('newMeal', chef, 0));

            let request = { name: 'newMeal', userId: '1' } as CreateMealDto;
            let result = MealsFactory.getDtoInstance(chef.name, request.name, 0);
            expect(await subject.create(request)).toStrictEqual(result);
        });
    });

    describe('rate', () => {
        it('should return a new rating', async () => {
            let meal = MealsFactory.getEntityInstance("meal", chef, 0);
            let user = new User()
            user.id = '1';
            user.name = "chefName";
            user.role = UserRoleEnum.CHEF;
            let entity = new Rating();
            entity.id = "1";
            entity.meal = meal;
            entity.user = user;
            entity.value = 1;
            jest.spyOn(ratingsRepository, 'findOne').mockImplementation(async () => null);
            jest.spyOn(mealsRepository, 'findOne').mockImplementation(async () => meal);
            jest.spyOn(usersRepository, 'findOne').mockImplementation(async () => chef);
            jest.spyOn(ratingsRepository, 'find').mockImplementation(async () => []);
            jest.spyOn(ratingsRepository, 'create').mockImplementation();
            jest.spyOn(ratingsRepository, 'save').mockImplementation(async () => entity);
            jest.spyOn(mealsRepository, 'update').mockImplementation();

            let request = new CreateRatingDto();
            request.userId = user.id;
            request.rating = 1; 
            expect(await subject.rate('1', request))
                .toStrictEqual(RatingsFactory.getDtoInstance(entity));
        });
    });
});