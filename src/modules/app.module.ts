import { Module } from '@nestjs/common';
import { SearchModule } from './search/search.module';
import { CharactersModule } from './character/character.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { PostModule } from './feed/post/post.module';
import { FeedModule } from './feed/feed.module';

@Module({
  modules: [
    SearchModule,
    CharactersModule,
    AuthenticationModule,
    PostModule,
    FeedModule,
  ],
})
export class ApplicationModule {
}
