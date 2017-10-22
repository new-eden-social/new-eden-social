import { Component, forwardRef, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ZKillboardService } from '../external/zkillboard/zkillboard.service';
import { ESIService } from '../external/esi/esi.service';
import { IService } from '../../interfaces/service.interface';
import { ESIEntetyNotFoundException } from '../external/esi/esi.exceptions';
import { Corporation } from './corporation.entity';
import { CORPORATION_REPOSITORY_TOKEN } from './corporation.constants';
import { CharacterService } from '../character/character.service';

@Component()
export class CorporationService implements IService<Corporation> {

  constructor(
    @Inject(CORPORATION_REPOSITORY_TOKEN) private corporationRepository: Repository<Corporation>,
    private zkillboardService: ZKillboardService,
    private esiService: ESIService,
    @Inject(forwardRef(() => CharacterService))
    private characterService: CharacterService,
  ) {
  }

  /**
   * Get corporation data
   * @param id
   * @return {Promise<Corporation>}
   */
  public async get(id: number): Promise<Corporation> {
    // Find corporation in database
    const corporation = await this.findCorporationById(id);

    // If exists, populate
    if (corporation) {
      const zkillCorporation = await this.zkillboardService.corporationStatistics(id);
      corporation.populateZKillboard(zkillCorporation);
    }

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

    await this.updateCeoAndCreator(corporation, esiCorporation.ceo_id, esiCorporation.creator_id);

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
    await this.updateCeoAndCreator(corporation, esiCorporation.ceo_id, esiCorporation.creator_id);

    return corporation;
  }

  /**
   * Update CEO and Creator
   * @param {Corporation} corporation
   * @param {number} ceoId
   * @param {number} creatorId
   * @returns {Promise<void>}
   */
  private async updateCeoAndCreator(
    corporation: Corporation,
    ceoId: number,
    creatorId: number,
  ): Promise<void> {
    // id = 1 means that ceo/creator isn't a real character (but a npc?)
    if (ceoId !== 1 || creatorId !== 1) {
      // TODO: corporation.alliance = this.allianceService.get(esiCorporation.alliance_id)

      if (ceoId !== 1)
        corporation.ceo = await this.characterService.get(ceoId);

      if (creatorId !== 1)
        corporation.creator = await this.characterService.get(creatorId);

      await this.corporationRepository.save(corporation);
    }
  }
}
