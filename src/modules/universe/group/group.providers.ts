import { Connection } from 'typeorm';
import { UNIVERSE_GROUP_REPOSITORY_TOKEN } from './group.constants';
import { DB_CONNECTION_TOKEN } from '../../core/database/database.constants';
import { UniverseGroupRepository } from './group.repository';

export const universeGroupProviders = [
  {
    provide: UNIVERSE_GROUP_REPOSITORY_TOKEN,
    useFactory: (connection: Connection) => connection.getCustomRepository(UniverseGroupRepository),
    inject: [DB_CONNECTION_TOKEN],
  },
];
