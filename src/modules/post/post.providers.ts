import { Connection } from 'typeorm';
import { DB_CONNECTION_TOKEN } from '../database/database.constants';
import { POST_REPOSITORY_TOKEN } from './post.constants';
import { Post } from './post.entity';

export const postProviders = [
  {
    provide: POST_REPOSITORY_TOKEN,
    useFactory: (connection: Connection) => connection.getRepository(Post),
    inject: [DB_CONNECTION_TOKEN],
  },
];
