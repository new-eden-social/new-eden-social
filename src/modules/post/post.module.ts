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
import { PostNotificationSagas } from './sagas/notification.saga';
import { commandHandlers } from './commands/handlers';
import { eventHandlers } from './events/handlers';
import { ModuleRef } from '@nestjs/core';

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
  ],
  controllers: [
    PostController,
  ],
  providers: [
    PostService,
    PostNotificationSagas,
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
    private readonly postNotificationSagas: PostNotificationSagas,
  ) {
  }
  onModuleInit() {
    this.command$.setModuleRef(this.moduleRef);
    this.event$.setModuleRef(this.moduleRef);

    this.event$.register(eventHandlers);
    this.command$.register(commandHandlers);
    this.event$.combineSagas([this.postNotificationSagas.postCreated]);
  }
}
