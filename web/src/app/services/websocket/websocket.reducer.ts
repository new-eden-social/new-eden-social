import { IWebsocketState } from './websocket.interface';
import { WebsocketActionsUnion, WebsocketActionTypes } from './websocket.actions';

const INITIAL_STATE: IWebsocketState = {
  connected: false,
  authenticated: false,
  subscriptions: {},
};

export function websocketReducer(
  state: IWebsocketState = INITIAL_STATE,
  action: WebsocketActionsUnion,
): IWebsocketState {
  switch (action.type) {
    case WebsocketActionTypes.DISCONNECTED: {
      return INITIAL_STATE;
    }

    case WebsocketActionTypes.CONNECT_SUCCESS: {
      return {
        ...state,
        connected: true,
      };
    }

    case WebsocketActionTypes.AUTHENTICATE_SUCCESS: {
      return {
        ...state,
        authenticated: true,
      };
    }

    case WebsocketActionTypes.AUTHENTICATE_FAIL: {
      return {
        ...state,
        authenticated: false,
      };
    }

    case WebsocketActionTypes.SUBSCRIBE_SUCCESS: {
      return {
        ...state,
        subscriptions: {
          ...state.subscriptions,
          [action.payload.key]: true,
        },
      };
    }

    case WebsocketActionTypes.UN_SUBSCRIBE_SUCCESS: {
      return {
        ...state,
        subscriptions: {
          ...state.subscriptions,
          [action.payload.key]: false,
        },
      };
    }

    default: {
      return state;
    }
  }
}
