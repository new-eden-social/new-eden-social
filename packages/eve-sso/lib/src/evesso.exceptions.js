"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UnauthenticatedException extends Error {
    constructor() {
        super('Unauthenticated');
    }
}
exports.UnauthenticatedException = UnauthenticatedException;
class TokenExpiredException extends Error {
    constructor() {
        super('Token Expired');
    }
}
exports.TokenExpiredException = TokenExpiredException;
//# sourceMappingURL=evesso.exceptions.js.map