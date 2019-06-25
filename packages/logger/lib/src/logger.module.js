"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const logger_service_1 = require("./logger.service");
const logger_providers_1 = require("./logger.providers");
const loggerException_interceptor_1 = require("./loggerException.interceptor");
let LoggerModule = class LoggerModule {
};
LoggerModule = __decorate([
    common_1.Global(),
    common_1.Module({
        providers: [
            ...logger_providers_1.loggerProviders,
            logger_service_1.LoggerService,
            loggerException_interceptor_1.HttpLoggerExceptionInterceptor,
            loggerException_interceptor_1.WsLoggerExceptionInterceptor,
        ],
        exports: [
            logger_service_1.LoggerService,
            loggerException_interceptor_1.HttpLoggerExceptionInterceptor,
            loggerException_interceptor_1.WsLoggerExceptionInterceptor,
        ],
    })
], LoggerModule);
exports.LoggerModule = LoggerModule;
//# sourceMappingURL=logger.module.js.map