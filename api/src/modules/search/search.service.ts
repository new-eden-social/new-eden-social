import { Injectable } from '@nestjs/common';
import { ESIService } from '../core/external/esi/esi.service';
import { IUniverseName } from '../core/external/esi/esi.interface';

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
