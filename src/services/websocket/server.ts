import { NestFactory } from '@nestjs/core';
// Used for TypeORM
import 'reflect-metadata';
import { WebsocketModule } from './src/websocket.module';
import { Transport } from '@nestjs/common/enums/transport.enum';

async function bootstrap() {
  const HTTP_PORT = parseInt(process.env.HTTP_PORT, 10) || 3000; // Default to 3000
  // const GRPC_PORT = parseInt(process.env.GRPC_PORT, 10) || 4000; // Default to 4000

  const app = await NestFactory.create(WebsocketModule);
  app.enableCors();

  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      url: process.env.REDIS_HOST,
    },
  });

  await app.startAllMicroservicesAsync();
  await app.listen(HTTP_PORT);
}

bootstrap();
