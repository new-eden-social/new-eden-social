import { Action } from '@ngrx/store';
import {DCharacter, DCharacterShort} from '../character/character.dto';
import { IAuthenticationData } from './authentication.interface';

export enum AuthenticationActionTypes {
  AUTHENTICATE = '[Authentication] Authenticating User',
  UN_AUTHENTICATE = '[Authentication] UnAuthenticating User',
  AUTHENTICATE_SUCCESS = '[Authentication] User successfully authenticated',
  AUTHENTICATE_CALLBACK = '[Authentication] Callback from authentication request',
  AUTHENTICATE_CHECK = '[Authentication] Check if user is still authenticated',
  REFRESH_TOKEN = '[Authentication] Try to refresh authentication token',
  REFRESH_TOKEN_SUCCESS = '[Authentication] Successfully refreshed authentication token',
}

export class Authenticate implements Action {
  readonly type = AuthenticationActionTypes.AUTHENTICATE;
}

export class AuthenticateSuccess implements Action {
  readonly type = AuthenticationActionTypes.AUTHENTICATE_SUCCESS;

  constructor(public payload: DCharacterShort) {
  }
}

export class AuthenticateCallback implements Action {
  readonly type = AuthenticationActionTypes.AUTHENTICATE_CALLBACK;

  constructor(public payload: IAuthenticationData) {
  }
}

export class UnAuthenticate implements Action {
  readonly type = AuthenticationActionTypes.UN_AUTHENTICATE;
}

export class AuthenticateCheck implements Action {
  readonly type = AuthenticationActionTypes.AUTHENTICATE_CHECK;
}

export class RefreshToken implements Action {
  readonly type = AuthenticationActionTypes.REFRESH_TOKEN;

  constructor(public payload: string) {
  }
}

export class RefreshTokenSuccess implements Action {
  readonly type = AuthenticationActionTypes.REFRESH_TOKEN_SUCCESS;

  constructor(public payload: IAuthenticationData) {
  }
}

export type AuthenticationActionsUnion =
  Authenticate |
  AuthenticateSuccess |
  UnAuthenticate |
  AuthenticateCheck |
  AuthenticateCallback |
  RefreshToken |
  RefreshTokenSuccess;
