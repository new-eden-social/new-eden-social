import { Action } from '@ngrx/store';
import {DFollowAction} from './follow.dto';

export enum FollowActionTypes {
  FOLLOW_CHARACTER = '[Follow] Follow character',
  FOLLOW_CORPORATION = '[Follow] Follow corporation',
  FOLLOW_ALLIANCE = '[Follow] Follow alliance',
 FOLLOW_SUCCESS = '[Follow] Follow success'

}

export class FollowCharacter implements Action {
  readonly type = FollowActionTypes.FOLLOW_CHARACTER;

  constructor(public payload: { characterId: number }) {
  }
}

export class FollowCorporation implements Action {
  readonly type = FollowActionTypes.FOLLOW_CORPORATION;

  constructor(public payload: { corporationId: number }) {
  }
}

export class FollowAlliance implements Action {
  readonly type = FollowActionTypes.FOLLOW_ALLIANCE;

  constructor(public payload: { allianceId: number }) {
  }
}

export class FollowSuccess implements Action {
  readonly type = FollowActionTypes.FOLLOW_SUCCESS;

  constructor(public payload: { follow: DFollowAction }) {
  }
}

export type FollowActionsUnion =
  FollowCharacter
  | FollowCorporation
  | FollowAlliance
  | FollowSuccess;
