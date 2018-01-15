import { UniverseCategory } from './category.entity';

export class DUniverseCategory {
  id: number;
  name: string;

  constructor(group: UniverseCategory) {
    this.id = group.id;
    this.name = group.name;
  }
}
