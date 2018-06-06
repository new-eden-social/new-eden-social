import { Module } from '@nestjs/common';
import { CorporationModule } from '../corporation/corporation.module';
import { AllianceModule } from '../alliance/alliance.module';
import { PostModule } from '../post/post.module';
import { CommentService } from './comment.service';
import { CharacterModule } from '../character/character.module';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentRepository]),

    CorporationModule,
    AllianceModule,
    CharacterModule,
    PostModule,
  ],
  controllers: [
    CommentController,
  ],
  providers: [
    CommentService,
  ],
  exports: [
    CommentService,
  ],
})
export class CommentModule {
}
