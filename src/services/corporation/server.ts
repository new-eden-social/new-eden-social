import { NestFactory } from '@nestjs/core';
// Used for TypeORM
import 'reflect-metadata';
// Request context
import 'zone.js';
import 'zone.js/dist/zone-node.js';
import 'zone.js/dist/long-stack-trace-zone.js';
import { CorporationModule } from './src/corporation.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const PORT = parseInt(process.env.PORT, 10) || 3000; // Default to 3000

  const nestApp = await NestFactory.createMicroservice(CorporationModule, {
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:${PORT}`,
      package: 'corporation',
      protoPath: join(__dirname, 'src/grpc/corporation.proto'),
    },
  });
  // tslint:disable-next-line: no-console
  nestApp.listen(() => console.log('Microservice is listening'));
}
bootstrap();
