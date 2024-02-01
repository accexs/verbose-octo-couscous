import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Movie } from '../../movies/entities/movie.entity';
import { Starship } from '../../starships/entities/starship.entity';
import { Planet } from '../../planets/entities/planet.entity';
import { StarWarsBase } from '../../shared/entities/starWarsBase.entity';

export type CharacterDocument = HydratedDocument<Character>;

@Schema()
export class Character extends StarWarsBase {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  height: string;

  @Prop({ required: true })
  mass: string;

  @Prop({ required: true })
  hairColor: string;

  @Prop({ required: true })
  skinColor: string;

  @Prop({ required: true })
  eyeColor: string;

  @Prop({ required: true })
  birthYear: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }] })
  movies?: Movie[];

  @Prop()
  extMovieIds: string[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Starship' }] })
  starships?: Starship[];

  @Prop()
  extStarshipIds: string[];

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Planet' } })
  planet?: Planet;

  @Prop()
  extPlanetId: string;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
