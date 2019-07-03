import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Post } from '../../post/post.entity';
import { Categories, IUniverseName } from '@new-eden-social/esi';

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
