import { Component } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Repository } from 'typeorm';
import { Character } from './character.entity';
import { ZKillboardService } from '../external/zkillboard/zkillboard.service';
import { ESIService } from '../external/esi/esi.service';

@Component()
export class CharactersService {

  constructor(
    private databaseService: DatabaseService,
    private zkillboardService: ZKillboardService,
    private esiService: ESIService,
  ) {
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
    // Find character in database
    const character = await this.findCharacterById(id);

    const zkillChar = await this.zkillboardService.characterStatistics(id);
    character.populateZKillboard(zkillChar);

    return character;
  }

  public async update(id: number): Promise<Character> {
    const character = await this.findCharacterById(id);
    character.populateESI(await this.esiService.getCharacter(id));
    character.updatedAt = new Date();

    return (await this.repository).persist(character);
  }

  /**
   * Find character in db. If it doesn't exists, create it.
   * @param {number} id
   * @return {Promise<Character>}
   */
  private async findCharacterById(id: number) {
    let character = await (await this.repository).findOneById(id);

    // If character not in DB, load it from ESI
    if (!character) {
      character = new Character();
      character.id = id;
      character.populateESI(await this.esiService.getCharacter(id));

      await (await this.repository).persist(character);
    }

    return character;
  }
}
