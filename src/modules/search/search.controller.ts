import { Controller, Get, HttpStatus, Query, Response } from '@nestjs/common';
import { SearchService } from './search.service';
import { DSearch } from './search.dto';

@Controller('search')
export class SearchController {

  constructor(private searchService: SearchService) {
  }

  @Get()
  public async search(@Response() res, @Query('query') query) {
    const data = await this.searchService.search(query);

    const response = new DSearch(data);

    res.status(HttpStatus.OK).json(response);
  }

}
