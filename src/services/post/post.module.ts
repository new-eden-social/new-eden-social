import { Module } from '@nestjs/common';
import { PostService } from '@new-eden-social/services-post/post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from '@new-eden-social/services-post/post.repository';
import { LoggerModule } from '@new-eden-social/logger';
import { UtilsModule } from '@new-eden-social/utils';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';
import { MetascraperGrpcModule } from '@new-eden-social/services-metascraper/grpc/metascraper.grpc.module';
import { Post } from '@new-eden-social/services-post/post.entity';
import { WebsocketRedisModule } from '@new-eden-social/services-websocket/redis/websocket.redis.module';
import { PostGrpcController } from '@new-eden-social/services-post/grpc/post.grpc.controller';
import { NotificationGrpcModule } from '@new-eden-social/services-notification/grpc/notification.grpc.module';
import { HashtagGrpcModule } from '@new-eden-social/services-hashtag/grpc/hashtag.grpc.module';

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

    MetascraperGrpcModule,
    WebsocketRedisModule,
    NotificationGrpcModule,
    HashtagGrpcModule,
  ],
  providers: [
    PostService,
  ],
  controllers: [
    PostGrpcController,
  ]
})
export class PostModule {
}
