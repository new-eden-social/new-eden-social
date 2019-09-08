import { Injectable, OnModuleInit } from '@nestjs/common';
import { LoggerService } from '@new-eden-social/logger';
import { CharacterGrpcClient } from '@new-eden-social/api-character';
import { CorporationGrpcClient } from '@new-eden-social/api-corporation';
import { AllianceGrpcClient } from '@new-eden-social/api-alliance';

@Injectable()
export class UpdaterService {

  private readonly UPDATE_INTERVAL = '1 hour';
  private readonly UPDATE_LIMIT = 100;

  constructor(
    private readonly loggerService: LoggerService,
    private readonly characterClient: CharacterGrpcClient,
    private readonly corporationClient: CorporationGrpcClient,
    private readonly allianceClient: AllianceGrpcClient,
  ) {
  }

  /**
   * Update Characters
   * @return {Promise<void>}
   */
  public async updateCharacters(): Promise<void> {
    const characters = await this.characterClient.service
    .getNotUpdated(this.UPDATE_INTERVAL, this.UPDATE_LIMIT).toPromise();
    for (const character of characters) {
      await this.characterClient.service.refresh(character.id);
    }
  }

  /**
   * Update Corporations
   * @return {Promise<void>}
   */
  public async updateCorporations(): Promise<void> {
    const corporations = await this.corporationClient.service
    .getNotUpdated(this.UPDATE_INTERVAL, this.UPDATE_LIMIT).toPromise();
    for (const corporation of corporations) {
      await this.corporationClient.service.refresh(corporation.id);
    }
  }

  /**
   * Update Alliances
   * @return {Promise<void>}
   */
  public async updateAlliances(): Promise<void> {
    const alliances = await this.allianceClient.service
    .getNotUpdated(this.UPDATE_INTERVAL, this.UPDATE_LIMIT).toPromise();
    for (const alliance of alliances) {
      await this.allianceClient.service.refresh(alliance.id);
    }
  }
}
