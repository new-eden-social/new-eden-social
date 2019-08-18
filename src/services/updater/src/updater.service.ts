import { Injectable, OnModuleInit } from '@nestjs/common';
import { LoggerService } from '@new-eden-social/logger';
import { CharacterGrpcClient } from '@new-eden-social/api-character';

@Injectable()
export class UpdaterService {

  private readonly UPDATE_INTERVAL = '1 hour';
  private readonly UPDATE_LIMIT = 100;

  constructor(
    private readonly loggerService: LoggerService,
    private readonly characterClient: CharacterGrpcClient,
  ) {
  }

  /**
   * Update Characters
   * @return {Promise<void>}
   */
  public async updateCharacters(): Promise<void> {
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
      this.characterClient.service.get(id).toPromise()
      .then(character => this.characterClient.service.update(character));
    });
  }

  /**
   * Update Corporations
   * @return {Promise<void>}
   */
  public async updateCorporations(): Promise<void> {
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
  public async updateAlliances(): Promise<void> {
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
