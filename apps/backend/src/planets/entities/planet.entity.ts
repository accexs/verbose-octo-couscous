import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { StarWarsBase } from '../../shared/entities/starWarsBase.entity';
import { Character } from '../../characters/entities/character.entity';
import { Movie } from '../../movies/entities/movie.entity';

export type PlanetDocument = HydratedDocument<Planet>;

@Schema()
export class Planet extends StarWarsBase {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  rotationPeriod: string;

  @Prop({ required: true })
  orbitalPeriod: string;

  @Prop({ required: true })
  diameter: string;

  @Prop({ required: true })
  climate: string;

  @Prop({ required: true })
  gravity: string;

  @Prop({ required: true })
  terrain: string;

  @Prop({ required: true })
  surfaceWater: string;

  @Prop({ required: true })
  population: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }] })
  residents: Character[];

  @Prop()
  extResidentsIds: string[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }] })
  movies: Movie[];

  @Prop()
  extMovieIds: string[];
}

export const PlanetSchema = SchemaFactory.createForClass(Planet);
