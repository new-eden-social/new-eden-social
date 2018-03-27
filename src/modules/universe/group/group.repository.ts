import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { UniverseGroup } from './group.entity';

@EntityRepository(UniverseGroup)
export class UniverseGroupRepository extends Repository<UniverseGroup> {

}
