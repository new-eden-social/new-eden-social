import { NestFactory } from '@nestjs/core';
// Used for TypeORM
import 'reflect-metadata';
// Request context
import 'zone.js';
import 'zone.js/dist/zone-node.js';
import 'zone.js/dist/long-stack-trace-zone.js';
import { MetascraperModule } from './src/metascraper.module';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { join } from 'path';

async function bootstrap() {
  const PORT = parseInt(process.env.PORT, 10) || 3000; // Default to 3000

  const nestApp = await NestFactory.createMicroservice(MetascraperModule, {
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:${PORT}`,
      package: 'metascraper',
      protoPath: join(__dirname, 'src/grpc/metascraper.proto'),
    },
  });
  // tslint:disable-next-line: no-console
  nestApp.listen(() => console.log('Microservice is listening'));
}

bootstrap();
