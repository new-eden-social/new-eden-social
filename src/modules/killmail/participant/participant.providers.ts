import { Connection } from 'typeorm';
import { DB_CONNECTION_TOKEN } from '../../database/database.constants';
import { KillmailParticipant } from './participant.entity';
import { KILLMAIL_PARTICIPANT_REPOSITORY_TOKEN } from './participant.constants';

export const killmailParticipantProviders = [
  {
    provide: KILLMAIL_PARTICIPANT_REPOSITORY_TOKEN,
    useFactory: (connection: Connection) => connection.getRepository(KillmailParticipant),
    inject: [DB_CONNECTION_TOKEN],
  },
];
