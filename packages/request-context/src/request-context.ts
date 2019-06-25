declare const Zone;

export class RequestContext {

  public readonly id: Number;
  public request: any;
  public response: any;

  constructor(request: any, response: any) {
    this.id = Math.random();
    this.request = request;
    this.response = response;
  }

  public static currentRequestContext(): RequestContext {
    return Zone.current.get(RequestContext.name);
  }

  public static currentRequest(): any {
    const requestContext = RequestContext.currentRequestContext();

    if (requestContext) {
      return requestContext.request;
    }

    return null;
  }

  // TODO: Should extend the class and add this on it
  // public static currentCharacter(): Character {
  //   const requestContext = RequestContext.currentRequestContext();

  //   if (requestContext) {
  //     return requestContext.request['character'];
  //   }

  //   return null;
  // }

  public static currentToken(): string {
    const requestContext = RequestContext.currentRequestContext();

    if (requestContext) {
      return requestContext.request.token;
    }

    return null;
  }
}
