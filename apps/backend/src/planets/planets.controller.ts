import { Controller, Get, Param, Delete, Query } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PaginationParamsDto } from '../shared/dto/pagination-params.dto';

@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Get()
  findAll(@Query() { page, limit }: PaginationParamsDto) {
    return this.planetsService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planetsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planetsService.remove(+id);
  }
}
