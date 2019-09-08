import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';
import { LoggerModule } from '@new-eden-social/logger';
import { UtilsModule } from '@new-eden-social/utils';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';
import { Comment } from './comment.entity';
import { NotificationGrpcModule } from '@new-eden-social/api-notification';

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
      entities: [Comment],
      synchronize: process.env.DB_SYNC === 'true',
    }),
    TypeOrmModule.forFeature([CommentRepository]),

    NotificationGrpcModule,
  ],
  controllers: [
  ],
  providers: [
    CommentService,
  ],
})
export class CommentModule {
}
