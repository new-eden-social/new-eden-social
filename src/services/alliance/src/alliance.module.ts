import { Module } from '@nestjs/common';
import { AllianceService } from './alliance.service';
import { AllianceHttpController } from './http/alliance.http.controller';
import { AllianceGrpcController } from './grpc/alliance.grpc.controller';
import { ESIModule } from '@new-eden-social/esi';
import { ZKillboardModule } from '@new-eden-social/zkillboard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllianceRepository } from './alliance.repository';
import { LoggerModule } from '@new-eden-social/logger';
import { UtilsModule } from '@new-eden-social/utils';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';

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
      entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
      synchronize: process.env.DB_SYNC === 'true',
    }),

    TypeOrmModule.forFeature([AllianceRepository]),

    ZKillboardModule,
    ESIModule,
  ],
  controllers: [
    AllianceHttpController,
    AllianceGrpcController
  ],
  providers: [
    AllianceService,
  ],
})
export class AllianceModule {
}
