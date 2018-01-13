import { Connection } from 'typeorm';
import { DB_CONNECTION_TOKEN } from '../common/database/database.constants';
import { Alliance } from './alliance.entity';
import { ALLIANCE_REPOSITORY_TOKEN } from './alliance.constants';

export const allianceProviders = [
  {
    provide: ALLIANCE_REPOSITORY_TOKEN,
    useFactory: (connection: Connection) => connection.getRepository(Alliance),
    inject: [DB_CONNECTION_TOKEN],
  },
];
