import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationRepository } from './notification.repository';
import { LoggerModule } from '@new-eden-social/logger';
import { UtilsModule } from '@new-eden-social/utils';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';
import { Notification } from 'rxjs';
import { NotificationGrpcController } from './grpc/notification.grpc.controller';
import { WebsocketRedisModule } from '@new-eden-social/services-websocket';

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
      entities: [Notification],
      synchronize: process.env.DB_SYNC === 'true',
    }),
    TypeOrmModule.forFeature([NotificationRepository]),

    WebsocketRedisModule,
  ],
  controllers: [
    NotificationGrpcController,
  ],
  providers: [
    NotificationService,
  ],
})
export class NotificationModule {
}
