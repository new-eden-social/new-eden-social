import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { DSearch } from './search.dto';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('search')
@Controller('search')
export class SearchController {

  constructor(private searchService: SearchService) {
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: DSearch,
    description: 'Search for characters/corporations/alliances',
  })
  @Get()
  public async search(
    @Query('query') query: string,
  ): Promise<DSearch> {
    const data = await this.searchService.search(query);
    return new DSearch(data);
  }

}
