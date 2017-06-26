import * as bodyParser from 'body-parser';
import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './modules/app.module';
import { ValidatorPipe } from './pipes/validator.pipe';

// Used for TypeORM
import 'reflect-metadata';

// Import config
import { config } from 'dotenv';
config();

const instance = express();
instance.use(bodyParser.json());

const app = NestFactory.create(ApplicationModule, instance);
app.useGlobalPipes(new ValidatorPipe());
app.listen(process.env.PORT, () =>
  console.log(`Application is listening on port ${process.env.PORT}.`));
