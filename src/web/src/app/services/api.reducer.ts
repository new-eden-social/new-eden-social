import { IApiState } from './api.interface';
import { ApiActionsUnion, ApiActionTypes } from './api.actions';


const INITIAL_STATE: IApiState = {
  errors: [],
};

export function apiReducer(
  state: IApiState = INITIAL_STATE,
  action: ApiActionsUnion,
): IApiState {
  switch (action.type) {
    case ApiActionTypes.EXCEPTION_PROCESSED: {
      return {
        ...state,
        errors: [action.payload, ...state.errors],
      };
    }

    default: {
      return state;
    }
  }
}
