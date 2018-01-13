import { POST_TYPES } from './post.constants';
import { Post } from './post.entity';

export class DPost {
  id: string;
  content: string;
  type: POST_TYPES;
  character: DCharacterShort;
  hashtags: string[];
  location?: DLocation;

  constructor(post: Post) {
    this.id = post.id;
    this.content = post.content;
    this.type = post.type;
    this.character = new DCharacterShort(post.character);
    this.hashtags = post.hashtags.map(h => h.name);
    if (post.location) this.location = new DLocation(post.location);
  }
}
