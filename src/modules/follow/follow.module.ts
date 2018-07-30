import { Module, OnModuleInit, forwardRef } from '@nestjs/common';
import { AuthenticationModule } from '../authentication/authentication.module';
import { CharacterModule } from '../character/character.module';
import { CorporationModule } from '../corporation/corporation.module';
import { AllianceModule } from '../alliance/alliance.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandBus, CQRSModule, EventBus } from '@nestjs/cqrs';
import { ModuleRef } from '@nestjs/core';
import { NotificationModule } from '../notification/notification.module';
import { WebsocketModule } from '../websocket/websocket.module';
import { commandHandlers } from './commands/handlers';
import { eventHandlers } from './events/handlers';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';
import { FollowRepository } from './follow.repository';

@Module({
  imports: [
    CQRSModule,
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
    // FIXME: Nasty hack, for some reason onModuleInit isn't executed
    this.onModuleInit();
  }

  onModuleInit() {
    this.command$.setModuleRef(this.moduleRef);
    this.event$.setModuleRef(this.moduleRef);

    this.event$.register(eventHandlers);
    this.command$.register(commandHandlers);
  }
}
