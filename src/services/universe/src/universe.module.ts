import { Module } from '@nestjs/common';
import { UniverseLocationModule } from './location/location.module';
import { UniverseGroupModule } from './group/group.module';
import { UniverseCategoryModule } from './category/category.module';
import { UniverseTypeModule } from './type/type.module';
import { LoggerModule } from '@new-eden-social/logger';
import { UtilsModule } from '@new-eden-social/utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';

@Module({
  imports: [
    LoggerModule,
    UtilsModule,

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      logging: process.env.DB_LOG as LoggerOptions,
      entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
      synchronize: process.env.DB_SYNC === 'true',
    }),
    UniverseCategoryModule,
    UniverseGroupModule,
    UniverseLocationModule,
    UniverseTypeModule
  ],
  exports: [
    UniverseCategoryModule,
    UniverseGroupModule,
    UniverseLocationModule,
    UniverseTypeModule
  ],
  controllers: [
  ],
  providers: [
  ],
})
export class UniverseModule {
}
