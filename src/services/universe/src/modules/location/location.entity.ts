import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Categories, IUniverseName } from '@new-eden-social/esi';

@Entity()
export class UniverseLocation {

  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column('varchar')
  category: Categories;

  public populateESI(esiData: IUniverseName) {
    this.name = esiData.name;
    this.category = esiData.category;
  }
}
