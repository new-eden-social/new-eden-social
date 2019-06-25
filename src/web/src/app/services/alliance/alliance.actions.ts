import { Action } from '@ngrx/store';
import { DAlliance } from './alliance.dto';

export enum AllianceActionTypes {
  LOAD = '[Alliance] Load single alliance initiated',
  LOAD_SUCCESS = '[Alliance] Load single alliance success',
}

export class LoadAlliance implements Action {
  readonly type = AllianceActionTypes.LOAD;
  constructor(public payload: string) {
  }
}

export class LoadSuccess implements Action {
  readonly type = AllianceActionTypes.LOAD_SUCCESS;
  constructor(public payload: DAlliance) {
  }
}

export type AllianceActionsUnion = LoadAlliance | LoadSuccess;
