import { IGetStatus } from '../external/esi/esi.interface';

export type STATE = 'OK' | 'NOK';

export interface IStatus {
  esi: IESIStatus;
  version: string;
  state: STATE;
}

export interface IESIStatus {
  players?: IGetStatus['players'];
  serverVersion?: IGetStatus['server_version'];
  startTime?: IGetStatus['start_time'];
  exception?: string;
  state: STATE;
}