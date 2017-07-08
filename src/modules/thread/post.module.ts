import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { DatabaseModule } from '../database/database.module';
import { DatabaseConfig } from  '../database/database.config';

@Module({
  modules: [
    DatabaseModule,
  ],
  controllers: [
    PostController,
  ],
  components: [
    PostService,
    DatabaseConfig,
  ],
  exports: [
    PostService,
  ],
})
export class PostModule {
}
