import { NestFactory } from '@nestjs/core';
import { ValidatorPipe } from '@new-eden-social/validation';
// Used for TypeORM
import 'reflect-metadata';
// Request context
import 'zone.js';
import 'zone.js/dist/zone-node.js';
import 'zone.js/dist/long-stack-trace-zone.js';
import { AllianceModule } from './src/alliance.module';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { join } from 'path';

async function bootstrap() {
  const PORT = parseInt(process.env.PORT, 10) || 3000; // Default to 3000

  const nestApp = await NestFactory.create(AllianceModule);
  nestApp.enableCors();
  nestApp.useGlobalPipes(new ValidatorPipe());

  const microservice = nestApp.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:${PORT + 1}`, // Listening on PORT + 1
      package: 'alliance',
      protoPath: join(__dirname, 'src/alliance.proto'),
    },
  });

  await nestApp.startAllMicroservicesAsync();
  await nestApp.listen(PORT);
}

bootstrap();
