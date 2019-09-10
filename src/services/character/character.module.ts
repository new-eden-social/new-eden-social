import { Module } from '@nestjs/common';
import { CharacterService } from '@new-eden-social/services-character/character.service';
import { ZKillboardModule } from '@new-eden-social/zkillboard';
import { ESIModule } from '@new-eden-social/esi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterRepository } from '@new-eden-social/services-character/character.repository';
import { LoggerModule } from '@new-eden-social/logger';
import { UtilsModule } from '@new-eden-social/utils';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';
import { Character } from '@new-eden-social/services-character/character.entity';
import { CharacterGrpcController } from '@new-eden-social/services-character/grpc/character.grpc.controller';

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
      entities: [Character],
      synchronize: process.env.DB_SYNC === 'true',
    }),
    TypeOrmModule.forFeature([CharacterRepository]),

    ZKillboardModule,
    ESIModule,
  ],
  controllers: [
    CharacterGrpcController,
  ],
  providers: [
    CharacterService,
  ],
})
export class CharacterModule {
}
