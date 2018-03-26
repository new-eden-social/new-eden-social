import { Connection } from 'typeorm';
import { DB_CONNECTION_TOKEN } from '../core/database/database.constants';
import { Hashtag } from './hashtag.entity';
import { HASHTAG_REPOSITORY_TOKEN } from './hashtag.constants';

export const hashtagProviders = [
  {
    provide: HASHTAG_REPOSITORY_TOKEN,
    useFactory: (connection: Connection) => connection.getRepository(Hashtag),
    inject: [DB_CONNECTION_TOKEN],
  },
];
