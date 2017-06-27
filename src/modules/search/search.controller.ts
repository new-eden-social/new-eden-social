import { Response, Param, Controller, Get, Post, Body, HttpStatus, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {

  constructor(private searchService: SearchService) {
  }

  @Get()
  public async search(@Response() res, @Query('search') query) {
    const data = await this.searchService.search(query);

    res.status(HttpStatus.OK).json(data);
  }

}
