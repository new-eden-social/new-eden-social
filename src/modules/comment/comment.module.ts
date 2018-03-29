import { Module } from '@nestjs/common';
import { DatabaseModule } from '../core/database/database.module';
import { CorporationModule } from '../corporation/corporation.module';
import { AllianceModule } from '../alliance/alliance.module';
import { PostModule } from '../post/post.module';
import { commentProviders } from './comment.providers';
import { CommentService } from './comment.service';
import { CharacterModule } from '../character/character.module';
import { CommentController } from './comment.controller';

@Module({
  imports: [
    DatabaseModule,
    CorporationModule,
    AllianceModule,
    CharacterModule,
    PostModule,
  ],
  controllers: [
    CommentController,
  ],
  components: [
    ...commentProviders,
    CommentService,
  ],
  exports: [
    CommentService,
  ],
})
export class CommentModule {
}
