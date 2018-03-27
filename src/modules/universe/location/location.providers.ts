import { Connection } from 'typeorm';
import { UNIVERSE_LOCATION_REPOSITORY_TOKEN } from './location.constants';
import { DB_CONNECTION_TOKEN } from '../../core/database/database.constants';
import { UniverseLocationRepository } from './location.repository';

export const universeLocationProviders = [
  {
    provide: UNIVERSE_LOCATION_REPOSITORY_TOKEN,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(UniverseLocationRepository),
    inject: [DB_CONNECTION_TOKEN],
  },
];
