import { Component, Inject } from '@nestjs/common';
import { CharacterService } from '../character/character.service';
import { CHARACTER_REPOSITORY_TOKEN } from '../character/character.constants';
import { CorporationService } from '../corporation/corporation.service';
import { CORPORATION_REPOSITORY_TOKEN } from '../corporation/corporation.constants';
import { ALLIANCE_REPOSITORY_TOKEN } from '../alliance/alliance.constants';
import { AllianceService } from '../alliance/alliance.service';
import { CharacterRepository } from '../character/character.repository';
import { CorporationRepository } from '../corporation/corporation.repository';
import { AllianceRepository } from '../alliance/alliance.repository';
import { LoggerService } from '../core/logger/logger.service';

@Component()
export class UpdaterService {

  private readonly LOOP_INTERVAL = 60000; // 1min timeout
  private readonly UPDATE_INTERVAL = '1 hour';
  private readonly UPDATE_LIMIT = 100;

  constructor(
    private characterService: CharacterService,
    private corporationService: CorporationService,
    private allianceService: AllianceService,
    private loggerService: LoggerService,
    @Inject(CHARACTER_REPOSITORY_TOKEN)
    private characterRepository: CharacterRepository,
    @Inject(CORPORATION_REPOSITORY_TOKEN)
    private corporationRepository: CorporationRepository,
    @Inject(ALLIANCE_REPOSITORY_TOKEN)
    private allianceRepository: AllianceRepository,
  ) {
    this.loop();
    setInterval(this.loop.bind(this), this.LOOP_INTERVAL);
  }

  /**
   * Main Loop
   */
  private loop(): void {
    Promise.all([
      this.updateCharacters(),
      this.updateCorporations(),
      this.updateAlliances(),
    ])
    .then(() => {
      this.loggerService.info('Update loop done');
    });
  }

  /**
   * Update Characters
   * @return {Promise<void>}
   */
  private async updateCharacters(): Promise<void> {
    const idsStream = await this.characterRepository
    .createQueryBuilder('character')
    .select('id')
    .where(`"updatedAt" < (NOW() - interval '${this.UPDATE_INTERVAL}')`)
    .limit(this.UPDATE_LIMIT)
    .stream();

    idsStream.on('error', (err) => {
      throw err;
    });

    idsStream.on('data', ({ id }) => {
      this.characterService.get(id)
      .then(character => this.characterService.update(character));
    });
  }

  /**
   * Update Corporations
   * @return {Promise<void>}
   */
  private async updateCorporations(): Promise<void> {
    const idsStream = await this.corporationRepository
    .createQueryBuilder('corporation')
    .select('id')
    .where(`"updatedAt" < (NOW() - interval '${this.UPDATE_INTERVAL}')`)
    .limit(this.UPDATE_LIMIT)
    .stream();

    idsStream.on('error', (err) => {
      throw err;
    });

    idsStream.on('data', ({ id }) => {
      this.corporationService.get(id)
      .then(corporation => this.corporationService.update(corporation));
    });
  }

  /**
   * Update Alliances
   * @return {Promise<void>}
   */
  private async updateAlliances(): Promise<void> {
    const idsStream = await this.allianceRepository
    .createQueryBuilder('alliance')
    .select('id')
    .where(`"updatedAt" < (NOW() - interval '${this.UPDATE_INTERVAL}')`)
    .limit(this.UPDATE_LIMIT)
    .stream();

    idsStream.on('error', (err) => {
      throw err;
    });

    idsStream.on('data', ({ id }) => {
      this.allianceService.get(id)
      .then(alliance => this.allianceService.update(alliance));
    });
  }
}
