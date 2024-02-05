import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CharactersService } from '../characters/characters.service';
import { MoviesService } from '../movies/movies.service';
import { PlanetsService } from '../planets/planets.service';
import { StarshipsService } from '../starships/starships.service';
import { Character } from '../characters/entities/character.entity';
import { Movie } from '../movies/entities/movie.entity';
import { Planet } from '../planets/entities/planet.entity';
import { Starship } from '../starships/entities/starship.entity';

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
    this.logger.log('Fetching and importing entities');
    await Promise.all([
      // this.charactersService.fetchAll(),
      // this.moviesService.fetchAll(),
      // this.planetsService.fetchAll(),
      // this.starshipsService.fetchAll(),
    ]);
    this.logger.log('Initiating relationships');
    await Promise.all([
      this.setCharacterRelationships(),
      this.setMoviesRelationships(),
      this.setPlanetsRelationships(),
      this.setStarshipsRelationships(),
    ]);
    this.logger.log('Fetching completed');
  }

  async setMoviesRelationships() {
    const allMovies = await this.moviesService.findAll(1, 0);
    const payload: Movie[] = await Promise.all(
      allMovies.data.map(async (movie: Movie) => {
        const relationships = this.moviesService.getRelationships(movie);
        const characters = await this.charactersService.findByExtIds(
          relationships.characters,
        );

        const starships = await this.starshipsService.findByExtIds(
          relationships.starships,
        );

        const planets = await this.planetsService.findByExtIds(
          relationships.planets,
        );

        return {
          _id: movie._id,
          extId: movie.extId,
          characters: characters.map((character) => character._id),
          starships: starships.map((starship) => starship._id),
          planets: planets.map((planet) => planet._id),
        } as Movie;
      }),
    );
    await this.moviesService.upsert(payload);
  }

  async setPlanetsRelationships() {
    const allPlanets = await this.planetsService.findAll(1, 0);
    const payload: Planet[] = await Promise.all(
      allPlanets.data.map(async (planet: Planet) => {
        const relationships = this.planetsService.getRelationships(planet);

        const residents = await this.charactersService.findByExtIds(
          relationships.residents,
        );

        const movies = await this.moviesService.findByExtIds(
          relationships.movies,
        );

        return {
          _id: planet._id,
          extId: planet.extId,
          movies: movies.map((movie) => movie._id),
          residents: residents.map((resident) => resident._id),
        } as Planet;
      }),
    );
    await this.planetsService.upsert(payload);
  }

  async setStarshipsRelationships() {
    const allStarships = await this.starshipsService.findAll(1, 0);
    const payload: Starship[] = await Promise.all(
      allStarships.data.map(async (starship: Starship) => {
        const relationships = this.starshipsService.getRelationships(starship);

        const pilots = await this.charactersService.findByExtIds(
          relationships.pilots,
        );

        const movies = await this.moviesService.findByExtIds(
          relationships.movies,
        );

        return {
          _id: starship._id,
          extId: starship.extId,
          pilots: pilots.map((pilot) => pilot._id),
          movies: movies.map((movie) => movie._id),
        } as Starship;
      }),
    );
    await this.starshipsService.upsert(payload);
  }

  async setCharacterRelationships() {
    const allCharacters = await this.charactersService.findAll(1, 0);
    const payload: Character[] = await Promise.all(
      allCharacters.data.map(async (character: Character) => {
        const relationships =
          this.charactersService.getRelationships(character);

        const planet = await this.planetsService.findOneByExtId(
          relationships.planet,
        );

        const movies = await this.moviesService.findByExtIds(
          relationships.movies,
        );

        const starships = await this.starshipsService.findByExtIds(
          relationships.starships,
        );

        return {
          _id: character._id,
          extId: character.extId,
          planet: planet?._id,
          movies: movies.map((movie) => movie._id),
          starships: starships.map((starship) => starship._id),
        } as Character;
      }),
    );
    await this.charactersService.upsert(payload);
  }
}
