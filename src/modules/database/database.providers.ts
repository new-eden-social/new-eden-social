import { DB_CONNECTION_TOKEN } from './database.constants';
import { createConnection } from 'typeorm';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';

export const databaseProviders = [
  {
    provide: DB_CONNECTION_TOKEN,
    useFactory: async () => await createConnection({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      logging: <LoggerOptions>process.env.DB_LOG,
      entities: [
        __dirname + '/../**/*.entity.ts',
      ],
      synchronize: process.env.DB_SYNC === 'true',
      cache: {
        type: 'redis',
        options: {
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT,
        },
        alwaysEnabled: process.env.DB_ALWAYS_CACHE === 'true',
      },
    }),
  },
];
