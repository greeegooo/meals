import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MealsModule } from './meals/meals.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'us-cdbr-east-06.cleardb.net',
      port: 3306,
      username: 'badd5fd3f5d1ad',
      password: '0fb37062',
      database: 'heroku_115b441f87b7a4c',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    MealsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
