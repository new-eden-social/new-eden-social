import { forwardRef, Module, RequestMethod } from '@nestjs/common';
import { AllianceService } from './alliance.service';
import { AllianceController } from './alliance.controller';
import { allianceProviders } from './alliance.providers';
import { ESIModule } from '../external/esi/esi.module';
import { ZKillboardModule } from '../external/zkillboard/zkillboard.module';
import { CorporationModule } from '../corporation/corporation.module';
import { AllianceExistsMiddleware } from './alliance.exists.middleware';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { DatabaseModule } from '../database/database.module';

@Module({
  modules: [
    DatabaseModule,
    ZKillboardModule,
    ESIModule,
    forwardRef(() => CorporationModule),
  ],
  controllers: [
    AllianceController,
  ],
  components: [
    ...allianceProviders,
    AllianceService,
  ],
  exports: [
    AllianceService,
  ],
})
export class AllianceModule {
  configure(consumer: MiddlewaresConsumer) {
    consumer.apply(AllianceExistsMiddleware)
    .forRoutes({
      path: 'alliance/:allianceId', method: RequestMethod.GET,
    });
  }
}
