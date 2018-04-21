import { forwardRef, Module, RequestMethod } from '@nestjs/common';
import { AllianceService } from './alliance.service';
import { AllianceController } from './alliance.controller';
import { allianceProviders } from './alliance.providers';
import { ESIModule } from '../core/external/esi/esi.module';
import { ZKillboardModule } from '../core/external/zkillboard/zkillboard.module';
import { CorporationModule } from '../corporation/corporation.module';
import { AllianceExistsMiddleware } from './alliance.exists.middleware';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { DatabaseModule } from '../core/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    ZKillboardModule,
    ESIModule,
    forwardRef(() => CorporationModule),
  ],
  controllers: [
    AllianceController,
  ],
  providers: [
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
      path: 'alliances/:allianceId', method: RequestMethod.GET,
    });
  }
}
