"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ESIException extends Error {
    constructor(...args) {
        super(...args);
    }
}
exports.ESIException = ESIException;
class ESIEntetyNotFoundException extends ESIException {
    constructor() {
        super('Entety doesn\'t exists');
    }
}
exports.ESIEntetyNotFoundException = ESIEntetyNotFoundException;
//# sourceMappingURL=esi.exceptions.js.map