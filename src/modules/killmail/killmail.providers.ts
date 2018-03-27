import { Connection } from 'typeorm';
import { DB_CONNECTION_TOKEN } from '../core/database/database.constants';
import { KILLMAIL_REPOSITORY_TOKEN } from './killmail.constants';
import { KillmailRepository } from './killmail.repository';

export const killmailProviders = [
  {
    provide: KILLMAIL_REPOSITORY_TOKEN,
    useFactory: (connection: Connection) => connection.getCustomRepository(KillmailRepository),
    inject: [DB_CONNECTION_TOKEN],
  },
];
