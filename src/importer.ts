import { NestFactory } from '@nestjs/core';
import { ImporterModule } from './modules/importer/importer.module';
// Used for TypeORM
import 'reflect-metadata';
// Import config
import { config } from 'dotenv';

config();

NestFactory.createMicroservice(ImporterModule, { port: 3001 })
.then(() => console.log('initialized'))
.catch(err => console.log(err));
