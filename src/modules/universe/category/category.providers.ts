import { Connection } from 'typeorm';
import { UNIVERSE_CATEGORY_REPOSITORY_TOKEN } from './category.constants';
import { DB_CONNECTION_TOKEN } from '../../core/database/database.constants';
import { UniverseCategoryRepository } from './category.repository';

export const universeCategoryProviders = [
  {
    provide: UNIVERSE_CATEGORY_REPOSITORY_TOKEN,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(UniverseCategoryRepository),
    inject: [DB_CONNECTION_TOKEN],
  },
];
