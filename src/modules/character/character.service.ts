import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Character } from './character.entity';
import { ZKillboardService } from '../external/zkillboard/zkillboard.service';
import { ESIService } from '../external/esi/esi.service';
import { CHARACTER_REPOSITORY_TOKEN } from './character.constants';

@Component()
export class CharactersService {

  constructor(
    @Inject(CHARACTER_REPOSITORY_TOKEN) private characterRepository: Repository<Character>,
    private zkillboardService: ZKillboardService,
    private esiService: ESIService,
  ) {
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

  /**
   * Update character by id
   * @param {number} id
   * @return {Promise<Character>}
   */
  public async update(id: number): Promise<Character> {
    const character = await this.findCharacterById(id);
    character.populateESI(await this.esiService.getCharacter(id));
    character.updatedAt = new Date();

    return this.characterRepository.save(character);
  }

  /**
   * Find character in db. If it doesn't exists, create it.
   * @param {number} id
   * @return {Promise<Character>}
   */
  private async findCharacterById(id: number) {
    let character = await this.characterRepository.findOneById(id);

    // If character not in DB, load it from ESI
    if (!character) {
      character = new Character();
      character.id = id;
      character.populateESI(await this.esiService.getCharacter(id));

      await this.characterRepository.save(character);
    }

    return character;
  }
}
