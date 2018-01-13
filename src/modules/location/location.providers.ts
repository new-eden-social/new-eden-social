import { Connection } from 'typeorm';
import { DB_CONNECTION_TOKEN } from '../common/database/database.constants';
import { Location } from './location.entity';
import { LOCATION_REPOSITORY_TOKEN } from './location.constants';

export const locationProviders = [
  {
    provide: LOCATION_REPOSITORY_TOKEN,
    useFactory: (connection: Connection) => connection.getRepository(Location),
    inject: [DB_CONNECTION_TOKEN],
  },
];
