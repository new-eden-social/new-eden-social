import { Component } from '@nestjs/common';
import { ConnectionOptions } from 'typeorm';

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
      //logging: 'all',
      entities: [
        __dirname + '/../**/*.entity.ts',
      ],
      autoSchemaSync: true,
    };
  }
}
