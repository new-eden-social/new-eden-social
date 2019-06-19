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

@Module({
  imports: [
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
