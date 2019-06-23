import { Module, OnModuleInit } from '@nestjs/common';
import { CorporationModule } from '../corporation/corporation.module';
import { AllianceModule } from '../alliance/alliance.module';
import { PostModule } from '../post/post.module';
import { CommentService } from './comment.service';
import { CharacterModule } from '../character/character.module';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';
import { ModuleRef } from '@nestjs/core';
import { eventHandlers } from './events/handlers';
import { commandHandlers } from './commands/handlers';
import { WebsocketModule } from '../websocket/websocket.module';
import { CqrsModule, CommandBus, EventBus } from '@nestjs/cqrs';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([CommentRepository]),

    CorporationModule,
    AllianceModule,
    CharacterModule,
    PostModule,
    WebsocketModule,
  ],
  controllers: [
    CommentController,
  ],
  providers: [
    CommentService,
    ...commandHandlers,
    ...eventHandlers,
  ],
  exports: [
    CommentService,
  ],
})
export class CommentModule implements OnModuleInit {
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
