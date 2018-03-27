import { NestFactory } from '@nestjs/core';
import { KillmailsModule } from './modules/killmails.module';
// Used for TypeORM
import 'reflect-metadata';
// Import config
import { config } from 'dotenv';
// Request context
import 'zone.js';
import 'zone.js/dist/zone-node.js';
import 'zone.js/dist/long-stack-trace-zone.js';

config();
NestFactory.createMicroservice(KillmailsModule, { port: parseInt(process.env.KILLMAILS_PORT, 10) })
.then(() => console.info(`Killmail started on port ${process.env.KILLMAILS_PORT}`))
.catch(err => console.error(err));
