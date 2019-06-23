import { DAlliance } from './alliance.dto';

export interface IAllianceState {
  single: {
    [key: string]: DAlliance,
  };
}
