import { Module } from '@nestjs/common';
import { WebsocketRedisClient } from './websocket.redis.client';

@Module({
  exports: [
    WebsocketRedisClient
  ]
})
export class WebsocketRedisModule {
}
