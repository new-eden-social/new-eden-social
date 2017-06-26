import { MiddlewaresConsumer, Module, NestModule } from '@nestjs/common';
import { ThreadsController } from './threads.controller';
import { ThreadsService } from './threads.service';
import { DatabaseModule } from '../database/database.module';
import { DatabaseConfig } from '../database/database.config';
import { ThreadBoardExistsMiddleware } from './thread.boardExists.middleware';
import { BoardsModule } from '../boards/boards.module';

@Module({
  modules: [
    DatabaseModule,
    BoardsModule,
  ],
  controllers: [
    ThreadsController,
  ],
  components: [
    ThreadsService,
    DatabaseConfig,
  ],
  exports: [ThreadsService],
})

export class ThreadsModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer) {
    consumer.apply(ThreadBoardExistsMiddleware).forRoutes(ThreadsController);
  }
}
