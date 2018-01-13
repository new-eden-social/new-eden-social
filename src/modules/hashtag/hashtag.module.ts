import { Module } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { hashtagProviders } from './hashtag.providers';
import { ESIModule } from '../common/external/esi/esi.module';

@Module({
  modules: [
    ESIModule,
  ],
  components: [
    HashtagService,
    ...hashtagProviders,
  ],
  exports: [HashtagService],
})
export class HashtagModule {
}
