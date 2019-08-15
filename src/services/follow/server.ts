import { NestFactory } from '@nestjs/core';
import { ValidatorPipe } from '@new-eden-social/validation';
// Used for TypeORM
import 'reflect-metadata';
// Request context
import 'zone.js';
import 'zone.js/dist/zone-node.js';
import 'zone.js/dist/long-stack-trace-zone.js';
import { FollowModule } from './src/follow.module';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { join } from 'path';

async function bootstrap() {
  const nestApp = await NestFactory.create(FollowModule);
  nestApp.enableCors();
  nestApp.useGlobalPipes(new ValidatorPipe());

  nestApp.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: 'follow',
      protoPath: join(__dirname, 'src/grpc/follow.proto'),
    }
  });

  nestApp.startAllMicroservicesAsync();
  await nestApp.listen(parseInt(process.env.PORT, 10));
}

bootstrap();
