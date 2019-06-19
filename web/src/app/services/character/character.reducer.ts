import {ICharacterState} from './character.interface';
import {CharacterActionsUnion, CharacterActionTypes} from './character.actions';
import {FollowActionTypes, FollowSuccess} from '../follow/follow.actions';
import {FOLLOW_ACTION_TYPE} from '../follow/follow.constants';
import {st} from '@angular/core/src/render3';

const INITIAL_STATE: ICharacterState = {
  single: {}
};

export function characterReducer(
  state = INITIAL_STATE,
  action: CharacterActionsUnion | FollowSuccess,
): ICharacterState {
  switch (action.type) {
    case CharacterActionTypes.LOAD_SUCCESS: {
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

      let stateClone = {...state};

      switch (action.payload.follow.type) {
        case FOLLOW_ACTION_TYPE.UN_FOLLOW:
          if (state.single[followerId]) {
            stateClone = {
              ...state,
              single: {
                ...state.single,
                [followerId]: {
                  ...state.single[followerId],
                  following: state.single[followerId].following
                    .filter(follow => follow.follower.id !== followerId),
                },
              }
            };
          }

          if (action.payload.follow.followingCharacter) {
            const following = action.payload.follow.followingCharacter;
            stateClone = {
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

          return stateClone;
        case FOLLOW_ACTION_TYPE.FOLLOW:
          if (state.single[followerId]) {
            stateClone = {
              ...state,
              single: {
                ...state.single,
                [followerId]: {
                  ...state.single[followerId],
                  following: [action.payload.follow, ...state.single[followerId].following],
                }
              }
            };
          }

          if (action.payload.follow.followingCharacter) {
            const following = action.payload.follow.followingCharacter;
            stateClone = {
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
          return stateClone;

        default:
          return state;
      }
    }

    default: {
      return state;
    }
  }
}
