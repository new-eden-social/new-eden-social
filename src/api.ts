import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as cors from 'cors';
import { NestFactory } from '@nestjs/core';
import { ApiModule } from './modules/api.module';
import { ValidatorPipe } from './modules/core/validation/validator.pipe';
// Used for TypeORM
import 'reflect-metadata';
// Import config
import { config } from 'dotenv';
// Request context
import 'zone.js';
import 'zone.js/dist/zone-node.js';
import 'zone.js/dist/long-stack-trace-zone.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FormatterInterceptor } from './interceptors/formatter.interceptor';

async function bootstrap() {
  config();

  const instance = express();
  instance.use(bodyParser.json());
  instance.use(cors());

  const nestApp = await NestFactory.create(ApiModule, instance);
  nestApp.useGlobalPipes(new ValidatorPipe());
  nestApp.useGlobalInterceptors(new FormatterInterceptor());

  // Swagger
  const options = new DocumentBuilder()
  .setTitle('EVE-Book API')
  .setDescription('Automatically generated API Description')
  .setExternalDoc(
    'Additional Resources can be found on Github Wiki',
    'https://github.com/evebook/api/wiki')
  .setVersion('development')
  .addTag('characters')
  .addTag('corporations')
  .addTag('alliances')
  .addTag('comments')
  .addTag('posts')
  .addTag('search')
  .addTag('authentication', 'Authentication proxy for EVE SSO service')
  .addBearerAuth('Authorization', 'header')
  .build();
  const document = SwaggerModule.createDocument(nestApp, options);
  SwaggerModule.setup('/docs', nestApp, document);

  await nestApp.listen(parseInt(process.env.PORT, 10));
}

bootstrap()
.catch(console.error);
