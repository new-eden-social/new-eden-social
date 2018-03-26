import { Connection } from 'typeorm';
import { DB_CONNECTION_TOKEN } from '../core/database/database.constants';
import { KILLMAIL_REPOSITORY_TOKEN } from './killmail.constants';
import { Killmail } from './killmail.entity';

export const killmailProviders = [
  {
    provide: KILLMAIL_REPOSITORY_TOKEN,
    useFactory: (connection: Connection) => connection.getRepository(Killmail),
    inject: [DB_CONNECTION_TOKEN],
  },
];
