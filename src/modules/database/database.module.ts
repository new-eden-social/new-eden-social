import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseConfig } from './database.config';

@Module({
  components: [
    DatabaseService,
    DatabaseConfig,
  ],
  exports: [
    DatabaseService,
  ],
})
export class DatabaseModule {
}
