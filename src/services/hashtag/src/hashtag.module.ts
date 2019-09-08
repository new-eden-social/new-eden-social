import { Module } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { ESIModule } from '@new-eden-social/esi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashtagRepository } from './hashtag.repository';
import { LoggerModule } from '@new-eden-social/logger';
import { UtilsModule } from '@new-eden-social/utils';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';
import { HashtagGrpcController } from './grpc/hashtag.grpc.controller';
import { Hashtag } from './hashtag.entity';

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
      entities: [Hashtag],
      synchronize: process.env.DB_SYNC === 'true',
    }),
    TypeOrmModule.forFeature([HashtagRepository]),

    ESIModule,
  ],
  providers: [
    HashtagService,
  ],
  controllers: [
    HashtagGrpcController,
  ],
})
export class HashtagModule {
}
