import {
    TerminusEndpoint,
    TerminusOptionsFactory,
    DNSHealthIndicator,
    TerminusModuleOptions,
    TypeOrmHealthIndicator,
  } from '@nestjs/terminus';
import { Injectable } from '@nestjs/common';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable()
  export class TerminusOptionsService implements TerminusOptionsFactory {
  constructor(
      private readonly dns: DNSHealthIndicator,
      private readonly typeorm: TypeOrmHealthIndicator,
    ) {}

  createTerminusOptions(): TerminusModuleOptions {
    const healthEndpoint: TerminusEndpoint = {
      url: '/health',
      healthIndicators: [
        async () => this.dns.pingCheck('esi', process.env.ESI_ENDPOINT),
        async () => this.dns.pingCheck('zkillboard', process.env.ZKILLBOARD_ENDPOINT),
        async () => this.typeorm.pingCheck('database'),
      ],
    };
    return {
      endpoints: [healthEndpoint],
    };
  }
}
