import { Injectable, OnModuleInit } from '@nestjs/common';
import { WebsocketRedisClientOptions } from './websocket.redis.client.options';
import { Client, ClientRedis } from '@nestjs/microservices';

@Injectable()
export class WebsocketRedisClient implements OnModuleInit {

  @Client(WebsocketRedisClientOptions)
  private readonly client: ClientRedis;

  async onModuleInit() {
    await this.client.connect();
  }

  // TODO: implement all possible actions by doing client.send
}
