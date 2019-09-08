import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { Corporation } from './corporation.entity';

@EntityRepository(Corporation)
export class CorporationRepository extends Repository<Corporation> {

  public async getAllByIds(ids: number[]): Promise<Corporation[]> {
    return this.createQueryBuilder('corporation')
    .where('corporation.id IN (:ids)', { ids })
    .getMany();
  }

  public async getNotUpdated(interval: string, limit: number): Promise<Corporation[]> {
    return this.createQueryBuilder('corporation')
    .select('id')
    .where('"updatedAt" < (NOW() - interval :interval)', { interval })
    .limit(limit)
    .getMany();
  }

}
