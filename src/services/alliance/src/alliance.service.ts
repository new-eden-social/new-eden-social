import { Alliance } from './alliance.entity';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ESIService, ESIEntetyNotFoundException } from '@new-eden-social/esi';
import { ZKillboardService } from '@new-eden-social/zkillboard';
import { CorporationService } from '@new-eden-social/api-corporation';
import { Corporation } from '@new-eden-social/api-corporation';
import { LoggerService } from '@new-eden-social/logger';
import { UtilsService } from '@new-eden-social/utils';
import { AllianceRepository } from './alliance.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AllianceService {

  constructor(
    private readonly loggerService: LoggerService,
    private readonly utilsService: UtilsService,
    @InjectRepository(AllianceRepository)
    private readonly allianceRepository: AllianceRepository,
    @Inject(forwardRef(() => CorporationService))
    private readonly corporationService: CorporationService,
    @Inject(forwardRef(() => ZKillboardService)) // FIXME: This forwardRef probably isn't needed
    private readonly zkillboardService: ZKillboardService,
    @Inject(forwardRef(() => ESIService)) // FIXME: This forwardRef probably isn't needed
    private readonly esiService: ESIService,
  ) {
  }

  /**
   * Check if alliance exists
   * @param {number} id
   * @returns {Promise<Boolean>}
   */
  public async exists(id: number): Promise<Boolean> {
    try {
      await this.esiService.getAlliance(id);
    } catch (err) {
      if (err instanceof ESIEntetyNotFoundException) { return false; }
      throw err;
    }
    return true;
  }

  /**
   * Get Alliance by id
   * @param {number} id
   * @returns {Promise<Alliance>}
   */
  public async get(id: number): Promise<Alliance> {
    return this.findAllianceById(id);
  }

  /**
   * Get all alliances by ids
   * @param {number[]} ids
   * @returns {Promise<Alliance[]>}
   */
  public async getAllById(ids: number[]): Promise<Alliance[]> {
    const alliances = await this.allianceRepository.getAllByIds(ids);

    for (const id of ids) {
      const alliance = alliances.find(a => a.id === id);
      // If we didn't found in database, try to populate it
      if (!alliance) { alliances.push(await this.findAllianceById(id)); }
    }

    return alliances;
  }

  /**
   * Get alliance executor corporation
   * @param {number} id
   * @returns {Promise<Corporation>}
   */
  public async getExecutorCorporation(id: number): Promise<Corporation> {
    const alliance = await this.allianceRepository.findOne({
      where: { id },
      relations: ['executorCorporation'],
    });

    return alliance.executorCorporation;
  }

  /**
   * Update corporation by id
   * @param {Alliance} alliance
   * @return {Promise<Corporation>}
   */
  public async update(alliance: Alliance): Promise<Alliance> {
    const esiAlliance = await this.esiService.getAlliance(alliance.id);

    alliance.populateESI(esiAlliance);

    return this.allianceRepository.save(alliance);
  }

  /**
   * Find alliance by id
   * @param {number} id
   * @returns {Promise<Alliance>}
   */
  private async findAllianceById(id: number) {
    this.loggerService.debug(`get alliance ${id}`);
    const foundAlliance = await this.allianceRepository.findOne(
      id,
      { relations: ['executorCorporation'] },
    );

    if (foundAlliance) { return foundAlliance; }

    // If alliance not in DB, load it from ESI
    const alliance = new Alliance();
    alliance.id = id;

    const esiAlliance = await this.esiService.getAlliance(id);
    alliance.populateESI(esiAlliance);

    // Create handle
    alliance.handle = this.utilsService.createHandle(alliance.id, alliance.name);

    // Save without corporation
    await this.allianceRepository.save(alliance);

    if (esiAlliance.executor_corporation_id && esiAlliance.executor_corporation_id !== 1) {
      this.loggerService.debug(
        'Alliance get executor corporation', esiAlliance.executor_corporation_id);
      // Load corporation
      alliance.executorCorporation =
        await this.corporationService.get(esiAlliance.executor_corporation_id);
      this.loggerService.debug(
        'Alliance done get executor corporation', esiAlliance.executor_corporation_id);

      // Update corporation id
      await this.allianceRepository.update(alliance.id, {
        executorCorporation: { id: alliance.executorCorporation.id },
      });
    }

    return alliance;
  }
}
