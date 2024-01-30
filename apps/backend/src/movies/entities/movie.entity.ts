import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Character } from '../../characters/entities/character.entity';
import { Starship } from '../../starships/entities/starship.entity';
import { Planet } from '../../planets/entities/planet.entity';
import { StarWarsBase } from '../../shared/entities/starWarsBase.entity';

export type MovieDocument = HydratedDocument<Movie>;

@Schema()
export class Movie extends StarWarsBase {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  openingCrawl: string;

  @Prop({ required: true })
  director: string;

  @Prop({ required: true })
  producer: string;

  @Prop({ required: true })
  releaseDate: Date;

  @Prop({ required: true })
  episodeId: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }] })
  characters: Character[];

  @Prop()
  extCharacterIds: string[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Starship' }] })
  starships: Starship[];

  @Prop()
  extStarshipIds: string[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Planet' }] })
  planets: Planet[];

  @Prop()
  extPlanetIds: string[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
