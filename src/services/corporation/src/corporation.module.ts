import { Module } from '@nestjs/common';
import { CorporationService } from './corporation.service';
import { ZKillboardModule } from '@new-eden-social/zkillboard';
import { ESIModule } from '@new-eden-social/esi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CorporationRepository } from './corporation.repository';
import { LoggerModule } from '@new-eden-social/logger';
import { UtilsModule } from '@new-eden-social/utils';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';
import { Corporation } from './corporation.entity';
import { CorporationGrpcController } from './grpc/corporation.grpc.controller';

@Module({
  imports: [
    LoggerModule,
    UtilsModule,

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      logging: process.env.DB_LOG as LoggerOptions,
      entities: [Corporation],
      synchronize: process.env.DB_SYNC === 'true',
    }),
    TypeOrmModule.forFeature([CorporationRepository]),

    ZKillboardModule,
    ESIModule,
  ],
  controllers: [
    CorporationGrpcController
  ],
  providers: [
    CorporationService,
  ],
})
export class CorporationModule {
}
