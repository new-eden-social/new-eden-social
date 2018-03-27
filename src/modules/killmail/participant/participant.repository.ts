import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { KillmailParticipant } from './participant.entity';

@EntityRepository(KillmailParticipant)
export class KillmailParticipantRepository extends Repository<KillmailParticipant> {

}
