"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const class_sanitizer_1 = require("class-sanitizer");
const class_validator_1 = require("class-validator");
const validation_exception_1 = require("./validation.exception");
/**
 * Validate value for validator
 * @param {ClassType<T>} validation
 * @param {object} value
 * @return {Promise<T>}
 */
exports.lynxValidate = (validation, value) => __awaiter(this, void 0, void 0, function* () {
    // Transform to class
    const entity = class_transformer_1.plainToClass(validation, value);
    // Sanitize
    class_sanitizer_1.sanitize(entity);
    // Validate
    const errors = yield class_validator_1.validate(entity, { skipMissingProperties: true, whitelist: true });
    if (errors.length > 0) {
        throw new validation_exception_1.ValidationException(errors);
    }
    return entity;
});
/**
 * Validate value for validator
 * IGNORES ASYNC VALIDATORS
 * @param {ClassType<T>} validation
 * @param {object} value
 * @return {T}
 */
exports.lynxValidateSync = (validation, value) => {
    // Transform to class
    const entity = class_transformer_1.plainToClass(validation, value);
    // Sanitize
    class_sanitizer_1.sanitize(entity);
    // Validate
    const errors = class_validator_1.validateSync(entity, { skipMissingProperties: true, whitelist: true });
    if (errors.length > 0)
        throw new validation_exception_1.ValidationException(errors);
    return entity;
};
//# sourceMappingURL=validation.util.js.map