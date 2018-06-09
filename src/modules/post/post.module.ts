import { Module, OnModuleInit } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { AuthenticationModule } from '../authentication/authentication.module';
import { CharacterModule } from '../character/character.module';
import { CorporationModule } from '../corporation/corporation.module';
import { AllianceModule } from '../alliance/alliance.module';
import { HashtagModule } from '../hashtag/hashtag.module';
import { UniverseLocationModule } from '../universe/location/location.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from './post.repository';
import { CommandBus, CQRSModule, EventBus } from '@nestjs/cqrs';
import { commandHandlers } from './commands/handlers';
import { eventHandlers } from './events/handlers';
import { ModuleRef } from '@nestjs/core';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    CQRSModule,
    TypeOrmModule.forFeature([PostRepository]),

    AuthenticationModule,
    CharacterModule,
    CorporationModule,
    AllianceModule,
    HashtagModule,
    UniverseLocationModule,
    NotificationModule,
  ],
  controllers: [
    PostController,
  ],
  providers: [
    PostService,
    ...commandHandlers,
    ...eventHandlers,
  ],
  exports: [
    PostService,
  ],
})
export class PostModule implements OnModuleInit {
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
