import { Connection } from 'typeorm';
import { UNIVERSE_TYPE_REPOSITORY_TOKEN } from './type.constants';
import { DB_CONNECTION_TOKEN } from '../../core/database/database.constants';
import { UniverseTypeRepository } from './type.repository';

export const universeTypeProviders = [
  {
    provide: UNIVERSE_TYPE_REPOSITORY_TOKEN,
    useFactory: (connection: Connection) => connection.getCustomRepository(UniverseTypeRepository),
    inject: [DB_CONNECTION_TOKEN],
  },
];
