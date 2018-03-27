import { Connection } from 'typeorm';
import { DB_CONNECTION_TOKEN } from '../../core/database/database.constants';
import { KILLMAIL_PARTICIPANT_REPOSITORY_TOKEN } from './participant.constants';
import { KillmailParticipantRepository } from './participant.repository';

export const killmailParticipantProviders = [
  {
    provide: KILLMAIL_PARTICIPANT_REPOSITORY_TOKEN,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(KillmailParticipantRepository),
    inject: [DB_CONNECTION_TOKEN],
  },
];
