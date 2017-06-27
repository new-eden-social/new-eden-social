import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { EveModule } from '../external/eve/eve.module';

@Module({
  modules: [
    EveModule,
  ],
  controllers: [
    SearchController,
  ],
  components: [
    SearchService,
  ],
})
export class SearchModule {
}
