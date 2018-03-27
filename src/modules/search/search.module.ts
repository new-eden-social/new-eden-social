import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { ESIModule } from '../core/external/esi/esi.module';

@Module({
  imports: [
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
