import { Connection } from 'typeorm';
import { DB_CONNECTION_TOKEN } from '../core/database/database.constants';
import { HASHTAG_REPOSITORY_TOKEN } from './hashtag.constants';
import { HashtagRepository } from './hashtag.repository';

export const hashtagProviders = [
  {
    provide: HASHTAG_REPOSITORY_TOKEN,
    useFactory: (connection: Connection) => connection.getCustomRepository(HashtagRepository),
    inject: [DB_CONNECTION_TOKEN],
  },
];
