import { Controller, Get, Param, Delete, Query } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { PaginationParamsDto } from '../shared/dto/pagination-params.dto';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  findAll(@Query() { page, limit }: PaginationParamsDto) {
    return this.charactersService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.charactersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.charactersService.remove(+id);
  }
}
