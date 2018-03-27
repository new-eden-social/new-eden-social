import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { UniverseLocation } from './location.entity';

@EntityRepository(UniverseLocation)
export class UniverseLocationRepository extends Repository<UniverseLocation> {

}
