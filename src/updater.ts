import { NestFactory } from '@nestjs/core';
import { UpdaterModule } from './modules/updater/updater.module';
// Used for TypeORM
import 'reflect-metadata';
// Import config
import { config } from 'dotenv';
// Request context
import 'zone.js';
import 'zone.js/dist/zone-node.js';
import 'zone.js/dist/long-stack-trace-zone.js';

config();

NestFactory.createMicroservice(UpdaterModule, { port: parseInt(process.env.UPDATER_PORT, 10) })
.then(() => console.info(`Updater started on port ${process.env.UPDATER_PORT}`))
.catch(err => console.error(err));
