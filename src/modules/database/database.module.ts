import { Module, Shared } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseConfig } from './database.config';

@Shared()
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
