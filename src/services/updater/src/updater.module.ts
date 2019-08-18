import { Module } from '@nestjs/common';
import { UpdaterService } from './updater.service';
import { UtilsModule } from '@new-eden-social/utils';
import { LoggerModule } from '@new-eden-social/logger';
import { CharacterGrpcModule } from '@new-eden-social/api-character';
import { AllianceGrpcModule } from '@new-eden-social/api-alliance';
import { CorporationGrpcModule } from '@new-eden-social/api-corporation';

@Module({
  imports: [
    // Globals
    UtilsModule,
    LoggerModule,

    CharacterGrpcModule,
    CorporationGrpcModule,
    AllianceGrpcModule,
  ],
  providers: [
    UpdaterService,
  ],
})
export class UpdaterModule {
}
