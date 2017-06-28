import { Module } from '@nestjs/common';
import { SearchModule } from './search/search.module';
import { CharactersModule } from './character/character.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  modules: [
    SearchModule,
    CharactersModule,
    AuthenticationModule,
  ],
})
export class ApplicationModule {
}
