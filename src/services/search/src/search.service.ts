import { Injectable } from '@nestjs/common';
import { ESIService, IUniverseName } from '@new-eden-social/esi';

@Injectable()
export class SearchService {

  constructor(private readonly esiService: ESIService) {
  }

  public async search(query: string): Promise<IUniverseName[]> {
    const searchResponse = await this.esiService.search(query);

    return this.esiService.universeNames([
      ...(searchResponse.character ? searchResponse.character : []),
      ...(searchResponse.corporation ? searchResponse.corporation : []),
      ...(searchResponse.alliance ? searchResponse.alliance : []),
    ]);
  }

}
