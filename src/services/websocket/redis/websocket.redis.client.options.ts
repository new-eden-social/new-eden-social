import { RedisOptions } from '@nestjs/microservices';

export const WebsocketRedisClientOptions: RedisOptions = {
  options: {
    url: process.env.WEBSOCKET_REDIS_URL, // TODO: Should use providers or something...
  }
};
