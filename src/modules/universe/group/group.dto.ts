import { UniverseGroup } from './group.entity';

export class DUniverseGroup {
  id: number;
  name: string;
  categoryId: number;

  constructor(group: UniverseGroup) {
    this.id = group.id;
    this.name = group.name;
    this.categoryId = group.categoryId;
  }
}
