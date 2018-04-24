import { MiddlewaresConsumer, Module, OnModuleInit, RequestMethod } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { DatabaseModule } from '../core/database/database.module';
import { AuthenticationModule } from '../authentication/authentication.module';
import { CharacterModule } from '../character/character.module';
import { postProviders } from './post.providers';
import { CharacterExistsMiddleware } from '../character/character.exists.middleware';
import { CorporationModule } from '../corporation/corporation.module';
import { CorporationExistsMiddleware } from '../corporation/corporation.exists.middleware';
import { AllianceModule } from '../alliance/alliance.module';
import { AllianceExistsMiddleware } from '../alliance/alliance.exists.middleware';
import { HashtagModule } from '../hashtag/hashtag.module';
import { UniverseLocationModule } from '../universe/location/location.module';
import { CommandBus, CQRSModule, EventBus } from '@nestjs/cqrs';
import { ModuleRef } from '@nestjs/core';
import { PostNotificationSagas } from './sagas/notification.saga';
import { commandHandlers } from './commands/handlers';
import { eventHandlers } from './events/handlers';

@Module({
  imports: [
    CQRSModule,
    DatabaseModule,
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
  components: [
    ...postProviders,
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

  configure(consumer: MiddlewaresConsumer) {

    consumer.apply(CharacterExistsMiddleware)
    .forRoutes({
      path: 'posts/character/:characterId', method: RequestMethod.GET,
    });

    consumer.apply(CorporationExistsMiddleware)
    .forRoutes({
      path: 'posts/corporation/:corporationId', method: RequestMethod.GET,
    });

    consumer.apply(AllianceExistsMiddleware)
    .forRoutes({
      path: 'posts/alliance/:allianceId', method: RequestMethod.GET,
    });
  }

  onModuleInit() {
    this.command$.setModuleRef(this.moduleRef);
    this.event$.setModuleRef(this.moduleRef);

    this.event$.register(eventHandlers);
    this.command$.register(commandHandlers);
    this.event$.combineSagas([this.postNotificationSagas.postCreated]);
  }
}
