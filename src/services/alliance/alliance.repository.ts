import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { Alliance } from '@new-eden-social/services-alliance/alliance.entity';

@EntityRepository(Alliance)
export class AllianceRepository extends Repository<Alliance> {

  public async getAllByIds(ids: number[]): Promise<Alliance[]> {
    return this.createQueryBuilder('alliance')
    .where('alliance.id IN (:ids)', { ids })
    .getMany();
  }

  public async getNotUpdated(interval: string, limit: number): Promise<Alliance[]> {
    return this.createQueryBuilder('alliance')
    .select('id')
    .where('"updatedAt" < (NOW() - interval :interval)', { interval })
    .limit(limit)
    .getMany();
  }
}
