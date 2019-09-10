import { NestFactory } from '@nestjs/core';
import { UpdaterService } from './updater.service';
import { UpdaterModule } from './updater.module';
import { LoggerService } from '@new-eden-social/logger';

async function bootstrap() {
  const app = await NestFactory.create(UpdaterModule);
  const updaterService = app.get(UpdaterService);
  const loggerService = app.get(LoggerService);

  loggerService.info('Started updating...');

  await updaterService.updateCharacters();
  await updaterService.updateCorporations();
  await updaterService.updateAlliances();

  loggerService.info('Finished updating');
}

bootstrap();
