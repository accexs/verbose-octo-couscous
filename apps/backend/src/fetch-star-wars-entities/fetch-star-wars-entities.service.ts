import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CharactersService } from '../characters/characters.service';
import { MoviesService } from '../movies/movies.service';
import { PlanetsService } from '../planets/planets.service';
import { StarshipsService } from '../starships/starships.service';

@Injectable()
export class FetchStarWarsEntitiesService {
  private readonly logger = new Logger(FetchStarWarsEntitiesService.name);

  constructor(
    private readonly charactersService: CharactersService,
    private readonly moviesService: MoviesService,
    private readonly planetsService: PlanetsService,
    private readonly starshipsService: StarshipsService,
  ) {}

  @Cron('*/30 * * * *')
  async handleCron() {
    return;
    this.logger.log('Fetching entities');
    await Promise.all([
      this.charactersService.fetchAll(),
      this.moviesService.fetchAll(),
      this.planetsService.fetchAll(),
      this.starshipsService.fetchAll(),
    ]);
    // TODO: add relationship builder
  }
}
