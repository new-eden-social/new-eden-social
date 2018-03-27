import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { Corporation } from './corporation.entity';

@EntityRepository(Corporation)
export class CorporationRepository extends Repository<Corporation> {

  public async getAllByIds(ids: number[]): Promise<Corporation[]> {
    return this.createQueryBuilder('corporation')
    .where('corporation.id IN (:ids)', { ids })
    .leftJoinAndSelect('corporation.alliance', 'alliance')
    .getMany();
  }

}
