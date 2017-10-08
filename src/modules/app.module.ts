import { Module } from '@nestjs/common';
import { SearchModule } from './search/search.module';
import { CharactersModule } from './character/character.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { PostModule } from './post/post.module';
import { KillmailModule } from './killmail/killmail.module';

@Module({
  modules: [
    SearchModule,
    CharactersModule,
    AuthenticationModule,
    PostModule,
    // TODO: Should be moved to microservice
    KillmailModule,
  ],
})
export class ApplicationModule {
}
