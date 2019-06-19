import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { UniverseType } from './type.entity';

@EntityRepository(UniverseType)
export class UniverseTypeRepository extends Repository<UniverseType> {

}
