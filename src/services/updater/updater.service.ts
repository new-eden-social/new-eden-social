import { Injectable } from '@nestjs/common';
import { LoggerService } from '@new-eden-social/logger';
import { CharacterGrpcClient } from '@new-eden-social/services-character/grpc/character.grpc.client';
import { CorporationGrpcClient } from '@new-eden-social/services-corporation/grpc/corporation.grpc.client';
import { AllianceGrpcClient } from '@new-eden-social/services-alliance/grpc/alliance.grpc.client';

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
    const { characters } = await this.characterClient.service.getNotUpdated({
      interval: this.UPDATE_INTERVAL,
      limit: this.UPDATE_LIMIT,
    }).toPromise();
    for (const character of characters) {
      await this.characterClient.service.refresh({ characterId: character.id });
    }
  }

  /**
   * Update Corporations
   * @return {Promise<void>}
   */
  public async updateCorporations(): Promise<void> {
    const { corporations } = await this.corporationClient.service.getNotUpdated({
      interval: this.UPDATE_INTERVAL,
      limit: this.UPDATE_LIMIT,
    }).toPromise();
    for (const corporation of corporations) {
      await this.corporationClient.service.refresh({ corporationId: corporation.id });
    }
  }

  /**
   * Update Alliances
   * @return {Promise<void>}
   */
  public async updateAlliances(): Promise<void> {
    const { alliances } = await this.allianceClient.service.getNotUpdated({
      interval: this.UPDATE_INTERVAL,
      limit: this.UPDATE_LIMIT,
    }).toPromise();
    for (const alliance of alliances) {
      await this.allianceClient.service.refresh({ allianceId: alliance.id });
    }
  }
}
