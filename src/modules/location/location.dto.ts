import { Categories } from '../common/external/esi/esi.interface';
import { Location } from './location.entity';

export class DLocation {
  id: number;
  name: string;
  category: Categories;

  constructor(location: Location) {
    this.id = location.id;
    this.name = location.name;
    this.category = location.category;
  }
}
