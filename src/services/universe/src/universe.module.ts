import { Module } from '@nestjs/common';
import { UniverseLocationModule } from './modules/location/location.module';
import { UniverseGroupModule } from './modules/group/group.module';
import { UniverseCategoryModule } from './modules/category/category.module';
import { UniverseTypeModule } from './modules/type/type.module';
import { LoggerModule } from '@new-eden-social/logger';
import { UtilsModule } from '@new-eden-social/utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';
import { UniverseCategory } from './modules/category/category.entity';
import { UniverseGroup } from './modules/group/group.entity';
import { UniverseLocation } from './modules/location/location.entity';
import { UniverseType } from './modules/type/type.entity';
import { UniverseGrpcController } from './grpc/universe.grpc.controller';

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
      entities: [
        UniverseCategory,
        UniverseGroup,
        UniverseLocation,
        UniverseType
      ],
      synchronize: process.env.DB_SYNC === 'true',
    }),
    UniverseCategoryModule,
    UniverseGroupModule,
    UniverseLocationModule,
    UniverseTypeModule
  ],
  controllers: [
    UniverseGrpcController,
  ]
})
export class UniverseModule {
}
