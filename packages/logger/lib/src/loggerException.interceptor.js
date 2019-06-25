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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const logger_service_1 = require("./logger.service");
const operators_1 = require("rxjs/operators");
let HttpLoggerExceptionInterceptor = class HttpLoggerExceptionInterceptor {
    constructor(loggerService) {
        this.loggerService = loggerService;
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        // first param would be for events, second is for errors
        return next.handle().pipe(operators_1.tap(null, (exception) => {
            if (exception instanceof common_1.HttpException) {
                // If 500, log as error
                if (500 <= exception.getStatus()) {
                    this.loggerService.error(`HttpException ${exception.getStatus()}`, request.path, exception.getResponse());
                }
                else {
                    // Else log as debug (we don't want 4xx errors in production)
                    this.loggerService.error(`HttpException ${exception.getStatus()}`, request.path, exception.getResponse());
                }
            }
            else {
                this.loggerService.error('Unexpected error', request.path, exception);
            }
        }));
    }
};
HttpLoggerExceptionInterceptor = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [logger_service_1.LoggerService])
], HttpLoggerExceptionInterceptor);
exports.HttpLoggerExceptionInterceptor = HttpLoggerExceptionInterceptor;
let WsLoggerExceptionInterceptor = class WsLoggerExceptionInterceptor {
    intercept(context, next) {
        const client = context.switchToWs().getClient();
        // first param would be for events, second is for errors
        return next.handle().pipe(operators_1.tap(null, (exception) => {
            console.log(exception.message);
            console.error(JSON.parse(JSON.stringify(exception)));
        }));
    }
};
WsLoggerExceptionInterceptor = __decorate([
    common_1.Injectable()
], WsLoggerExceptionInterceptor);
exports.WsLoggerExceptionInterceptor = WsLoggerExceptionInterceptor;
//# sourceMappingURL=loggerException.interceptor.js.map