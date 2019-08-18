import { Injectable } from '@nestjs/common';
import { ESIEntetyNotFoundException, ESIService } from '@new-eden-social/esi';
import { Corporation } from './corporation.entity';
import { LoggerService } from '@new-eden-social/logger';
import { UtilsService } from '@new-eden-social/utils';
import { CorporationRepository } from './corporation.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CorporationService {

  constructor(
    private readonly utilsService: UtilsService,
    private readonly loggerService: LoggerService,
    private readonly esiService: ESIService,
    @InjectRepository(CorporationRepository)
    private readonly corporationRepository: CorporationRepository,
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
      if (!corporation) { corporations.push(await this.findCorporationById(id)); }
    }

    return corporations;
  }

  /**
   * refresh corporation by id, fetch from esi and store to db
   * @param {Corporation} corporation
   * @return {Promise<Character>}
   */
  public async refresh(corporation: Corporation): Promise<Corporation> {
    const esiCorporation = await this.esiService.getCorporation(corporation.id);
    corporation.populateESI(esiCorporation);
    return this.corporationRepository.save(corporation);
  }

  /**
   * Get corporations that haven't been updated in the interval
   * @param interval String
   * @param limit Number
   */
  public async getNotUpdated(interval: string, limit: number) {
    return this.corporationRepository.getNotUpdated(interval, limit);
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
      if (err instanceof ESIEntetyNotFoundException) { return false; }
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
    this.loggerService.debug(`get corporation ${id}`);
    const foundCorporation = await this.corporationRepository.findOne(id);

    if (foundCorporation) { return foundCorporation; }

    // If corporation not in DB, load it from ESI
    const corporation = new Corporation();
    corporation.id = id;

    const esiCorporation = await this.esiService.getCorporation(id);
    corporation.populateESI(esiCorporation);

    // Create handle
    corporation.handle = this.utilsService.createHandle(corporation.id, corporation.name);

    return this.corporationRepository.save(corporation);
  }
}
