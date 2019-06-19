import { Action } from '@ngrx/store';
import { ApiExceptionResponse } from './api.interface';

export enum ApiActionTypes {
  EXCEPTION = '[Api] Exception',
  EXCEPTION_PROCESSED = '[Api] Exception processed'
}

export class Exception implements Action {
  readonly type = ApiActionTypes.EXCEPTION;

  constructor(public payload: ApiExceptionResponse|any) {
  }
}

export class ExceptionProcessed implements Action {
  readonly type = ApiActionTypes.EXCEPTION_PROCESSED;

  constructor(public payload: ApiExceptionResponse|any) {
  }
}

export type ApiActionsUnion = Exception | ExceptionProcessed;
