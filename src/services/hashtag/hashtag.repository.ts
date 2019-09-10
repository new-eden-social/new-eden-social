import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { Hashtag } from '@new-eden-social/services-hashtag/hashtag.entity';

@EntityRepository(Hashtag)
export class HashtagRepository extends Repository<Hashtag> {

}
