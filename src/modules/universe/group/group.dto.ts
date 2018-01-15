import { UniverseGroup } from './group.entity';
import { DUniverseCategory } from '../category/category.dto';

export class DUniverseGroup {
  id: number;
  name: string;
  category: DUniverseCategory;

  constructor(group: UniverseGroup) {
    this.id = group.id;
    this.name = group.name;
    this.category = new DUniverseCategory(group.category);
  }
}
