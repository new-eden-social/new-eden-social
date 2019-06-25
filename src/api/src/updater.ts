import { NestFactory } from '@nestjs/core';
import { UpdaterModule } from './modules/updater/updater.module';
import { Transport } from '@nestjs/microservices';
// Used for TypeORM
import 'reflect-metadata';
// Import config
import { config } from 'dotenv';
// Request context
import 'zone.js';
import 'zone.js/dist/zone-node.js';
import 'zone.js/dist/long-stack-trace-zone.js';

config();

NestFactory.createMicroservice(UpdaterModule, {
  transport: Transport.TCP,
  options: {
    port: parseInt(process.env.UPDATER_PORT, 10),
  },
});
