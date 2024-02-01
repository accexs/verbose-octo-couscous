import { FetchResponseCharacterDto } from '../../characters/dto/fetch-response-character.dto';
import { FetchResponseMovieDto } from '../../movies/dto/fetch-response-movie.dto';
import { FetchResponseStarshipDto } from '../../starships/dto/fetch-response-starship.dto';
import { FetchResponsePlanetDto } from '../../planets/dto/fetch-response-planet.dto';

export type FetchResponseGeneric = {
  count: number;
  next: string;
  previous: string;
  results: Array<
    | FetchResponseCharacterDto
    | FetchResponseMovieDto
    | FetchResponseStarshipDto
    | FetchResponsePlanetDto
  >;
};
