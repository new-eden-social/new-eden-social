import { Module, OnModuleInit, forwardRef } from '@nestjs/common';
import { PostService } from './post.service';
import { UniverseLocationModule } from '../../universe/src/location/location.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from './post.repository';
import { CommandBus, EventBus, CqrsModule } from '@nestjs/cqrs';
import { commandHandlers } from './commands/handlers';
import { eventHandlers } from './events/handlers';
import { ModuleRef } from '@nestjs/core';
import { WebsocketModule } from '../../websocket/src/websocket.module';
import { MetascraperModule } from '../../metascraper/src/metascraper.module';
import { LoggerModule } from '@new-eden-social/logger';
import { UtilsModule } from '@new-eden-social/utils';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';
import { MetascraperGrpcModule } from '@new-eden-social/api-metascraper';
import { Post } from './post.entity';

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
      entities: [Post],
      synchronize: process.env.DB_SYNC === 'true',
    }),
    TypeOrmModule.forFeature([PostRepository]),

    CqrsModule,

    MetascraperGrpcModule,
  ],
  providers: [
    PostService,
    ...commandHandlers,
    ...eventHandlers,
  ],
})
export class PostModule {
}
