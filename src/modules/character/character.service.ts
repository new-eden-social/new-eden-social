import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { Character } from './character.entity';
import { ZKillboardService } from '../core/external/zkillboard/zkillboard.service';
import { ESIService } from '../core/external/esi/esi.service';
import { IService } from '../../interfaces/service.interface';
import { ESIEntetyNotFoundException } from '../core/external/esi/esi.exceptions';
import { CorporationService } from '../corporation/corporation.service';
import { IGetCharacterRoles } from '../core/external/esi/esi.interface';
import { LoggerService } from '../core/logger/logger.service';
import { UtilsService } from '../core/utils/utils.service';
import { CharacterRepository } from './character.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Corporation } from '../corporation/corporation.entity';
import { Alliance } from '../alliance/alliance.entity';

@Injectable()
export class CharacterService implements IService<Character> {

  constructor(
    private esiService: ESIService,
    private loggerService: LoggerService,
    private utilsService: UtilsService,
    private zkillboardService: ZKillboardService,
    @InjectRepository(CharacterRepository)
    private characterRepository: CharacterRepository,
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
    this.loggerService.debug('get character', id);
    // Find character in database
    const character = await this.findCharacterById(id);

    this.loggerService.debug('get character populating', id);
    const zkillChar = await this.zkillboardService.characterStatistics(id);
    character.populateZKillboard(zkillChar);
    this.loggerService.debug('get character done populating', id);

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

  public async findInCorporation(
    corporation: Corporation,
  ): Promise<Character[]> {
    return this.characterRepository.findForCorporation(corporation);
  }

  public async findInAlliance(
    alliance: Alliance,
  ): Promise<Character[]> {
    return this.characterRepository.findForAlliance(alliance);
  }

  /**
   * Find character in db. If it doesn't exists, create it.
   * @param {number} id
   * @return {Promise<Character>}
   */
  private async findCharacterById(id: number) {
    const foundCharacter = await this.characterRepository.findOne(id);

    if (foundCharacter) return foundCharacter;

    // If character not in DB, load it from ESI
    const character = new Character();
    character.id = id;

    const esiCharacter = await this.esiService.getCharacter(id);
    character.populateESI(esiCharacter);

    // Create handle
    character.handle = this.utilsService.createHandle(character.id, character.name);

    // Save without corporation
    await this.characterRepository.save(character);

    if (esiCharacter.corporation_id && esiCharacter.corporation_id !== 1) {
      this.loggerService.debug('Character get corporation', esiCharacter.corporation_id);
      // Load corporation
      character.corporation = await this.corporationService.get(esiCharacter.corporation_id);

      // Update corporation id
      await this.characterRepository.update(character.id, {
        corporation: { id: character.corporation.id },
      });
    }

    return character;
  }
}
