import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { DatabaseModule } from '../database/database.module';
import { DatabaseConfig } from  '../database/database.config';

@Module({
  modules: [
    DatabaseModule,
  ],
  controllers: [
    BoardsController,
  ],
  components: [
    BoardsService,
    DatabaseConfig,
  ],
  exports: [BoardsService],
})
export class BoardsModule {
}
