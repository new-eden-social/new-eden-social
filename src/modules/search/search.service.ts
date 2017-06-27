import { Component } from '@nestjs/common';
import { EveService } from '../external/eve/eve.service';
import { AllianceName, CharacterName, CorporationName } from '../external/eve/eve.interface';

@Component()
export class SearchService {

  // TODO: what if i want to provide token to constructor?
  constructor(private eveService: EveService) {
  }

  public async search(query: string): Promise<{
    characters: Array<CharacterName>,
    corporations: Array<CorporationName>,
    alliances: Array<AllianceName>
  }> {
    const searchResponse = await this.eveService.search(query);

    let characters = [];
    let corporations = [];
    let alliances= [];

    if (searchResponse.character) {
      characters = await this.eveService.characterNames(searchResponse.character);
    }
    if (searchResponse.corporation) {
      corporations = await this.eveService.corporationNames(searchResponse.corporation);
    }
    if (searchResponse.alliance) {
      alliances = await this.eveService.allianceNames(searchResponse.alliance);
    }

    return { characters, corporations, alliances }
  }

}
