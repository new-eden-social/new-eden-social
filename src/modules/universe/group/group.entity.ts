import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IUniverseGroup } from '../../common/external/esi/esi.interface';

@Entity()
export class UniverseGroup {

  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  categoryId: number;

  public populateESI(esiData: IUniverseGroup) {
    this.name = esiData.name;
    this.categoryId = esiData.category_id;
  }
}
