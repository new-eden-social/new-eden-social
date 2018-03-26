import { Connection } from 'typeorm';
import { UNIVERSE_GROUP_REPOSITORY_TOKEN } from './group.constants';
import { UniverseGroup } from './group.entity';
import { DB_CONNECTION_TOKEN } from '../../core/database/database.constants';

export const universeGroupProviders = [
  {
    provide: UNIVERSE_GROUP_REPOSITORY_TOKEN,
    useFactory: (connection: Connection) => connection.getRepository(UniverseGroup),
    inject: [DB_CONNECTION_TOKEN],
  },
];
