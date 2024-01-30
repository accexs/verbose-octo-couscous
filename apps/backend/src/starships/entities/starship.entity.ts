import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { StarWarsBase } from '../../shared/entities/starWarsBase.entity';
import mongoose from 'mongoose';
import { Movie } from '../../movies/entities/movie.entity';
import { Character } from '../../characters/entities/character.entity';

export type StarshipDocument = Starship & Document;

@Schema()
export class Starship extends StarWarsBase {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  manufacturer: string;

  @Prop({ required: true })
  costInCredits: string;

  @Prop({ required: true })
  length: string;

  @Prop({ required: true })
  max_AtmospheringSpeed: string;

  @Prop({ required: true })
  crew: string;

  @Prop({ required: true })
  passengers: string;

  @Prop({ required: true })
  cargoCapacity: string;

  @Prop({ required: true })
  consumables: string;

  @Prop({ required: true })
  hyperdriveRating: string;

  @Prop({ required: true })
  mglt: string;

  @Prop({ required: true })
  starshipClass: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }] })
  pilots: Character[];

  @Prop()
  extPilotIds: string[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }] })
  movies: Movie[];

  @Prop()
  extMovieIds: string[];
}

export const StarshipSchema = SchemaFactory.createForClass(Starship);
