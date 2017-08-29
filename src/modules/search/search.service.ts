import { Component } from '@nestjs/common';
import { ESIService } from '../external/esi/esi.service';
import { Character } from '../character/character.entity';
import { Corporation } from '../corporation/corporation.entity';
import { Alliance } from '../alliance/alliance.entity';

@Component()
export class SearchService {

  constructor(private esiService: ESIService) {
  }

  public async search(query: string): Promise<{
    characters: Character[],
    corporations: Corporation[],
    alliances: Alliance[],
  }> {
    const searchResponse = await this.esiService.search(query);

    let characters = [];
    let corporations = [];
    let alliances = [];

    // TODO: Limit characters/corporations/alliances to 20 or query is too long, meybe split and do more requests?

    if (searchResponse.character) {
      characters = await this.esiService.characterNames(searchResponse.character.slice(0, 20));
    }
    if (searchResponse.corporation) {
      corporations = await this.esiService.corporationNames(searchResponse.corporation.slice(0, 20));
    }
    if (searchResponse.alliance) {
      alliances = await this.esiService.allianceNames(searchResponse.alliance.slice(0, 20));
    }

    return { characters, corporations, alliances };
  }

}
