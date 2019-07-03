import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { ESIModule } from '@new-eden-social/esi';

@Module({
  imports: [
    ESIModule,
  ],
  controllers: [
    SearchController,
  ],
  providers: [
    SearchService,
  ],
})
export class SearchModule {
}
