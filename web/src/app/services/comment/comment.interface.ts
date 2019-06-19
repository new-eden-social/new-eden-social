import { DCommentList } from './comment.dto';

export interface ICommentState {
  list: { [postId: string]: DCommentList };
}
