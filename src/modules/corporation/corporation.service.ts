import { Component, forwardRef, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ZKillboardService } from '../external/zkillboard/zkillboard.service';
import { ESIService } from '../external/esi/esi.service';
import { IService } from '../../interfaces/service.interface';
import { ESIEntetyNotFoundException } from '../external/esi/esi.exceptions';
import { Corporation } from './corporation.entity';
import { CORPORATION_REPOSITORY_TOKEN } from './corporation.constants';
import { CharactersService } from '../character/character.service';

@Component()
export class CorporationService implements IService<Corporation> {

  constructor(
    @Inject(CORPORATION_REPOSITORY_TOKEN) private corporationRepository: Repository<Corporation>,
    private zkillboardService: ZKillboardService,
    private esiService: ESIService,
    @Inject(forwardRef(() => CharactersService))
    private characterService: CharactersService,
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
    corporation.populateESI(await this.esiService.getCorporation(corporation.id));
    corporation.updatedAt = new Date();

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

    if (esiCorporation.ceo_id !== 1 || esiCorporation.creator_id !== 1) {
      console.log(esiCorporation.ceo_id, esiCorporation.creator_id);
      // TODO: corporation.alliance = this.allianceService.get(esiCorporation.alliance_id)
      if (esiCorporation.ceo_id !== 1)
        corporation.ceo = await this.characterService.get(esiCorporation.ceo_id);

      if (esiCorporation.creator_id !== 1)
        corporation.creator = await this.characterService.get(esiCorporation.creator_id);

      await this.corporationRepository.save(corporation);
    }

    return corporation;
  }
}
