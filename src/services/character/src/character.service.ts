import { Injectable } from '@nestjs/common';
import { Character } from './character.entity';
import { IGetCharacterRoles, ESIService, ESIEntetyNotFoundException } from '@new-eden-social/esi';
import { LoggerService } from '@new-eden-social/logger';
import { UtilsService } from '@new-eden-social/utils';
import { CharacterRepository } from './character.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CharacterService {

  constructor(
    private readonly esiService: ESIService,
    private readonly loggerService: LoggerService,
    private readonly utilsService: UtilsService,
    @InjectRepository(CharacterRepository)
    private readonly characterRepository: CharacterRepository,
  ) {
  }

  /**
   * Get character data
   * @param id
   * @return {Promise<Character>}
   */
  public async get(id: number): Promise<Character> {
    return this.findCharacterById(id);
  }

  /**
   * Update character by id
   * @param {Character} character
   * @return {Promise<Character>}
   */
  public async update(character: Character): Promise<Character> {
    const esiCharacter = await this.esiService.getCharacter(character.id);
    character.populateESI(esiCharacter);

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
      if (err instanceof ESIEntetyNotFoundException) { return false; }
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

  public async findInCorporation(
    corporationId: number,
  ): Promise<Character[]> {
    return this.characterRepository.findForCorporation(corporationId);
  }

  public async findInAlliance(
    allianceId: number,
  ): Promise<Character[]> {
    return this.characterRepository.findForAlliance(allianceId);
  }

  /**
   * Find character in db. If it doesn't exists, create it.
   * @param {number} id
   * @return {Promise<Character>}
   */
  private async findCharacterById(id: number) {
    this.loggerService.debug(`get character ${id}`);
    const foundCharacter = await this.characterRepository.findOne(id);

    if (foundCharacter) { return foundCharacter; }

    // If character not in DB, load it from ESI
    const character = new Character();
    character.id = id;

    const esiCharacter = await this.esiService.getCharacter(id);
    character.populateESI(esiCharacter);

    // Create handle
    character.handle = this.utilsService.createHandle(character.id, character.name);

    return this.characterRepository.save(character);
  }
}
