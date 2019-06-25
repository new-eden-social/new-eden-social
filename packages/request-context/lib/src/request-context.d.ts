export declare class RequestContext {
    readonly id: Number;
    request: any;
    response: any;
    constructor(request: any, response: any);
    static currentRequestContext(): RequestContext;
    static currentRequest(): any;
    static currentToken(): string;
}
