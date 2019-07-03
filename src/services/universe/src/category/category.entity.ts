import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IUniverseCategory } from '@new-eden-social/esi';

@Entity()
export class UniverseCategory {

  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  public populateESI(esiData: IUniverseCategory) {
    this.name = esiData.name;
  }
}
