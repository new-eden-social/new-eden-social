import { Component } from '@nestjs/common';
import { ESIService } from '../external/esi/esi.service';
import { AllianceName, CorporationName } from '../external/esi/esi.interface';
import { Character } from '../character/character.entety';

@Component()
export class SearchService {

  // TODO: what if i want to provide token to constructor?
  constructor(private esiService: ESIService) {
  }

  public async search(query: string): Promise<{
    characters: Character[],
    corporations: CorporationName[],
    alliances: AllianceName[],
  }> {
    const searchResponse = await this.esiService.search(query);

    let characters = [];
    let corporations = [];
    let alliances = [];

    if (searchResponse.character) {
      characters = await this.esiService.characterNames(searchResponse.character);
    }
    if (searchResponse.corporation) {
      corporations = await this.esiService.corporationNames(searchResponse.corporation);
    }
    if (searchResponse.alliance) {
      alliances = await this.esiService.allianceNames(searchResponse.alliance);
    }

    return { characters, corporations, alliances };
  }

}
