import { Connection } from 'typeorm';
import { DB_CONNECTION_TOKEN } from '../core/database/database.constants';
import { CommentRepository } from './comment.repository';
import { COMMENT_REPOSITORY_TOKEN } from './comment.constants';

export const commentProviders = [
  {
    provide: COMMENT_REPOSITORY_TOKEN,
    useFactory: (connection: Connection) => connection.getCustomRepository(CommentRepository),
    inject: [DB_CONNECTION_TOKEN],
  },
];
