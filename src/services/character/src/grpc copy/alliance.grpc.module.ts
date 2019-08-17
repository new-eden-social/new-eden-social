import { Module } from '@nestjs/common';
import { AllianceClient } from '@new-eden-social/api-follow';

@Module({
  exports: [
    AllianceClient
  ]
})
export class AllianceGRPCModule {
}
