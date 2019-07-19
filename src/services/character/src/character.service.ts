import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { Character } from './character.entity';
import { ZKillboardService } from '@new-eden-social/zkillboard';
import { IService } from '../../interfaces/service.interface';
import { IGetCharacterRoles, ESIService, ESIEntetyNotFoundException } from '@new-eden-social/esi';
import { CorporationService } from '@new-eden-social/api-corporation';
import { LoggerService } from '@new-eden-social/logger';
import { UtilsService } from '@new-eden-social/utils';
import { CharacterRepository } from './character.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Corporation } from '@new-eden-social/api-corporation';
import { Alliance } from '../../../services/alliance/src/alliance.entity';

@Injectable()
export class CharacterService implements IService<Character> {

  constructor(
    private readonly esiService: ESIService,
    private readonly loggerService: LoggerService,
    private readonly utilsService: UtilsService,
    private readonly zkillboardService: ZKillboardService,
    @InjectRepository(CharacterRepository)
    private readonly characterRepository: CharacterRepository,
    @Inject(forwardRef(() => CorporationService))
    private readonly corporationService: CorporationService,
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
