import { UniverseLocation } from './location.entity';
import { Categories } from '../../core/external/esi/esi.interface';

export class DUniverseLocation {
  id: number;
  name: string;
  category: Categories;

  constructor(location: UniverseLocation) {
    this.id = location.id;
    this.name = location.name;
    this.category = location.category;
  }
}
