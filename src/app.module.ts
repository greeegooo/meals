import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MealsModule } from './meals/meals.module';

@Module({
  imports: [
    AuthModule,
    MealsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
