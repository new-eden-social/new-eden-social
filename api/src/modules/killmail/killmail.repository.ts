import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { Killmail } from './killmail.entity';

@EntityRepository(Killmail)
export class KillmailRepository extends Repository<Killmail> {

}
