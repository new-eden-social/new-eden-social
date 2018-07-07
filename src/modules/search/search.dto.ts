import { ApiModelProperty } from '@nestjs/swagger';
import { Categories, IUniverseName } from '../core/external/esi/esi.interface';

export class DSearchName {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  name: string;

  @ApiModelProperty()
  category: Categories;

  constructor(name: IUniverseName) {
    this.id = name.id;
    this.name = name.name;
    this.category = name.category;
  }
}

export class DSearch {
  @ApiModelProperty({ type: DSearchName, isArray: true })
  names: DSearchName[];

  constructor(names: IUniverseName[]) {
    this.names = names.map(name => new DSearchName(name));
  }
}
