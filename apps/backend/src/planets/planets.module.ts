import { Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Planet, PlanetSchema } from './entities/planet.entity';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Planet.name, schema: PlanetSchema }]),
  ],
  controllers: [PlanetsController],
  providers: [PlanetsService],
  exports: [PlanetsService],
})
export class PlanetsModule {}
