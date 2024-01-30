import { Injectable, Logger } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from './entities/movie.entity';
import { Model } from 'mongoose';
import {
  getExternalId,
  getUpsertPayload,
  loggUpsertResult,
} from '../shared/utils';
import { FetchResponseMovieDto } from './dto/fetch-response-movie.dto';

@Injectable()
export class MoviesService {
  private readonly logger = new Logger(MoviesService.name);

  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Movie.name) private readonly movieModel: Model<Movie>,
  ) {}

  create(createMovieDto: CreateMovieDto) {
    return 'This action adds a new movie';
  }

  findAll(): Promise<MovieDocument[]> {
    return this.movieModel.find();
  }

  findOne(id: number): Promise<MovieDocument | null> {
    return this.movieModel.findById(id);
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }

  async fetchAll(): Promise<Movie[]> {
    const { data } = await firstValueFrom(
      this.httpService.get('https://swapi.dev/api/films'),
    );
    this.logger.log(`Inserting [${data.results.length}] entities`);
    const movieList = data.results.map(
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
    await this.upsert(movieList);
    return movieList;
  }

  async upsert(movieList: Movie[]) {
    const result = await this.movieModel.bulkWrite(getUpsertPayload(movieList));
    loggUpsertResult(this.logger, result);
  }
}
