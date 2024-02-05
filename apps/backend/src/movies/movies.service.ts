import { Injectable, Logger } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from './entities/movie.entity';
import { Model } from 'mongoose';
import {
  fetchAndPaginate,
  getExternalId,
  getPopulateRelationships,
  getUpsertPayload,
  loggUpsertResult,
  paginate,
} from '../shared/utils';
import { FetchResponseMovieDto } from './dto/fetch-response-movie.dto';
import { PaginationResponseDto } from '../shared/dto/pagination-response.dto';
import { RelationshipsService } from '../shared/relationships.service';
import { RelationshipsMovieDto } from './dto/relationships-movie.dto';

@Injectable()
export class MoviesService extends RelationshipsService {
  private readonly logger = new Logger(MoviesService.name);

  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Movie.name) private readonly movieModel: Model<Movie>,
  ) {
    super(movieModel);
  }

  async findAll(page = 1, limitValue = 10): Promise<PaginationResponseDto> {
    return paginate(this.movieModel, page, limitValue);
  }

  findOne(id: string): Promise<MovieDocument | null> {
    return this.movieModel
      .findById(id)
      .populate(getPopulateRelationships(this.movieModel));
  }

  async fetchAll(): Promise<void> {
    const swapiUrl = 'https://swapi.dev/api/films';
    const movieListGenerator = fetchAndPaginate(swapiUrl, this.httpService);

    for await (const movieList of movieListGenerator) {
      const curatedList = movieList.map(
        (movie: FetchResponseMovieDto): CreateMovieDto => {
          return {
            title: movie.title,
            episodeId: movie.episode_id,
            openingCrawl: movie.opening_crawl,
            director: movie.director,
            producer: movie.producer,
            releaseDate: movie.release_date,
            extId: getExternalId(movie.url),
            extCharacterIds: movie.characters.map((characterUrl) =>
              getExternalId(characterUrl),
            ),
            extStarshipIds: movie.starships.map((starshipUrl) =>
              getExternalId(starshipUrl),
            ),
            extPlanetIds: movie.planets.map((planetUrl) =>
              getExternalId(planetUrl),
            ),
          };
        },
      );
      this.logger.log(`Inserting [${curatedList.length}] entities`);
      await this.upsert(curatedList);
    }
  }

  async upsert(movieList: Movie[]) {
    const result = await this.movieModel.bulkWrite(getUpsertPayload(movieList));
    loggUpsertResult(this.logger, result);
  }

  getRelationships(movie: Movie): RelationshipsMovieDto {
    return {
      characters: movie.extCharacterIds,
      planets: movie.extPlanetIds,
      starships: movie.extStarshipIds,
    };
  }
}
