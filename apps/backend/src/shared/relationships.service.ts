import { Document, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

import { StarWarsBase } from './entities/starWarsBase.entity';
import { RelationshipsCharacterDto } from '../characters/dto/relationships-character.dto';
import { RelationshipsMovieDto } from '../movies/dto/relationships-movie.dto';
import { RelationshipsPlanetDto } from '../planets/dto/relationships-planet.dto';
import { RelationshipsStarshipDto } from '../starships/dto/relationships-starship.dto';

type GenericRelationship =
  | RelationshipsCharacterDto
  | RelationshipsMovieDto
  | RelationshipsPlanetDto
  | RelationshipsStarshipDto;

@Injectable()
export abstract class RelationshipsService {
  protected constructor(private readonly model: Model<StarWarsBase>) {}

  findOneByExtId(id: string): Promise<Document | null> {
    return this.model.findOne({ extId: id });
  }

  findByExtIds(id: string[]): Promise<Document[]> {
    return this.model.find({ extId: id });
  }

  abstract getRelationships(entity: StarWarsBase): GenericRelationship;
}
