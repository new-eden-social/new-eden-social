import { Module, Shared } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { DatabaseConfig } from '../database/database.config';
import { PostModule } from './post/post.module';
import { CharactersModule } from '../character/character.module';
import { FeedService } from './feed.service';
import { KillmailModule } from './killmail/killmail.module';
import { FeedController } from './feed.controller';

@Module({
  modules: [
    CharactersModule,
    PostModule,
    DatabaseModule,
    KillmailModule,
  ],
  controllers: [
    FeedController,
  ],
  components: [
    FeedService,
  ],
  exports: [
    FeedService,
  ],
})
export class FeedModule {
}
