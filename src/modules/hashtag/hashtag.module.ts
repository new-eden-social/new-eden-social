import { Module } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { hashtagProviders } from './hashtag.providers';
import { ESIModule } from '../core/external/esi/esi.module';

@Module({
  imports: [
    ESIModule,
  ],
  providers: [
    HashtagService,
    ...hashtagProviders,
  ],
  exports: [HashtagService],
})
export class HashtagModule {
}
