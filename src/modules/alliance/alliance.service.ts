import { Repository } from 'typeorm';
import { Alliance } from './alliance.entity';
import { forwardRef, Inject } from '@nestjs/common';
import { ALLIANCE_REPOSITORY_TOKEN } from './alliance.constants';
import { IService } from '../../interfaces/service.interface';
import { ESIService } from '../common/external/esi/esi.service';
import { ZKillboardService } from '../common/external/zkillboard/zkillboard.service';
import { CorporationService } from '../corporation/corporation.service';
import { ESIEntetyNotFoundException } from '../common/external/esi/esi.exceptions';
import Log from '../../utils/Log';
import { Corporation } from '../corporation/corporation.entity';

export class AllianceService implements IService<Alliance> {

  constructor(
    @Inject(ALLIANCE_REPOSITORY_TOKEN) private allianceRepository: Repository<Alliance>,
    @Inject(forwardRef(() => CorporationService))
    private corporationService: CorporationService,
    @Inject(forwardRef(() => ZKillboardService)) // FIXME: This forwardRef probably isn't needed
    private zkillboardService: ZKillboardService,
    @Inject(forwardRef(() => ESIService)) // FIXME: This forwardRef probably isn't needed
    private esiService: ESIService,
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
      if (err instanceof ESIEntetyNotFoundException) return false;
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
    Log.debug('get alliance', id);
    // Find alliance in database
    const alliance = await this.findAllianceById(id);

    Log.debug('get alliance populating', id);
    const zkillAlliance = await this.zkillboardService.allianceStatistics(id);
    alliance.populateZKillboard(zkillAlliance);
    Log.debug('get alliance done populating', id);

    return alliance;
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
   * Find alliance by id
   * @param {number} id
   * @returns {Promise<Alliance>}
   */
  private async findAllianceById(id: number) {
    const foundAlliance = await this.allianceRepository.findOneById(
      id,
      { relations: ['executorCorporation'] });

    if (foundAlliance) return foundAlliance;

    // If alliance not in DB, load it from ESI
    const alliance = new Alliance();
    alliance.id = id;

    const esiAlliance = await this.esiService.getAlliance(id);
    alliance.populateESI(esiAlliance);

    // Save without corporation
    await this.allianceRepository.save(alliance);

    if (esiAlliance.executor_corporation_id && esiAlliance.executor_corporation_id !== 1) {
      Log.debug('Alliance get executor corporation', esiAlliance.executor_corporation_id);
      // Load corporation
      alliance.executorCorporation =
        await this.corporationService.get(esiAlliance.executor_corporation_id);
      Log.debug('Alliance done get executor corporation', esiAlliance.executor_corporation_id);

      // Update corporation id
      await this.allianceRepository.updateById(alliance.id, {
        executorCorporation: { id: alliance.executorCorporation.id },
      });
    }

    return alliance;
  }
}
