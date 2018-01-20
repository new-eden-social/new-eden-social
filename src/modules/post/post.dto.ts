import { POST_TYPES } from './post.constants';
import { Post } from './post.entity';
import { DCharacterShort } from '../character/character.dto';
import { DKillmailShort } from '../killmail/killmail.dto';
import { DPagination } from '../../dto/paggination.dto';
import { DUniverseLocation } from '../universe/location/location.dto';

export class DPost {
  id: string;
  content: string;
  type: POST_TYPES;
  character: DCharacterShort;
  killmail?: DKillmailShort;
  hashtags: string[];
  location?: DUniverseLocation;
  createdAt: Date;

  constructor(post: Post) {
    this.id = post.id;
    this.content = post.content;
    this.type = post.type;
    this.character = new DCharacterShort(post.character);
    this.hashtags = post.hashtags.map(h => h.name);
    this.createdAt = post.createdAt;
    if (post.location) this.location = new DUniverseLocation(post.location);
    if (post.killmail) this.killmail = new DKillmailShort(post.killmail);
  }
}

export class DPostList extends DPagination<DPost> {
  constructor(posts: Post[], page: number, perPage: number, count: number) {
    const formattedPosts = posts.map(post => new DPost(post));
    super(formattedPosts, page, perPage, count);
  }
}