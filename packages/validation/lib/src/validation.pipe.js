"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const validation_util_1 = require("./validation.util");
let ValidatorPipe = class ValidatorPipe {
    transform(value, metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            const { metatype } = metadata;
            if (!metatype || !this.toValidate(metadata)) {
                return value;
            }
            return yield validation_util_1.lynxValidate(metatype, value);
        });
    }
    toValidate(metadata) {
        const { metatype, type } = metadata;
        if (type === 'custom') {
            return false;
        }
        const types = [String, Boolean, Number, Array, Object];
        return !types.find(type => metatype === type) && !shared_utils_1.isNil(metatype);
    }
};
ValidatorPipe = __decorate([
    common_1.Injectable()
], ValidatorPipe);
exports.ValidatorPipe = ValidatorPipe;
//# sourceMappingURL=validation.pipe.js.map