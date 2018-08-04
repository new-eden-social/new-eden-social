import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { ZKillboardService } from '../core/external/zkillboard/zkillboard.service';
import { ESIService } from '../core/external/esi/esi.service';
import { IService } from '../../interfaces/service.interface';
import { ESIEntetyNotFoundException } from '../core/external/esi/esi.exceptions';
import { Corporation } from './corporation.entity';
import { CharacterService } from '../character/character.service';
import { AllianceService } from '../alliance/alliance.service';
import { LoggerService } from '../core/logger/logger.service';
import { UtilsService } from '../core/utils/utils.service';
import { CorporationRepository } from './corporation.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CorporationService implements IService<Corporation> {

  constructor(
    private utilsService: UtilsService,
    private loggerService: LoggerService,
    private esiService: ESIService,
    private zkillboardService: ZKillboardService,
    @InjectRepository(CorporationRepository)
    private corporationRepository: CorporationRepository,
    @Inject(forwardRef(() => CharacterService))
    private characterService: CharacterService,
    @Inject(forwardRef(() => AllianceService))
    private allianceService: AllianceService,
  ) {
  }

  /**
   * Get corporation data
   * @param id
   * @return {Promise<Corporation>}
   */
  public async get(id: number): Promise<Corporation> {
    return this.findCorporationById(id);
  }

  /**
   * Get all corporations by ids
   * @param {number[]} ids
   * @returns {Promise<Corporation[]>}
   */
  public async getAllById(ids: number[]): Promise<Corporation[]> {
    const corporations = await this.corporationRepository.getAllByIds(ids);

    for (const id of ids) {
      const corporation = corporations.find(c => c.id === id);
      // If we didn't found in database, try to populate it
      if (!corporation) corporations.push(await this.findCorporationById(id));
    }

    return corporations;
  }

  /**
   * Update corporation by id
   * @param {Corporation} corporation
   * @return {Promise<Corporation>}
   */
  public async update(corporation: Corporation): Promise<Corporation> {
    const esiCorporation = await this.esiService.getCorporation(corporation.id);

    corporation.populateESI(esiCorporation);

    await this.updateCeoAndCreatorAndAlliance(
      corporation,
      esiCorporation.ceo_id,
      esiCorporation.creator_id,
      esiCorporation.alliance_id,
    );

    return this.corporationRepository.save(corporation);
  }

  /**
   * Check if entity by id exists
   * @param {number} id
   * @return {Promise<Boolean>}
   */
  public async exists(id: number): Promise<Boolean> {
    try {
      await this.esiService.getCorporation(id);
    } catch (err) {
      if (err instanceof ESIEntetyNotFoundException) return false;
      throw err;
    }
    return true;
  }

  /**
   * Find corporation in db. If it doesn't exists, create it.
   * @param {number} id
   * @return {Promise<Corporation>}
   */
  private async findCorporationById(id: number) {
    this.loggerService.debug('get corporation ' + id);
    const foundCorporation = await this.corporationRepository.findOne(id);

    if (foundCorporation) return foundCorporation;

    // If corporation not in DB, load it from ESI
    const corporation = new Corporation();
    corporation.id = id;

    const esiCorporation = await this.esiService.getCorporation(id);
    corporation.populateESI(esiCorporation);

    // Create handle
    corporation.handle = this.utilsService.createHandle(corporation.id, corporation.name);

    await this.corporationRepository.save(corporation);

    // Populate ceo/creator/alliance
    await this.updateCeoAndCreatorAndAlliance(
      corporation,
      esiCorporation.ceo_id,
      esiCorporation.creator_id,
      esiCorporation.alliance_id,
    );

    return corporation;
  }

  /**
   * Update CEO and Creator
   * @param {Corporation} corporation
   * @param {number} ceoId
   * @param {number} creatorId
   * @param {number} allianceId
   * @returns {Promise<void>}
   */
  private async updateCeoAndCreatorAndAlliance(
    corporation: Corporation,
    ceoId: number,
    creatorId: number,
    allianceId: number,
  ): Promise<void> {
    // id = 1 means that ceo/creator isn't a real character (but a npc?)
    if (ceoId !== 1 || creatorId !== 1 || allianceId !== 1) {
      if (allianceId && allianceId !== 1) {
        this.loggerService.debug('Corporation get alliance', allianceId);
        corporation.alliance = await this.allianceService.get(allianceId);
      }

      if (ceoId && ceoId !== 1) {
        this.loggerService.debug('Corporation get ceo character', ceoId);
        corporation.ceo = await this.characterService.get(ceoId);
      }

      if (creatorId && creatorId !== 1) {
        this.loggerService.debug('Corporation get creator character', creatorId);
        corporation.creator = await this.characterService.get(creatorId);
      }

      await this.corporationRepository.update(corporation.id, {
        alliance: corporation.alliance ? { id: corporation.alliance.id } : null,
        ceo: corporation.ceo ? { id: corporation.ceo.id } : null,
        creator: corporation.creator ? { id: corporation.creator.id } : null,
      });
    }
  }
}
