import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { DSearch } from './search.dto';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { SearchGrpcClient } from '@new-eden-social/services-search';

@ApiUseTags('search')
@Controller('search')
export class SearchController {

  constructor(private readonly searchClient: SearchGrpcClient) {
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
    const searchResponse = await this.searchClient.service.search({ query }).toPromise();
    return new DSearch(searchResponse.results);
  }

}
