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
const request_context_1 = require("./request-context");
// Request context
require("zone.js");
require("zone.js/dist/zone-node.js");
require("zone.js/dist/long-stack-trace-zone.js");
let RequestContextMiddleware = class RequestContextMiddleware {
    use(req, res, next) {
        const requestContext = new request_context_1.RequestContext(req, res);
        Zone.current
            .fork({
            name: request_context_1.RequestContext.name,
            properties: {
                [request_context_1.RequestContext.name]: requestContext,
            },
        })
            .fork(Zone['longStackTraceZoneSpec'])
            .run(() => __awaiter(this, void 0, void 0, function* () { return yield next(); }));
    }
};
RequestContextMiddleware = __decorate([
    common_1.Injectable()
], RequestContextMiddleware);
exports.RequestContextMiddleware = RequestContextMiddleware;
//# sourceMappingURL=request-context.middleware.js.map