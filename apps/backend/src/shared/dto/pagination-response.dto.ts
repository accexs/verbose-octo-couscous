import { StarWarsBase } from '../entities/starWarsBase.entity';

export class PaginationResponseDto {
  total: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
  data: StarWarsBase[];
}
