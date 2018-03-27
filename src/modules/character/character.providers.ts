import { Connection } from 'typeorm';
import { DB_CONNECTION_TOKEN } from '../core/database/database.constants';
import { CHARACTER_REPOSITORY_TOKEN } from './character.constants';
import { CharacterRepository } from './character.repository';

export const characterProviders = [
  {
    provide: CHARACTER_REPOSITORY_TOKEN,
    useFactory: (connection: Connection) => connection.getCustomRepository(CharacterRepository),
    inject: [DB_CONNECTION_TOKEN],
  },
];
