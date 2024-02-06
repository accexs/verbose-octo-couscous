import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { HttpService } from '@nestjs/axios';
import { getModelToken } from '@nestjs/mongoose';
import { DeepMocked } from '@golevelup/ts-jest';
import { Movie } from './entities/movie.entity';

describe('MoviesService', () => {
  let moviesService: MoviesService;
  let httpService: DeepMocked<HttpService>;

  const mockMovieModel = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: HttpService,
          useValue: httpService,
        },
        {
          provide: getModelToken(Movie.name),
          useValue: mockMovieModel,
        },
      ],
    }).compile();

    moviesService = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(moviesService).toBeDefined();
  });
});
