
import { DPost, DPostList } from './post.dto';

export interface IPostState {
  list: {
    [key: string]: DPostList
  };
  single: {
    [key: string]: DPost
  };
}
