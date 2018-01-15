import { Connection } from 'typeorm';
import { UniverseLocation } from './location.entity';
import { UNIVERSE_LOCATION_REPOSITORY_TOKEN } from './location.constants';
import { DB_CONNECTION_TOKEN } from '../../common/database/database.constants';

export const universeLocationProviders = [
  {
    provide: UNIVERSE_LOCATION_REPOSITORY_TOKEN,
    useFactory: (connection: Connection) => connection.getRepository(UniverseLocation),
    inject: [DB_CONNECTION_TOKEN],
  },
];
