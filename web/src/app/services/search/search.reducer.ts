import { SearchActionsUnion, SearchActionTypes } from './search.actions';
import { ISearchState } from './search.interface';

const INITIAL_STATE: ISearchState = {
  data: { names: [] },
};

export function searchReducer(
  state: ISearchState = INITIAL_STATE,
  action: SearchActionsUnion,
): ISearchState {
  switch (action.type) {
    case SearchActionTypes.SEARCH_SUCCESS: {
      return {
        ...state,
        data: action.payload,
      };
    }

    case SearchActionTypes.CLEAR: {
      return {
        ...state,
        data: INITIAL_STATE.data,
      };
    }

    default: {
      return state;
    }
  }
}
