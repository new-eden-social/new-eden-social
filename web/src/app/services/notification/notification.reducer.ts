import { INotificationState } from './notification.interface';
import { NotificationActionsUnion, NotificationsActionTypes } from './notification.actions';
import { DNotification } from './notification.dto';

const INITIAL_STATE: INotificationState = {
  list: null,
};

export function notificationReducer(
  state: INotificationState = INITIAL_STATE,
  action: NotificationActionsUnion,
): INotificationState {
  switch (action.type) {
    case NotificationsActionTypes.LOAD_SUCCESS: {
      return {
        ...state,
        list: action.payload,
      };
    }

    case NotificationsActionTypes.NEW: {
      return {
        ...state,
        list: {
          ...state.list,
          data: [action.payload, ...state.list.data],
        },
      };
    }

    case NotificationsActionTypes.SEEN_NOTIFICATION_UPDATE: {
      return {
        ...state,
        list: {
          ...state.list,
          data: state.list.data.map<DNotification>(notification => {
            if (notification.id === action.payload.id)
              return action.payload;
            return notification;
          }),
        },
      };
    }

    default: {
      return state;
    }
  }
}
