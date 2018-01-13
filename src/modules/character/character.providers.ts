import { Connection } from 'typeorm';
import { Character } from './character.entity';
import { DB_CONNECTION_TOKEN } from '../common/database/database.constants';
import { CHARACTER_REPOSITORY_TOKEN } from './character.constants';

export const characterProviders = [
  {
    provide: CHARACTER_REPOSITORY_TOKEN,
    useFactory: (connection: Connection) => connection.getRepository(Character),
    inject: [DB_CONNECTION_TOKEN],
  },
];
