import { Module } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { StarshipsController } from './starships.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Starship, StarshipSchema } from './entities/starship.entity';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Starship.name, schema: StarshipSchema },
    ]),
  ],
  controllers: [StarshipsController],
  providers: [StarshipsService],
  exports: [StarshipsService],
})
export class StarshipsModule {}
