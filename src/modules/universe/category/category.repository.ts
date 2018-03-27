import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { UniverseCategory } from './category.entity';

@EntityRepository(UniverseCategory)
export class UniverseCategoryRepository extends Repository<UniverseCategory> {

}
