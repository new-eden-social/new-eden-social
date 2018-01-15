import { UniverseType } from './type.entity';
import { DUniverseGroup } from '../group/group.dto';

export class DUniverseType {
  id: number;
  name: string;
  description: string;
  group: DUniverseGroup;

  constructor(type: UniverseType) {
    this.id = type.id;
    this.name = type.name;
    this.description = type.description;
    this.group = new DUniverseGroup(type.group);
  }
}
