import { Repository } from 'typeorm';
import { Alliance } from './alliance.entity';
import { forwardRef, Inject } from '@nestjs/common';
import { ALLIANCE_REPOSITORY_TOKEN } from './alliance.constants';
import { IService } from '../../interfaces/service.interface';
import { ESIService } from '../external/esi/esi.service';
import { ZKillboardService } from '../external/zkillboard/zkillboard.service';
import { CorporationService } from '../corporation/corporation.service';
import { ESIEntetyNotFoundException } from '../external/esi/esi.exceptions';

export class AllianceService implements IService<Alliance> {

  constructor(
    @Inject(ALLIANCE_REPOSITORY_TOKEN) private allianceRepository: Repository<Alliance>,
    private esiService: ESIService,
    private zkillboardService: ZKillboardService,
    @Inject(forwardRef(() => CorporationService))
    private corporationService: CorporationService,
  ) {
  }

  public async exists(id: number): Promise<Boolean> {
    try {
      await this.esiService.getAlliance(id);
    } catch (err) {
      if (err instanceof ESIEntetyNotFoundException) return false;
      throw err;
    }
    return true;
  }

  public async get(id: number): Promise<Alliance> {
    // Find alliance in database
    const alliance = await this.findAllianceById(id);

    const zkillAlliance = await this.zkillboardService.allianceStatistics(id);
    alliance.populateZKillboard(zkillAlliance);

    return alliance;
  }

  private async findAllianceById(id: number) {
    const foundAlliance = await this.allianceRepository.findOneById(id);

    if (foundAlliance) return foundAlliance;

    // If alliance not in DB, load it from ESI
    const alliance = new Alliance();
    alliance.id = id;

    const esiAlliance = await this.esiService.getAlliance(id);
    alliance.populateESI(esiAlliance);

    // Save without corporation
    await this.allianceRepository.save(alliance);

    // Load corporation
    alliance.executorCorporation = await this.corporationService.get(esiAlliance.executor_corp);

    // Update corporation id
    await this.allianceRepository.updateById(alliance.id, {
      executorCorporation: { id: alliance.executorCorporation.id },
    });

    return alliance;
  }
}
