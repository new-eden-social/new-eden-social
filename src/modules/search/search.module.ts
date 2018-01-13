import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { ESIModule } from '../common/external/esi/esi.module';

@Module({
  modules: [
    ESIModule,
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
