import { ICorporationState } from './corporation.interface';
import { CorporaitonActionsUnion, CorporationActionTypes } from './corporaiton.actions';
import {FOLLOW_ACTION_TYPE} from '../follow/follow.constants';
import {FollowActionTypes, FollowSuccess} from '../follow/follow.actions';

const INITIAL_STATE: ICorporationState = {
  single: {}
};

export function corporationReducer(
  state: ICorporationState = INITIAL_STATE,
  action: CorporaitonActionsUnion | FollowSuccess,
): ICorporationState {
  switch (action.type) {
    case CorporationActionTypes.LOAD_SUCCESS: {
      return {
        ...state,
        single: {
          ...state.single,
          [action.payload.id]: action.payload,
        },
      };
    }

    case FollowActionTypes.FOLLOW_SUCCESS: {
      const followerId = action.payload.follow.follower.id;

      switch (action.payload.follow.type) {
        case FOLLOW_ACTION_TYPE.UN_FOLLOW:

          if (action.payload.follow.followingCorporation) {
            const following = action.payload.follow.followingCorporation;
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
          if (action.payload.follow.followingCorporation) {
            const following = action.payload.follow.followingCorporation;
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
