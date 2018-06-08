import { CommandBus, CQRSModule, EventBus } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from '../authentication/authentication.module';
import { Module, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { NotificationController } from './notification.controller';
import { NotificationGateway } from './notification.gateway';
import { NotificationService } from './notification.service';
import { NotificationRepository } from './notification.repository';
import { commandHandlers } from './commands/handlers';
import { eventHandlers } from './events/handlers';

@Module({
  imports: [
    CQRSModule,
    TypeOrmModule.forFeature([NotificationRepository]),

    AuthenticationModule,
  ],
  controllers: [
    NotificationController,
  ],
  providers: [
    NotificationGateway,
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
