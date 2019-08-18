import { CommandBus, EventBus, CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { NotificationService } from './notification.service';
import { NotificationRepository } from './notification.repository';
import { commandHandlers } from './commands/handlers';
import { eventHandlers } from './events/handlers';
import { LoggerModule } from '@new-eden-social/logger';
import { UtilsModule } from '@new-eden-social/utils';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';
import { Notification } from 'rxjs';

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
      entities: [Notification],
      synchronize: process.env.DB_SYNC === 'true',
    }),
    CqrsModule,
    TypeOrmModule.forFeature([NotificationRepository]),
  ],
  controllers: [
  ],
  providers: [
    NotificationService,
    ...commandHandlers,
    ...eventHandlers,
  ],
})
export class NotificationModule {
}
