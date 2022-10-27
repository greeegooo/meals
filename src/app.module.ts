import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MealsModule } from './meals/meals.module';

@Module({
  imports: [
    MealsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
