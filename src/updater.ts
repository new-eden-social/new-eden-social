import { NestFactory } from '@nestjs/core';
import { UpdaterModule } from './modules/updater/updater.module';
// Used for TypeORM
import 'reflect-metadata';
// Import config
import { config } from 'dotenv';

config();

NestFactory.createMicroservice(UpdaterModule, { port: 3001 })
.then(() => console.log('initialized'))
.catch(err => console.log(err));
