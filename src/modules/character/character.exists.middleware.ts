import { Middleware, NestMiddleware } from '@nestjs/common';
import { Character } from './character.entity';
import { CharacterService } from './character.service';
import { ExistsMiddleware } from '../../middlewares/exists.middleware';

@Middleware()
export class CharacterExistsMiddleware extends ExistsMiddleware<Character> {

  constructor(protected service: CharacterService) {
    super();
  }

  protected getId(req): number {
    return req.params.characterId;
  }

}
