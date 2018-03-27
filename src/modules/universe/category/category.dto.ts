import { UniverseCategory } from './category.entity';
import { ApiModelProperty } from '@nestjs/swagger';

export class DUniverseCategory {
  @ApiModelProperty()
  id: number;
  @ApiModelProperty()
  name: string;

  constructor(group: UniverseCategory) {
    this.id = group.id;
    this.name = group.name;
  }
}
