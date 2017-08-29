import { Component } from '@nestjs/common';
import { IService } from '../../interfaces/service.interface';
import { DatabaseService } from '../database/database.service';
import { Repository } from 'typeorm';
import { Character } from './character.entity';
import { ESIService } from '../external/esi/esi.service';
import { ZKillboardService } from '../external/zkillboard/zkillboard.service';
import * as zKillboard from '../external/zkillboard/zkillboard.interface';

@Component()
export class CharactersService implements IService<Character> {

  constructor(private databaseService: DatabaseService,
              private esiService: ESIService,
              private zkillboardService: ZKillboardService) {
  }

  private get repository(): Promise<Repository<Character>> {
    return this.databaseService.getRepository(Character);
  }

  /**
   * Get character data
   * @param id
   * @return {Promise<Character>}
   */
  public async get(id: number): Promise<Character> {
    let character = await (await this.repository).findOneById(id);

    // If character wasn't created yet, create fresh instance
    // And store it in db
    if (!character) {
      character = new Character();
      character.id = id;
      await (await this.repository).persist(character);
    }

    const esiChar = await this.esiService.getCharacter(id);
    character.populateESI(esiChar);

    const esiPortrait = await this.esiService.getCharacterPortrait(id);
    character.populateESIPortrait(esiPortrait);

    const zkillChar = await this.zkillboardService.characterStatistics(id);
    character.populateZKillboard(zkillChar);

    return character;
  }
}
