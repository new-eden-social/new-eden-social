import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { PostModule } from '../post/post.module';
import { CharactersModule } from '../character/character.module';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';

@Module({
  modules: [
    CharactersModule,
    PostModule,
    DatabaseModule,
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
