import { Injectable } from '@nestjs/common';
import { ESIService, IUniverseName } from '@new-eden-social/esi';

@Injectable()
export class SearchService {

  constructor(private esiService: ESIService) {
  }

  public async search(query: string): Promise<IUniverseName[]> {
    const searchResponse = await this.esiService.search(query);

    return await this.esiService.universeNames([
      ...(searchResponse.character ? searchResponse.character : []),
      ...(searchResponse.corporation ? searchResponse.corporation : []),
      ...(searchResponse.alliance ? searchResponse.alliance : []),
    ]);
  }

}
