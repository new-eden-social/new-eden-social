import { NestFactory } from '@nestjs/core';
// Used for TypeORM
import 'reflect-metadata';
import { CharacterModule } from './src/character.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const HTTP_PORT = parseInt(process.env.HTTP_PORT, 10) || 3000; // Default to 3000
  const GRPC_PORT = parseInt(process.env.GRPC_PORT, 10) || 4000; // Default to 4000

  const app = await NestFactory.create(CharacterModule);

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:${GRPC_PORT}`,
      package: 'character',
      protoPath: join(__dirname, 'src/grpc/character.proto'),
    },
  });

  await app.startAllMicroservicesAsync();
  await app.listen(HTTP_PORT);
}

bootstrap();
