import { Module, NestModule } from '@nestjs/common';
import { SearchModule } from './search/search.module';
import { CharacterModule } from './character/character.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { PostModule } from './post/post.module';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { RequestContextMiddleware } from './core/requestContext/requestContext.middleware';
import { AllianceModule } from './alliance/alliance.module';
import { CorporationModule } from './corporation/corporation.module';
import { LoggerModule } from './core/logger/logger.module';
import { UtilsModule } from './core/utils/utils.module';
import { CommentModule } from './comment/comment.module';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationModule } from './notification/notification.module';

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
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: process.env.DB_SYNC === 'true',
    }),

    AuthenticationModule,
    SearchModule,
    AllianceModule,
    CharacterModule,
    CorporationModule,
    PostModule,
    CommentModule,
    NotificationModule,
  ],
})
export class ApiModule implements NestModule {
  configure(consumer: MiddlewaresConsumer) {
    consumer
    .apply(RequestContextMiddleware)
    .forRoutes('*');
  }
}
