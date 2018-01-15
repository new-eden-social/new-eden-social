import { Connection } from 'typeorm';
import { UNIVERSE_CATEGORY_REPOSITORY_TOKEN } from './category.constants';
import { UniverseCategory } from './category.entity';
import { DB_CONNECTION_TOKEN } from '../../common/database/database.constants';

export const universeCategoryProviders = [
  {
    provide: UNIVERSE_CATEGORY_REPOSITORY_TOKEN,
    useFactory: (connection: Connection) => connection.getRepository(UniverseCategory),
    inject: [DB_CONNECTION_TOKEN],
  },
];
