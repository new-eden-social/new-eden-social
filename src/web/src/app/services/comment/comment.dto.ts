import { DAllianceShort } from '../alliance/alliance.dto';
import { DCorporationShort } from '../corporation/corporation.dto';
import { DPagination } from '../paggination.dto';
import { DCharacterShort } from '../character/character.dto';

export class DComment {
  id: string;
  content: string;
  character?: DCharacterShort;
  corporation?: DCorporationShort;
  alliance?: DAllianceShort;
  createdAt: Date;
  postId: string;
}

export class DCommentList extends DPagination<DComment> {
}
