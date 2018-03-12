import { Component, forwardRef, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Character } from './character.entity';
import { ZKillboardService } from '../common/external/zkillboard/zkillboard.service';
import { ESIService } from '../common/external/esi/esi.service';
import { CHARACTER_REPOSITORY_TOKEN } from './character.constants';
import { IService } from '../../interfaces/service.interface';
import { ESIEntetyNotFoundException } from '../common/external/esi/esi.exceptions';
import { CorporationService } from '../corporation/corporation.service';
import { IGetCharacterRoles } from '../common/external/esi/esi.interface';
import Log from '../../utils/Log';
import { Utils } from '../../utils/utils.static';

@Component()
export class CharacterService implements IService<Character> {

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
    Log.debug('get character', id);
    // Find character in database
    const character = await this.findCharacterById(id);

    Log.debug('get character populating', id);
    const zkillChar = await this.zkillboardService.characterStatistics(id);
    character.populateZKillboard(zkillChar);
    Log.debug('get character done populating', id);

    return character;
  }

  /**
   * Get all characters by ids
   * @param {number[]} ids
   * @returns {Promise<Character[]>}
   */
  public async getAllById(ids: number[]): Promise<Character[]> {
    const characters = await this.characterRepository.createQueryBuilder('character')
    .where('character.id IN (:ids)', { ids })
    .leftJoinAndSelect('character.corporation', 'corporation')
    .leftJoinAndSelect('corporation.alliance', 'alliance')
    .getMany();

    for (const id of ids) {
      const character = characters.find(c => c.id === id);
      // If we didn't found in database, try to populate it
      if (!character) characters.push(await this.findCharacterById(id));
    }

    for (const key in characters) {
      const zkillChar = await this.zkillboardService.characterStatistics(characters[key].id);
      characters[key].populateZKillboard(zkillChar);
    }

    return characters;
  }

  /**
   * Update character by id
   * @param {Character} character
   * @return {Promise<Character>}
   */
  public async update(character: Character): Promise<Character> {
    const esiCharacter = await this.esiService.getCharacter(character.id);
    character.populateESI(esiCharacter);
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
   * Get character corporation roles
   * @param {number} id
   * @returns {Promise<IGetCharacterRoles>}
   */
  public async getRoles(id: number): Promise<IGetCharacterRoles> {
    return this.esiService.getCharacterRoles(id);
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

    // Create handle
    character.handle = Utils.createHandle(character.id, character.name);

    // Save without corporation
    await this.characterRepository.save(character);

    if (esiCharacter.corporation_id && esiCharacter.corporation_id !== 1) {
      Log.debug('Character get corporation', esiCharacter.corporation_id);
      // Load corporation
      character.corporation = await this.corporationService.get(esiCharacter.corporation_id);

      // Update corporation id
      await this.characterRepository.updateById(character.id, {
        corporation: { id: character.corporation.id },
      });
    }

    return character;
  }
}
