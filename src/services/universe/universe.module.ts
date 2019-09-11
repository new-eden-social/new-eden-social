import { Module } from '@nestjs/common';
import { LoggerModule } from '@new-eden-social/logger';
import { UtilsModule } from '@new-eden-social/utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';
import { UniverseCategory } from '@new-eden-social/services-universe/modules/category/category.entity';
import { UniverseGroup } from '@new-eden-social/services-universe/modules/group/group.entity';
import { UniverseLocation } from '@new-eden-social/services-universe/modules/location/location.entity';
import { UniverseType } from '@new-eden-social/services-universe/modules/type/type.entity';
import { UniverseCategoryModule } from '@new-eden-social/services-universe/modules/category/category.module';
import { UniverseGroupModule } from '@new-eden-social/services-universe/modules/group/group.module';
import { UniverseLocationModule } from '@new-eden-social/services-universe/modules/location/location.module';
import { UniverseTypeModule } from '@new-eden-social/services-universe/modules/type/type.module';
import { UniverseGrpcController } from '@new-eden-social/services-universe/grpc/universe.grpc.controller';

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
