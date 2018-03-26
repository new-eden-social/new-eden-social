import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Categories, IUniverseName } from '../../core/external/esi/esi.interface';
import { Post } from '../../post/post.entity';

@Entity()
export class UniverseLocation {

  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column('varchar')
  category: Categories;

  @OneToMany(type => Post, corporation => corporation.location)
  posts: Post[];

  public populateESI(esiData: IUniverseName) {
    this.name = esiData.name;
    this.category = esiData.category;
  }
}
