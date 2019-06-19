import { ICommentState } from './comment.interface';
import { CommentActionsUnion, CommentActionTypes } from './comment.actions';

const INITIAL_STATE: ICommentState = {
  list: {},
};

export function commentReducer(
  state: ICommentState = INITIAL_STATE,
  action: CommentActionsUnion,
): ICommentState {
  switch (action.type) {
    /**
     * Add posts to the end (if page same as before or less, replace)
     */
    case CommentActionTypes.GET_LATEST_SUCCESS: {
      const postComments = state.list[action.payload.key];
      const commentsResponse = action.payload.comments;

      const oldComments = postComments ? postComments.data : [];
      let comments = [];
      // We reverse comments, so that newest are on the bottom
      commentsResponse.data.reverse();
      if (!postComments || postComments.page >= commentsResponse.page) comments = commentsResponse.data;
      else comments = [...commentsResponse.data, ...oldComments];

      return {
        ...state,
        list: {
          ...state.list,
          [action.payload.key]: {
            data: comments,
            page: commentsResponse.page,
            pages: commentsResponse.pages,
            perPage: commentsResponse.perPage,
            count: commentsResponse.count,
          },
        },
      };
    }

    case CommentActionTypes.NEW_COMMENT: {
      const currentPostComments =
        state.list[action.payload.key] ? state.list[action.payload.key].data : [];

      return {
        ...state,
        list: {
          ...state.list,
          [action.payload.key]: {
            ...state.list[action.payload.key],
            data: [...currentPostComments, action.payload.comment],
          },
        },
      };
    }

    default: {
      return state;
    }
  }
}
