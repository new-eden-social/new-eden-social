import { Component } from '@nestjs/common';
import { ConnectionOptions } from 'typeorm';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';

@Component()
export class DatabaseConfig {
  public getConfiguration(): ConnectionOptions {
    return {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      logging: <LoggerOptions>process.env.DB_LOG,
      entities: [
        __dirname + '/../**/*.entity.ts',
      ],
      autoSchemaSync: true,
    };
  }
}
