import { CommandBus, EventBus, CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from '../authentication/authentication.module';
import { Module, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { NotificationRepository } from './notification.repository';
import { commandHandlers } from './commands/handlers';
import { eventHandlers } from './events/handlers';
import { WebsocketModule } from '../websocket/websocket.module';
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
    CqrsModule,
    TypeOrmModule.forFeature([NotificationRepository]),

    AuthenticationModule,
    WebsocketModule,
  ],
  controllers: [
    NotificationController,
  ],
  providers: [
    NotificationService,
    ...commandHandlers,
    ...eventHandlers,
  ],
  exports: [
    NotificationService,
  ],
})
export class NotificationModule implements OnModuleInit {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly command$: CommandBus,
    private readonly event$: EventBus,
  ) {
  }

  onModuleInit() {
    // this.command$.setModuleRef(this.moduleRef);
    // this.event$.setModuleRef(this.moduleRef);

    // this.event$.register(eventHandlers);
    // this.command$.register(commandHandlers);
  }
}
