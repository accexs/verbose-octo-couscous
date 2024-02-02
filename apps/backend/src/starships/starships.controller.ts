import { Controller, Get, Param, Delete, Query } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { PaginationParamsDto } from '../shared/dto/pagination-params.dto';

@Controller('starships')
export class StarshipsController {
  constructor(private readonly starshipsService: StarshipsService) {}

  @Get()
  findAll(@Query() { page, limit }: PaginationParamsDto) {
    return this.starshipsService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.starshipsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.starshipsService.remove(+id);
  }
}
