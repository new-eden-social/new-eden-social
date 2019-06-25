import { IAuthenticationState } from './authentication.interface';
import { AuthenticationActionsUnion, AuthenticationActionTypes } from './authentication.actions';

const INITIAL_STATE: IAuthenticationState = {
  authenticated: false,
};

export function authenticationReducer(
  state: IAuthenticationState = INITIAL_STATE,
  action: AuthenticationActionsUnion,
): IAuthenticationState {
  switch (action.type) {
    case AuthenticationActionTypes.AUTHENTICATE_SUCCESS: {
      return {
        ...state,
        character: action.payload,
        authenticated: true,
      };
    }

    case AuthenticationActionTypes.UN_AUTHENTICATE: {
      return {
        data: undefined,
        character: undefined,
        authenticated: false,
      };
    }

    case AuthenticationActionTypes.AUTHENTICATE_CALLBACK: {
      return {
        ...state,
        data: action.payload,
      };
    }

    case AuthenticationActionTypes.REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        data: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
