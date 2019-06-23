import { NestFactory } from '@nestjs/core';
import { ApiModule } from './modules/api.module';
import { ValidatorPipe } from '@new-eden-social/validation';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FormatterInterceptor } from './interceptors/formatter.interceptor';
// Used for TypeORM
import 'reflect-metadata';
// Request context
import 'zone.js';
import 'zone.js/dist/zone-node.js';
import 'zone.js/dist/long-stack-trace-zone.js';

async function bootstrap() {
  const nestApp = await NestFactory.create(ApiModule);
  nestApp.enableCors();
  nestApp.useGlobalPipes(new ValidatorPipe());
  nestApp.useGlobalInterceptors(
    new FormatterInterceptor(),
  );

  // Swagger
  const options = new DocumentBuilder()
  .setTitle('EVE-Book API')
  .setDescription('Automatically generated API Description')
  .setExternalDoc(
    'Additional Resources can be found on Github Wiki',
    'https://github.com/evebook/api/wiki')
  .setVersion(process.env.npm_package_version)
  .setSchemes(process.env.NODE_ENV === 'production' ? 'https' : 'http')
  .addTag('characters', 'EVE Online Characters')
  .addTag('corporations', 'EVE Online Corporations')
  .addTag('alliances', 'EVE Online Alliances')
  .addTag('comments')
  .addTag('posts')
  .addTag('follow')
  .addTag('notifications')
  .addTag('search', 'Search for everything in EVE Online')
  .addTag('status', 'EVE Book API and ESI status')
  .addTag('authentication', 'Authentication proxy for EVE SSO service')
  .addTag('metascraper', 'URL Metadata parser')
  .addBearerAuth('Authorization', 'header')
  .build();
  const document = SwaggerModule.createDocument(nestApp, options);
  SwaggerModule.setup('/docs', nestApp, document);

  await nestApp.listen(parseInt(process.env.PORT, 10));
}

bootstrap()
.catch(console.error);
