import { Module, OnModuleInit } from '@nestjs/common';
import { CorporationModule } from '../corporation/corporation.module';
import { AllianceModule } from '../alliance/alliance.module';
import { PostModule } from '../post/post.module';
import { CommentService } from './comment.service';
import { CharacterModule } from '../character/character.module';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';
import { CommandBus, CQRSModule, EventBus } from '@nestjs/cqrs';
import { ModuleRef } from '@nestjs/core';
import { eventHandlers } from './events/handlers';
import { commandHandlers } from './commands/handlers';

@Module({
  imports: [
    CQRSModule,
    TypeOrmModule.forFeature([CommentRepository]),

    CorporationModule,
    AllianceModule,
    CharacterModule,
    PostModule,
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
