import { IPostState } from './post.interface';
import { PostActionsUnion, PostActionTypes } from './post.actions';
import { DPostList } from './post.dto';

const INITIAL_STATE: IPostState = {
  list: {},
  single: {},
};

export function postReducer(
  state: IPostState = INITIAL_STATE,
  action: PostActionsUnion,
): IPostState {
  switch (action.type) {
    case PostActionTypes.GET_SUCCESS: {
      const oldKeyData = state.list[action.payload.key];

      const oldPosts = oldKeyData ? oldKeyData.data : [];
      let posts = [];
      if (!oldKeyData || oldKeyData.page >= action.payload.posts.page) posts = action.payload.posts.data;
      else posts = [...oldPosts, ...action.payload.posts.data];

      return {
        ...state,
        list: {
          ...state.list,
          [action.payload.key]: {
            data: posts,
            page: action.payload.posts.page,
            pages: action.payload.posts.pages,
            perPage: action.payload.posts.perPage,
            count: action.payload.posts.count,
          },
        },
      };
    }

    case PostActionTypes.NEW_POST: {
      return {
        ...state,
        list: {
          ...state.list,
          [action.payload.key]: {
            ...state.list[action.payload.key],
            data: [action.payload.post, ...state.list[action.payload.key].data],
          },
        },
      };
    }

    case PostActionTypes.LOAD_SUCCESS: {
      return {
        ...state,
        single: {
          ...state.single,
          [action.payload.post.id]: action.payload.post,
        },
      };
    }

    default: {
      return state;
    }
  }
}
