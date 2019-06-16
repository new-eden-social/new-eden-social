import { Injectable } from '@nestjs/common';
import { ESIService } from '../external/esi/esi.service';
import { IStatus, IESIStatus } from './status.interface';

@Injectable()
export class StatusService {

  constructor(
    private esiService: ESIService,
  ) {
  }

  async status(): Promise<IStatus> {
    const esiStatus = await this.esiStatus();

    return {
      esi: esiStatus,
      state: 'OK',
      version: process.env.npm_package_version,
    };
  }

  async esiStatus(): Promise<IESIStatus> {
    try {
      const esiStatus = await this.esiService.status();
      return {
        players: esiStatus.players,
        serverVersion: esiStatus.server_version,
        startTime: esiStatus.start_time,
        state: 'OK',
      };
    } catch (exception) {
      return {
        exception: exception.message,
        state: 'NOK',
      };
    }
  }
}
