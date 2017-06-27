import { Module } from '@nestjs/common';
import { SearchModule } from './search/search.module';

@Module({
  modules: [
    SearchModule,
  ],
})
export class ApplicationModule {
}
