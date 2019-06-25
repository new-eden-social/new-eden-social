"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const logger_constants_1 = require("./logger.constants");
let LoggerService = class LoggerService {
    constructor(logger) {
        this.logger = logger;
    }
    log(level, msg, ...meta) {
        this.logger.log(level, msg, ...meta);
    }
    debug(msg, ...meta) {
        this.logger.debug(msg, ...meta);
    }
    error(msg, ...meta) {
        this.logger.error(msg, ...meta);
    }
    warning(msg, ...meta) {
        this.logger.warn(msg, ...meta);
    }
    info(msg, ...meta) {
        this.logger.info(msg, ...meta);
    }
    silly(msg, ...meta) {
        this.logger.silly(msg, ...meta);
    }
};
LoggerService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(logger_constants_1.LOGGER_WINSTON_PROVIDER)),
    __metadata("design:paramtypes", [Object])
], LoggerService);
exports.LoggerService = LoggerService;
//# sourceMappingURL=logger.service.js.map