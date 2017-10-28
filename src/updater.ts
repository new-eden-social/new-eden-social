import { NestFactory } from '@nestjs/core';
import { UpdaterModule } from './modules/updater/updater.module';
// Used for TypeORM
import 'reflect-metadata';
import Log from './utils/Log';
// Import config
import { config } from 'dotenv';

config();
Log.init();

NestFactory.createMicroservice(UpdaterModule, { port: parseInt(process.env.UPDATER_PORT, 10) })
.then(() => Log.info(`Updater started on port ${process.env.UPDATER_PORT}`))
.catch(err => Log.error(err));
