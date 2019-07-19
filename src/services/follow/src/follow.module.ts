import { Module, OnModuleInit, forwardRef } from '@nestjs/common';
import { AuthenticationModule } from '../authentication/authentication.module';
import { CharacterModule } from '@new-eden-social/api-character/character.module';
import { CorporationModule } from '../corporation/corporation.module';
import { AllianceModule } from '../alliance/alliance.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandBus, EventBus, CqrsModule } from '@nestjs/cqrs';
import { ModuleRef } from '@nestjs/core';
import { NotificationModule } from '../notification/notification.module';
import { WebsocketModule } from '../websocket/websocket.module';
import { commandHandlers } from './commands/handlers';
import { eventHandlers } from './events/handlers';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';
import { FollowRepository } from './follow.repository';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';
import { LoggerModule } from '@new-eden-social/logger';
import { UtilsModule } from '@new-eden-social/utils';

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
    TypeOrmModule.forFeature([FollowRepository]),

    AuthenticationModule,
    forwardRef(() => CharacterModule),
    forwardRef(() => CorporationModule),
    forwardRef(() => AllianceModule),
    NotificationModule,
    WebsocketModule,
  ],
  controllers: [
    FollowController,
  ],
  providers: [
    FollowService,
    ...commandHandlers,
    ...eventHandlers,
  ],
  exports: [
    FollowService,
  ],
})
export class FollowModule implements OnModuleInit {
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
