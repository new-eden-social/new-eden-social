import { NestFactory } from '@nestjs/core';
// Used for TypeORM
import 'reflect-metadata';
import { FollowModule } from './follow.module';
import { join } from 'path';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const HTTP_PORT = parseInt(process.env.HTTP_PORT, 10) || 3000; // Default to 3000
  const GRPC_PORT = parseInt(process.env.GRPC_PORT, 10) || 4000; // Default to 4000

  const app = await NestFactory.create(FollowModule);

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:${GRPC_PORT}`,
      package: 'follow',
      protoPath: join(__dirname, 'src/grpc/follow.proto'),
    },
  });

  await app.startAllMicroservicesAsync();
  await app.listen(HTTP_PORT);
}

bootstrap();
