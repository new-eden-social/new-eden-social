import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './http/comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';
import { eventHandlers } from './events/handlers';
import { commandHandlers } from './commands/handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { LoggerModule } from '@new-eden-social/logger';
import { UtilsModule } from '@new-eden-social/utils';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';
import { Comment } from './comment.entity';

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

    CqrsModule,

  ],
  controllers: [
    CommentController,
  ],
  providers: [
    CommentService,
    ...commandHandlers,
    ...eventHandlers,
  ],
})
export class CommentModule {
}
