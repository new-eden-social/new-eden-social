import { Module } from '@nestjs/common';
import { UpdaterService } from './updater.service';
import { UtilsModule } from '@new-eden-social/utils';
import { LoggerModule } from '@new-eden-social/logger';
import { CharacterGrpcModule } from '@new-eden-social/services-character/grpc/character.grpc.module';
import { AllianceGrpcModule } from '@new-eden-social/services-alliance/grpc/alliance.grpc.module';
import { CorporationGrpcModule } from '@new-eden-social/services-corporation/grpc/corporation.grpc.module';

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
