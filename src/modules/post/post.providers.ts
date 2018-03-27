import { Connection } from 'typeorm';
import { DB_CONNECTION_TOKEN } from '../core/database/database.constants';
import { POST_REPOSITORY_TOKEN } from './post.constants';
import { PostRepository } from './post.repository';

export const postProviders = [
  {
    provide: POST_REPOSITORY_TOKEN,
    useFactory: (connection: Connection) => connection.getCustomRepository(PostRepository),
    inject: [DB_CONNECTION_TOKEN],
  },
];
