import { Component } from '@nestjs/common';
import { IService } from '../../interfaces/service.interface';
import { DatabaseService } from '../database/database.service';
import { Repository } from 'typeorm';
import { Character } from './character.entity';
import { ZKillboardService } from '../external/zkillboard/zkillboard.service';

@Component()
export class CharactersService implements IService<Character> {

  constructor(
    private databaseService: DatabaseService,
    private zkillboardService: ZKillboardService,
  ) {
  }

  private get repository(): Promise<Repository<Character>> {
    return this.databaseService.getRepository(Character);
  }

  /**
   * Store new character to DB
   * @param {Character} newCharacter
   * @return {Promise<Character>}
   */
  public async createCharacter(newCharacter: Character): Promise<Character> {
    return (await this.repository).persist(newCharacter);
  }

  /**
   * Get character data
   * @param id
   * @return {Promise<Character>}
   */
  public async get(id: number): Promise<Character> {
    // Find character in database
    const character = await (await this.repository).findOneById(id);

    const zkillChar = await this.zkillboardService.characterStatistics(id);
    character.populateZKillboard(zkillChar);

    return character;
  }
}
