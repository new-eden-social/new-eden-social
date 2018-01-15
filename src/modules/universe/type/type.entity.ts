import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { IUniverseType } from '../../common/external/esi/esi.interface';
import { UniverseGroup } from '../group/group.entity';

@Entity()
export class UniverseType {

  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(type => UniverseGroup, { nullable: true, eager: true })
  group: UniverseGroup;

  public populateESI(esiData: IUniverseType) {
    this.name = esiData.name;
    this.description = esiData.description;
  }
}
