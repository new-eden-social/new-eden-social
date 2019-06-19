import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { IUniverseGroup } from '../../core/external/esi/esi.interface';
import { UniverseCategory } from '../category/category.entity';

@Entity()
export class UniverseGroup {

  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(type => UniverseCategory, { nullable: true, eager: true })
  category: UniverseCategory;

  public populateESI(esiData: IUniverseGroup) {
    this.name = esiData.name;
  }
}
