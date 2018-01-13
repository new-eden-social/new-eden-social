import { Module } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { hashtagProviders } from './hashtag.providers';

@Module({
  components: [
    HashtagService,
    ...hashtagProviders,
  ],
  exports: [HashtagService],
})
export class HashtagModule {
}
