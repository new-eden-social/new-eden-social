import { Component, forwardRef, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Character } from './character.entity';
import { ZKillboardService } from '../external/zkillboard/zkillboard.service';
import { ESIService } from '../external/esi/esi.service';
import { CHARACTER_REPOSITORY_TOKEN } from './character.constants';
import { IService } from '../../interfaces/service.interface';
import { ESIEntetyNotFoundException } from '../external/esi/esi.exceptions';
import { CorporationService } from '../corporation/corporation.service';

@Component()
export class CharactersService implements IService<Character> {

  constructor(
    @Inject(CHARACTER_REPOSITORY_TOKEN) private characterRepository: Repository<Character>,
    private zkillboardService: ZKillboardService,
    private esiService: ESIService,
    @Inject(forwardRef(() => CorporationService))
    private corporationService: CorporationService,
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
   * @param {Character} character
   * @return {Promise<Character>}
   */
  public async update(character: Character): Promise<Character> {
    const esiCharacter = await this.esiService.getCharacter(character.id);
    character.populateESI(esiCharacter);
    character.updatedAt = new Date();
    character.corporation = await this.corporationService.get(esiCharacter.corporation_id);

    return this.characterRepository.save(character);
  }

  /**
   * Check if entity by id exists
   * @param {number} id
   * @return {Promise<Boolean>}
   */
  public async exists(id: number): Promise<Boolean> {
    try {
      await this.esiService.getCharacter(id);
    } catch (err) {
      if (err instanceof ESIEntetyNotFoundException) return false;
      throw err;
    }
    return true;
  }

  /**
   * Find character in db. If it doesn't exists, create it.
   * @param {number} id
   * @return {Promise<Character>}
   */
  private async findCharacterById(id: number) {
    const foundCharacter = await this.characterRepository.findOneById(id);

    if (foundCharacter) return foundCharacter;

    // If character not in DB, load it from ESI
    const character = new Character();
    character.id = id;

    const esiCharacter = await this.esiService.getCharacter(id);
    character.populateESI(esiCharacter);

    // Save without corporation
    await this.characterRepository.save(character);

    // Load corporation
    character.corporation = await this.corporationService.get(esiCharacter.corporation_id);

    // Update corporation id
    await this.characterRepository.updateById(character.id, {
      corporation: { id: character.corporation.id },
    });

    return character;
  }
}
