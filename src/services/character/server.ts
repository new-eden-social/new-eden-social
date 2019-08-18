import { NestFactory } from '@nestjs/core';
import { ValidatorPipe } from '@new-eden-social/validation';
// Used for TypeORM
import 'reflect-metadata';
// Request context
import 'zone.js';
import 'zone.js/dist/zone-node.js';
import 'zone.js/dist/long-stack-trace-zone.js';
import { CharacterModule } from './src/character.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const PORT = parseInt(process.env.PORT, 10) || 3000; // Default to 3000

  const nestApp = await NestFactory.createMicroservice(CharacterModule, {
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:${PORT}`,
      package: 'character',
      protoPath: join(__dirname, 'src/grpc/character.proto'),
    },
  });
  // tslint:disable-next-line: no-console
  nestApp.listen(() => console.log('Microservice is listening'));
}

bootstrap();
