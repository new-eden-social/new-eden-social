import { Module } from '@nestjs/common';
import { LoggerModule } from './core/logger/logger.module';
import { UtilsModule } from './core/utils/utils.module';
import { KillmailModule } from './killmail/killmail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';
import { KillmailsStreamService } from './core/external/killmailsStream/killmailsStream.service';
import { KillmailService } from './killmail/killmail.service';
import { KillmailsStreamModule } from './core/external/killmailsStream/killmailsStream.module';

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
      logging: <LoggerOptions>process.env.DB_LOG,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: process.env.DB_SYNC === 'true',
    }),

    KillmailModule,
    KillmailsStreamModule,
  ],
})
export class KillmailsModule {
  constructor(
    private killmailsStreamService: KillmailsStreamService,
    private killmailService: KillmailService,
  ){
    this.killmailsStreamService.subscribe(killmailService.createFromStream);
  }
}
