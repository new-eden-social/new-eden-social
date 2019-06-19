import { IAllianceState } from './alliance.interface';
import { AllianceActionsUnion, AllianceActionTypes } from './alliance.actions';
import {FollowActionTypes, FollowSuccess} from '../follow/follow.actions';
import {FOLLOW_ACTION_TYPE} from '../follow/follow.constants';

const INITIAL_STATE: IAllianceState = {
  single: {}
};

export function allianceReducer(
  state: IAllianceState = INITIAL_STATE,
  action: AllianceActionsUnion | FollowSuccess,
): IAllianceState {
  switch (action.type) {
    case AllianceActionTypes.LOAD_SUCCESS: {
      return {
        ...state,
        single: {
          ...state.single,
          [action.payload.id]: action.payload,
        },
      }
    }

    case FollowActionTypes.FOLLOW_SUCCESS: {
      const followerId = action.payload.follow.follower.id;

      switch (action.payload.follow.type) {
        case FOLLOW_ACTION_TYPE.UN_FOLLOW:

          if (action.payload.follow.followingAlliance) {
            const following = action.payload.follow.followingAlliance;
            return {
              ...state,
              single: {
                ...state.single,
                [following.id]: {
                  ...state.single[following.id],
                  followers: state.single[following.id].followers
                    .filter(follow => follow.follower.id !== followerId),
                },
              }
            };
          }
          return state;

        case FOLLOW_ACTION_TYPE.FOLLOW:
          if (action.payload.follow.followingAlliance) {
            const following = action.payload.follow.followingAlliance;
            return {
              ...state,
              single: {
                ...state.single,
                [following.id]: {
                  ...state.single[following.id],
                  followers: [action.payload.follow, ...state.single[following.id].followers],
                },
              }
            };
          }
          return state;

        default:
          return state;
      }
    }

    default: {
      return state;
    }
  }
}
