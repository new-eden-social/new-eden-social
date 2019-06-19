import { Module } from '@nestjs/common';
import { UpdaterService } from './updater.service';
import { CharacterModule } from '../character/character.module';
import { CorporationModule } from '../corporation/corporation.module';
import { AllianceModule } from '../alliance/alliance.module';
import { UtilsModule } from '../core/utils/utils.module';
import { LoggerModule } from '../core/logger/logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';

@Module({
  imports: [
    // Globals
    UtilsModule,
    LoggerModule,

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      logging: <LoggerOptions>process.env.DB_LOG,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: process.env.DB_SYNC === 'true',
    }),

    CharacterModule,
    CorporationModule,
    AllianceModule,
  ],
  providers: [
    UpdaterService,
  ],
})
export class UpdaterModule {
}
