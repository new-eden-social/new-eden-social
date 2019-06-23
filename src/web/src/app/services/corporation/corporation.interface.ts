import { DCorporation } from './corporation.dto';

export interface ICorporationState {
  single: {
    [key: string]: DCorporation,
  };
}
