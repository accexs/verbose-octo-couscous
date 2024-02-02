import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharactersModule } from './characters/characters.module';
import { MoviesModule } from './movies/movies.module';
import { PlanetsModule } from './planets/planets.module';
import { ScheduleModule } from '@nestjs/schedule';
import { FetchStarWarsEntitiesService } from './fetch-star-wars-entities/fetch-star-wars-entities.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StarshipsModule } from './starships/starships.module';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(
      process.env.MONGO_URL ?? 'mongodb://localhost:27017/',
      {
        dbName: 'star_wars',
      },
    ),
    CharactersModule,
    MoviesModule,
    PlanetsModule,
    StarshipsModule,
  ],
  controllers: [AppController],
  providers: [AppService, FetchStarWarsEntitiesService],
})
export class AppModule {}
