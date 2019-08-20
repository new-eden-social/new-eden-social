import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowService } from './follow.service';
import { FollowRepository } from './follow.repository';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';
import { LoggerModule } from '@new-eden-social/logger';
import { UtilsModule } from '@new-eden-social/utils';
import { FollowGrpcController } from './grpc/follow.grpc.controller';
import { AllianceGrpcModule } from '@new-eden-social/api-alliance';
import { Follow } from './follow.entity';
import { CorporationGrpcModule } from '@new-eden-social/api-corporation';
import { CharacterGrpcModule } from '@new-eden-social/api-character';

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
      entities: [Follow],
      synchronize: process.env.DB_SYNC === 'true',
    }),
    TypeOrmModule.forFeature([FollowRepository]),

    AllianceGrpcModule,
    CorporationGrpcModule,
    CharacterGrpcModule,
  ],
  controllers: [
    FollowGrpcController,
  ],
  providers: [
    FollowService,
  ],
})
export class FollowModule {
}
