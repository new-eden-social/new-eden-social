import { UniverseType } from './type.entity';
import { DUniverseGroup } from '../group/group.dto';
import { ApiModelProperty } from '@nestjs/swagger';

export class DUniverseType {
  @ApiModelProperty()
  id: number;
  @ApiModelProperty()
  name: string;
  @ApiModelProperty()
  description: string;
  @ApiModelProperty()
  group: DUniverseGroup;

  constructor(type: UniverseType) {
    this.id = type.id;
    this.name = type.name;
    this.description = type.description;
    this.group = new DUniverseGroup(type.group);
  }
}
