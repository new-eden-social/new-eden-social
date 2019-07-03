import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { UniverseCategory } from '../category/category.entity';
import { IUniverseGroup } from '@new-eden-social/esi';

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
