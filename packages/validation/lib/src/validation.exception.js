"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const http_exception_body_util_1 = require("@nestjs/common/utils/http-exception-body.util");
class ValidationException extends common_1.HttpException {
    constructor(errors) {
        super(http_exception_body_util_1.createHttpExceptionBody(errors, 'VALIDATION_EXCEPTION', common_1.HttpStatus.BAD_REQUEST), common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.ValidationException = ValidationException;
//# sourceMappingURL=validation.exception.js.map