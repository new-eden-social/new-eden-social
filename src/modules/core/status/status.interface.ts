import { IGetStatus } from '../external/esi/esi.interface';

export interface IStatus {
  esi: IGetStatus;
  state: 'OK' | 'NOK';
  version: string;
}
