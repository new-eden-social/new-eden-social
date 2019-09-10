import { Module } from '@nestjs/common';
import { KillmailService } from './killmail.service';
import { KillmailParticipantModule } from './participant/participant.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KillmailRepository } from './killmail.repository';
import { ZKillboardModule } from '@new-eden-social/zkillboard';
import { LoggerModule } from '@new-eden-social/logger';
import { UtilsModule } from '@new-eden-social/utils';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';
import { Killmail } from './killmail.entity';
import { KillmailParticipant } from './participant/participant.entity';
import { KillmailGrpcController } from './grpc/killmail.grpc.controller';

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
      entities: [Killmail, KillmailParticipant],
      synchronize: process.env.DB_SYNC === 'true',
    }),
    TypeOrmModule.forFeature([KillmailRepository]),

    KillmailParticipantModule,
    ZKillboardModule,
  ],
  providers: [
    KillmailService,
  ],
  controllers: [
    KillmailGrpcController,
  ]
})
export class KillmailModule {
}
