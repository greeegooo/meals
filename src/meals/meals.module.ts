import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Meal } from './entities/meal.entity';
import { Rating } from './entities/rating.entity';
import { MealsController } from './meals.controller';
import { MealsService } from './meals.service';

@Module({
  imports: [TypeOrmModule.forFeature([Meal, Rating, User])],
  controllers: [MealsController],
  providers: [MealsService],
})
export class MealsModule {}
