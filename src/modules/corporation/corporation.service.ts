import { Component, forwardRef, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ZKillboardService } from '../external/zkillboard/zkillboard.service';
import { ESIService } from '../external/esi/esi.service';
import { IService } from '../../interfaces/service.interface';
import { ESIEntetyNotFoundException } from '../external/esi/esi.exceptions';
import { Corporation } from './corporation.entity';
import { CORPORATION_REPOSITORY_TOKEN } from './corporation.constants';
import { CharacterService } from '../character/character.service';
import { AllianceService } from '../alliance/alliance.service';
import Log from '../../utils/Log';

@Component()
export class CorporationService implements IService<Corporation> {

  constructor(
    @Inject(CORPORATION_REPOSITORY_TOKEN) private corporationRepository: Repository<Corporation>,
    private zkillboardService: ZKillboardService,
    private esiService: ESIService,
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
    Log.debug('get corporation', id);

    // Find corporation in database
    const corporation = await this.findCorporationById(id);

    // If exists, populate
    if (corporation) {
      Log.debug('get corporation populating', id);
      const zkillCorporation = await this.zkillboardService.corporationStatistics(id);
      corporation.populateZKillboard(zkillCorporation);
    }
    Log.debug('get corporation populating done', id);

    return corporation;
  }

  /**
   * Update corporation by id
   * @param {Corporation} corporation
   * @return {Promise<Corporation>}
   */
  public async update(corporation: Corporation): Promise<Corporation> {
    const esiCorporation = await this.esiService.getCorporation(corporation.id);

    corporation.populateESI(esiCorporation);
    corporation.updatedAt = new Date();

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
    const foundCorporation = await this.corporationRepository.findOneById(id);

    if (foundCorporation) return foundCorporation;

    // If corporation not in DB, load it from ESI
    const corporation = new Corporation();
    corporation.id = id;

    const esiCorporation = await this.esiService.getCorporation(id);
    corporation.populateESI(esiCorporation);

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
        Log.debug('Corporation get alliance', allianceId);
        corporation.alliance = await this.allianceService.get(allianceId);
      }

      if (ceoId && ceoId !== 1) {
        Log.debug('Corporation get ceo character', ceoId);
        corporation.ceo = await this.characterService.get(ceoId);
      }

      if (creatorId && creatorId !== 1) {
        Log.debug('Corporation get creator character', creatorId);
        corporation.creator = await this.characterService.get(creatorId);
      }

      await this.corporationRepository.updateById(corporation.id, {
        alliance: corporation.alliance ? { id: corporation.alliance.id } : null,
        ceo: corporation.ceo ? { id: corporation.ceo.id } : null,
        creator: corporation.creator ? { id: corporation.creator.id } : null,
      });
    }
  }
}
