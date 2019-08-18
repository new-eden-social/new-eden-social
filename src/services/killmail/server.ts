import { NestFactory } from '@nestjs/core';
// Used for TypeORM
import 'reflect-metadata';
import { KillmailModule } from './src/killmail.module';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { join } from 'path';

async function bootstrap() {
  const PORT = parseInt(process.env.PORT, 10) || 3000; // Default to 3000

  const nestApp = await NestFactory.createMicroservice(KillmailModule, {
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:${PORT}`,
      package: 'killmail',
      protoPath: join(__dirname, 'src/grpc/killmail.proto'),
    },
  });
  // tslint:disable-next-line: no-console
  nestApp.listen(() => console.log('Microservice is listening'));

}

bootstrap();
