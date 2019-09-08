import { Module } from '@nestjs/common';
import { MetascraperService } from './metascraper.service';
import { LoggerModule } from '@new-eden-social/logger';
import { UtilsModule } from '@new-eden-social/utils';
import { MetascraperGrpcController } from './grpc/metascraper.grpc.controller';

@Module({
  imports: [
    LoggerModule,
    UtilsModule,
  ],
  providers: [
    MetascraperService,
  ],
  controllers: [
    MetascraperGrpcController,
  ],
})
export class MetascraperModule {
}
