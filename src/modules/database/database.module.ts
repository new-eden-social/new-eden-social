import { Module, Shared } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Shared()
@Module({
  components: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {
}
