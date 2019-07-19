import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { Character } from './character.entity';
import { Corporation } from '@new-eden-social/api-corporation';
import { Alliance } from '@new-eden-social/api-alliance';

@EntityRepository(Character)
export class CharacterRepository extends Repository<Character> {

  public async getAllByIds(ids: number[]): Promise<Character[]> {
    return this.createQueryBuilder('character')
    .where('character.id IN (:ids)', { ids })
    .leftJoinAndSelect('character.corporation', 'corporation')
    .leftJoinAndSelect('corporation.alliance', 'alliance')
    .getMany();
  }

  public async findForCorporation(corporation: Corporation): Promise<Character[]> {
    return this.createQueryBuilder('character')
    .where('character."corporationId" = :corporationId', { corporationId: corporation.id })
    .getMany();
  }

  public async findForAlliance(alliance: Alliance): Promise<Character[]> {
    return this.createQueryBuilder('character')
    .leftJoinAndSelect('character.corporation', 'corporation')
    .where('corporation."allianceId" = :allianceId', { allianceId: alliance.id })
    .getMany();
  }

}
