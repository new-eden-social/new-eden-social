import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { SearchModule } from './search/search.module';
import { CharacterModule } from './character/character.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { PostModule } from './post/post.module';
import { RequestContextMiddleware } from '@new-eden-social/request-context';
import { AllianceModule } from './alliance/alliance.module';
import { CorporationModule } from './corporation/corporation.module';
import { LoggerModule, LOGGER_LEVEL } from '@new-eden-social/logger';
import { UtilsModule } from '@new-eden-social/utils';
import { CommentModule } from './comment/comment.module';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationModule } from './notification/notification.module';
import { AuthMiddleware } from './authentication/authentication.middleware';
import { WebsocketModule } from './websocket/websocket.module';
import { MorganModule, MorganInterceptor } from 'nest-morgan';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { FollowModule } from './follow/follow.module';
import { MetascraperModule } from './metascraper/metascraper.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    // Global
    LoggerModule,
    UtilsModule,

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      logging: <LoggerOptions>process.env.DB_LOG,
      entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
      synchronize: process.env.DB_SYNC === 'true',
    }),

    MorganModule.forRoot(),

    HealthModule,
    AuthenticationModule,
    SearchModule,
    AllianceModule,
    CharacterModule,
    CorporationModule,
    PostModule,
    CommentModule,
    NotificationModule,
    WebsocketModule,
    FollowModule,
    MetascraperModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('combined', {
        skip: (req, res) => process.env.LOG_LEVEL === LOGGER_LEVEL.INFO,
      }),
    },
  ],
})
export class ApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(RequestContextMiddleware, AuthMiddleware)
    .forRoutes('*');
  }
}
