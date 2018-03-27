import { Connection } from 'typeorm';
import { DB_CONNECTION_TOKEN } from '../core/database/database.constants';
import { ALLIANCE_REPOSITORY_TOKEN } from './alliance.constants';
import { AllianceRepository } from './alliance.repository';

export const allianceProviders = [
  {
    provide: ALLIANCE_REPOSITORY_TOKEN,
    useFactory: (connection: Connection) => connection.getCustomRepository(AllianceRepository),
    inject: [DB_CONNECTION_TOKEN],
  },
];
