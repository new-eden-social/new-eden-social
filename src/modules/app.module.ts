import { Module } from '@nestjs/common';
import { SearchModule } from './search/search.module';
import { CharactersModule } from './character/character.module';

@Module({
  modules: [
    SearchModule,
    CharactersModule,
  ],
})
export class ApplicationModule {
}
