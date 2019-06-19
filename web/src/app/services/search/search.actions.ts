import { Action } from '@ngrx/store';
import { DSearch } from './search.dto';

export enum SearchActionTypes {
  SEARCH = '[Search] Search the universe',
  SEARCH_SUCCESS = '[Search] Search the universe success',
  CLEAR = '[Search] Clear search data',
}

export class Search implements Action {
  readonly type = SearchActionTypes.SEARCH;

  constructor(public payload: string) {
  }
}

export class SearchSuccess implements Action {
  readonly type = SearchActionTypes.SEARCH_SUCCESS;

  constructor(public payload: DSearch) {
  }
}

export class Clear implements Action {
  readonly type = SearchActionTypes.CLEAR;
}

export type SearchActionsUnion = Search | SearchSuccess | Clear;
