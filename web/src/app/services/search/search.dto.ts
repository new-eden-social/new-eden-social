import { Categories } from '../esi.interface';

export class DSearchName {
  id: number;
  name: string;
  category: Categories;
}

export class DSearch {
  names: DSearchName[];
}
