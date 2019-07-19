import { Module, OnModuleInit } from '@nestjs/common';
import { CorporationModule } from '../../../src/modules/corporation/corporation.module';
import { AllianceModule } from '../../alliance/src/alliance.module';
import { PostModule } from '../../post/src/post.module';
import { CommentService } from './comment.service';
import { CharacterModule } from '@new-eden-social/api-character/character.module';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';
import { ModuleRef } from '@nestjs/core';
import { eventHandlers } from './events/handlers';
import { commandHandlers } from './commands/handlers';
import { WebsocketModule } from '../../websocket/src/websocket.module';
import { CqrsModule, CommandBus, EventBus } from '@nestjs/cqrs';
import { LoggerModule } from '@new-eden-social/logger';
import { UtilsModule } from '@new-eden-social/utils';
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
    CqrsModule,
    TypeOrmModule.forFeature([CommentRepository]),

    CorporationModule,
    AllianceModule,
    CharacterModule,
    PostModule,
    WebsocketModule,
  ],
  controllers: [
    CommentController,
  ],
  providers: [
    CommentService,
    ...commandHandlers,
    ...eventHandlers,
  ],
  exports: [
    CommentService,
  ],
})
export class CommentModule implements OnModuleInit {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly command$: CommandBus,
    private readonly event$: EventBus,
  ) {
  }

  onModuleInit() {
    // this.command$.setModuleRef(this.moduleRef);
    // this.event$.setModuleRef(this.moduleRef);

    // this.event$.register(eventHandlers);
    // this.command$.register(commandHandlers);
  }
}
