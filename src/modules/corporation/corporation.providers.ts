import { Connection } from 'typeorm';
import { DB_CONNECTION_TOKEN } from '../core/database/database.constants';
import { CORPORATION_REPOSITORY_TOKEN } from './corporation.constants';
import { CorporationRepository } from './corporation.repository';

export const corporationProviders = [
  {
    provide: CORPORATION_REPOSITORY_TOKEN,
    useFactory: (connection: Connection) => connection.getCustomRepository(CorporationRepository),
    inject: [DB_CONNECTION_TOKEN],
  },
];
