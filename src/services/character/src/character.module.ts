import { forwardRef, Module } from '@nestjs/common';
import { CharactersController } from './character.controller';
import { CharacterService } from './character.service';
import { ZKillboardModule } from '@new-eden-social/zkillboard';
import { ESIModule } from '@new-eden-social/esi';
import { CorporationModule } from '../corporation/corporation.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterRepository } from './character.repository';
import { FollowModule } from '../follow/follow.module';
import { PostModule } from '../post/post.module';
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
    TypeOrmModule.forFeature([CharacterRepository]),

    ZKillboardModule,
    ESIModule,
    forwardRef(() => CorporationModule),
    forwardRef(() => FollowModule),
    forwardRef(() => PostModule),
  ],
  controllers: [
    CharactersController,
  ],
  providers: [
    CharacterService,
  ],
  exports: [
    CharacterService,
  ],
})
export class CharacterModule {
}
