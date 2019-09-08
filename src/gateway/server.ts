import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './src/gateway.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const HTTP_PORT = parseInt(process.env.HTTP_PORT, 10) || 3000; // Default to 3000

  const app = await NestFactory.create(GatewayModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  // Swagger
  const options = new DocumentBuilder()
  .setTitle('New Eden Social API')
  .setDescription('Automatically generated API Description')
  .setExternalDoc(
    'Additional Resources can be found on Github Wiki',
    'https://github.com/new-eden-social/new-eden-social/wiki')
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
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(HTTP_PORT);
}

bootstrap();
