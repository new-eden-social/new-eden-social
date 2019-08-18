import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { Character } from './character.entity';
import { from, Observable } from 'rxjs';
import { ReadStream } from 'fs';

@EntityRepository(Character)
export class CharacterRepository extends Repository<Character> {

  public async getAllByIds(ids: number[]): Promise<Character[]> {
    return this.createQueryBuilder('character')
    .where('character.id IN (:ids)', { ids })
    .leftJoinAndSelect('character.corporation', 'corporation')
    .leftJoinAndSelect('corporation.alliance', 'alliance')
    .getMany();
  }

  public async findForCorporation(corporationId: number): Promise<Character[]> {
    return this.createQueryBuilder('character')
    .where('character."corporationId" = :corporationId', { corporationId })
    .getMany();
  }

  public async findForAlliance(allianceId: number): Promise<Character[]> {
    return this.createQueryBuilder('character')
    .leftJoinAndSelect('character.corporation', 'corporation')
    .where('corporation."allianceId" = :allianceId', { allianceId })
    .getMany();
  }

  public async getNotUpdated(interval: string, limit: number): Promise<Character[]> {
    return this.createQueryBuilder('character')
    .select('id')
    .where('"updatedAt" < (NOW() - interval :interval)', { interval })
    .limit(limit)
    .getMany();
  }

}
