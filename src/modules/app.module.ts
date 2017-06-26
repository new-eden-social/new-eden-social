import { Module } from '@nestjs/common';

import { BoardsModule } from './boards/boards.module';
import { ThreadsModule } from './threads/threads.module';

@Module({
  modules: [
    BoardsModule,
    ThreadsModule,
  ],
})
export class ApplicationModule {
}
