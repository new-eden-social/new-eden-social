import { Action } from '@ngrx/store';
import { DCorporation } from './corporation.dto';

export enum CorporationActionTypes {
  LOAD = '[Corporation] Load specific corporation',
  LOAD_SUCCESS = '[Corporation] Load specific corporation success',
}

export class LoadCorporation implements Action {
  readonly type = CorporationActionTypes.LOAD;

  constructor(public payload: string) {
  }
}

export class LoadSuccess implements Action {
  readonly type = CorporationActionTypes.LOAD_SUCCESS;

  constructor(public payload: DCorporation) {
  }
}

export type CorporaitonActionsUnion = LoadCorporation | LoadSuccess;
