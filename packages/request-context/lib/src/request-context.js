"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RequestContext {
    constructor(request, response) {
        this.id = Math.random();
        this.request = request;
        this.response = response;
    }
    static currentRequestContext() {
        return Zone.current.get(RequestContext.name);
    }
    static currentRequest() {
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
    static currentToken() {
        const requestContext = RequestContext.currentRequestContext();
        if (requestContext) {
            return requestContext.request['token'];
        }
        return null;
    }
}
exports.RequestContext = RequestContext;
//# sourceMappingURL=request-context.js.map