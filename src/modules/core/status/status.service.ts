import { Injectable, Inject } from '@nestjs/common';
import { ESIService } from '../external/esi/esi.service';
import { IStatus } from './status.interface';

@Injectable()
export class StatusService {

  constructor(
    private esiService: ESIService,
  ) {
  }

  async status(): Promise<IStatus> {
    const esiStatus = await this.esiService.status();

    return {
      esi: esiStatus,
      state: 'OK',
      version: process.env.npm_package_version,
    };
  }
}
