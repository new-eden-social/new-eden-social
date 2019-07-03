import { forwardRef, Module } from '@nestjs/common';
import { CorporationController } from './corporation.controller';
import { CorporationService } from './corporation.service';
import { ZKillboardModule } from '@new-eden-social/zkillboard';
import { ESIModule } from '@new-eden-social/esi';
import { CharacterModule } from '../character/character.module';
import { AllianceModule } from '../alliance/alliance.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CorporationRepository } from './corporation.repository';
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
    TypeOrmModule.forFeature([CorporationRepository]),

    ZKillboardModule,
    ESIModule,
    forwardRef(() => CharacterModule),
    forwardRef(() => AllianceModule),
    forwardRef(() => FollowModule),
    forwardRef(() => PostModule),
  ],
  controllers: [
    CorporationController,
  ],
  providers: [
    CorporationService,
  ],
  exports: [
    CorporationService,
  ],
})
export class CorporationModule {
}
