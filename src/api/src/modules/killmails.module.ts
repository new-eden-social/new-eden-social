import { Module } from '@nestjs/common';
import { LoggerModule } from '@new-eden-social/logger';
import { UtilsModule } from '@new-eden-social/utils';
import { KillmailModule } from './killmail/killmail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';
import { KillmailsStreamService, KillmailsStreamModule } from '@new-eden-social/killmails-stream';
import { KillmailService } from './killmail/killmail.service';

@Module({
  imports: [
    // Global
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

    KillmailModule,
    KillmailsStreamModule,
  ],
})
export class KillmailsModule {
  constructor(
    private readonly killmailsStreamService: KillmailsStreamService,
    private readonly killmailService: KillmailService,
  ) {
    this.killmailsStreamService.subscribe(killmailService.createFromStream);
  }
}
