import { Connection } from 'typeorm';
import { UNIVERSE_TYPE_REPOSITORY_TOKEN } from './type.constants';
import { UniverseType } from './type.entity';
import { DB_CONNECTION_TOKEN } from '../../core/database/database.constants';

export const universeTypeProviders = [
  {
    provide: UNIVERSE_TYPE_REPOSITORY_TOKEN,
    useFactory: (connection: Connection) => connection.getRepository(UniverseType),
    inject: [DB_CONNECTION_TOKEN],
  },
];
