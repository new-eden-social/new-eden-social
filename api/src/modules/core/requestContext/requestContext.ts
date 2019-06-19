import { Character } from '../../character/character.entity';

declare const Zone;

export class RequestContext {

  public readonly id: Number;
  public request: Request;
  public response: Response;

  constructor(request: Request, response: Response) {
    this.id = Math.random();
    this.request = request;
    this.response = response;
  }

  public static currentRequestContext(): RequestContext {
    return Zone.current.get(RequestContext.name);
  }

  public static currentRequest(): Request {
    const requestContext = RequestContext.currentRequestContext();

    if (requestContext) {
      return requestContext.request;
    }

    return null;
  }

  public static currentCharacter(): Character {
    const requestContext = RequestContext.currentRequestContext();

    if (requestContext) {
      return requestContext.request['character'];
    }

    return null;
  }

  public static currentToken(): string {
    const requestContext = RequestContext.currentRequestContext();

    if (requestContext) {
      return requestContext.request['token'];
    }

    return null;
  }
}
