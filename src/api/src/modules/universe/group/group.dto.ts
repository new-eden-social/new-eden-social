import { UniverseGroup } from './group.entity';
import { DUniverseCategory } from '../category/category.dto';
import { ApiModelProperty } from '@nestjs/swagger';

export class DUniverseGroup {
  @ApiModelProperty()
  id: number;
  @ApiModelProperty()
  name: string;
  @ApiModelProperty()
  category: DUniverseCategory;

  constructor(group: UniverseGroup) {
    this.id = group.id;
    this.name = group.name;
    this.category = new DUniverseCategory(group.category);
  }
}
