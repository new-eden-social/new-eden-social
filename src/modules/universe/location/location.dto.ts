import { UniverseLocation } from './location.entity';
import { Categories } from '../../core/external/esi/esi.interface';
import { ApiModelProperty } from '@nestjs/swagger';

export class DUniverseLocation {
  @ApiModelProperty()
  id: number;
  @ApiModelProperty()
  name: string;
  @ApiModelProperty()
  category: Categories;

  constructor(location: UniverseLocation) {
    this.id = location.id;
    this.name = location.name;
    this.category = location.category;
  }
}
