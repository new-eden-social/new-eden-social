import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { FollowHttpController } from './http/follow.http.controller';
import { FollowService } from './follow.service';
import { FollowRepository } from './follow.repository';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';
import { LoggerModule } from '@new-eden-social/logger';
import { UtilsModule } from '@new-eden-social/utils';
import { FollowGrpcController } from './grpc/follow.grpc.controller';
import { AllianceGrpcModule } from '@new-eden-social/api-alliance';
import { Follow } from './follow.entity';

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
      entities: [Follow],
      synchronize: process.env.DB_SYNC === 'true',
    }),
    TypeOrmModule.forFeature([FollowRepository]),

    CqrsModule,

    AllianceGrpcModule,
  ],
  controllers: [
    FollowHttpController,
    FollowGrpcController,
  ],
  providers: [
    FollowService,
    ...CommandHandlers,
    ...EventHandlers,
  ],
})
export class FollowModule {
}
